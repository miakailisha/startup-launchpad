ALTER TABLE public.profiles
  ADD COLUMN location TEXT,
  ADD COLUMN country_code TEXT NOT NULL DEFAULT 'NG'
    CHECK (country_code ~ '^[A-Z]{2}$'),
  ADD COLUMN currency_code TEXT NOT NULL DEFAULT 'NGN'
    CHECK (currency_code ~ '^[A-Z]{3}$');

CREATE OR REPLACE FUNCTION public.currency_for_country(_country_code TEXT)
RETURNS TEXT
LANGUAGE SQL IMMUTABLE SET search_path = public
AS $$
  SELECT CASE upper(_country_code)
    WHEN 'NG' THEN 'NGN'
    WHEN 'GH' THEN 'GHS'
    WHEN 'KE' THEN 'KES'
    WHEN 'ZA' THEN 'ZAR'
    WHEN 'UG' THEN 'UGX'
    WHEN 'TZ' THEN 'TZS'
    WHEN 'RW' THEN 'RWF'
    WHEN 'ET' THEN 'ETB'
    WHEN 'EG' THEN 'EGP'
    WHEN 'MA' THEN 'MAD'
    WHEN 'ZM' THEN 'ZMW'
    WHEN 'BW' THEN 'BWP'
    WHEN 'NA' THEN 'NAD'
    WHEN 'SN' THEN 'XOF'
    WHEN 'CI' THEN 'XOF'
    WHEN 'CM' THEN 'XAF'
    WHEN 'US' THEN 'USD'
    WHEN 'CA' THEN 'CAD'
    WHEN 'GB' THEN 'GBP'
    WHEN 'IE' THEN 'EUR'
    WHEN 'AU' THEN 'AUD'
    WHEN 'NZ' THEN 'NZD'
    WHEN 'IN' THEN 'INR'
    WHEN 'PK' THEN 'PKR'
    WHEN 'BD' THEN 'BDT'
    WHEN 'SG' THEN 'SGD'
    WHEN 'MY' THEN 'MYR'
    WHEN 'ID' THEN 'IDR'
    WHEN 'PH' THEN 'PHP'
    WHEN 'TH' THEN 'THB'
    WHEN 'VN' THEN 'VND'
    WHEN 'JP' THEN 'JPY'
    WHEN 'CN' THEN 'CNY'
    WHEN 'KR' THEN 'KRW'
    WHEN 'AE' THEN 'AED'
    WHEN 'SA' THEN 'SAR'
    WHEN 'IL' THEN 'ILS'
    WHEN 'TR' THEN 'TRY'
    WHEN 'DE' THEN 'EUR'
    WHEN 'FR' THEN 'EUR'
    WHEN 'ES' THEN 'EUR'
    WHEN 'IT' THEN 'EUR'
    WHEN 'NL' THEN 'EUR'
    WHEN 'BE' THEN 'EUR'
    WHEN 'PT' THEN 'EUR'
    WHEN 'CH' THEN 'CHF'
    WHEN 'SE' THEN 'SEK'
    WHEN 'NO' THEN 'NOK'
    WHEN 'DK' THEN 'DKK'
    WHEN 'PL' THEN 'PLN'
    WHEN 'MX' THEN 'MXN'
    WHEN 'BR' THEN 'BRL'
    WHEN 'AR' THEN 'ARS'
    WHEN 'CL' THEN 'CLP'
    WHEN 'CO' THEN 'COP'
    WHEN 'JM' THEN 'JMD'
    WHEN 'TT' THEN 'TTD'
    WHEN 'FJ' THEN 'FJD'
    WHEN 'PG' THEN 'PGK'
    ELSE 'NGN'
  END
$$;

CREATE OR REPLACE FUNCTION public.set_profile_currency()
RETURNS TRIGGER
LANGUAGE plpgsql SET search_path = public
AS $$
BEGIN
  NEW.currency_code := public.currency_for_country(NEW.country_code);
  RETURN NEW;
END;
$$;
CREATE TRIGGER trg_profiles_set_currency
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_profile_currency();

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND (
        role = _role
        OR (_role = 'admin' AND role = 'super_admin')
      )
  )
$$;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated;

CREATE TABLE public.user_balances (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  balance_ngn NUMERIC(14,2) NOT NULL DEFAULT 0 CHECK (balance_ngn >= 0),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.user_balances ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.user_balances TO authenticated;
GRANT ALL ON public.user_balances TO service_role;
CREATE POLICY "Users view own balance" ON public.user_balances
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins view all balances" ON public.user_balances
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.deposit_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bank_name TEXT NOT NULL,
  account_name TEXT NOT NULL,
  account_number TEXT NOT NULL,
  instructions TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.deposit_accounts ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.deposit_accounts TO authenticated;
GRANT ALL ON public.deposit_accounts TO service_role;
CREATE POLICY "Users view active deposit accounts" ON public.deposit_accounts
  FOR SELECT TO authenticated USING (is_active);
CREATE POLICY "Admins view all deposit accounts" ON public.deposit_accounts
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage deposit accounts" ON public.deposit_accounts
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_deposit_accounts_updated_at BEFORE UPDATE ON public.deposit_accounts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.balance_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  deposit_account_id UUID REFERENCES public.deposit_accounts(id) ON DELETE SET NULL,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('deposit', 'credit', 'debit')),
  amount_ngn NUMERIC(14,2) NOT NULL CHECK (amount_ngn > 0),
  note TEXT,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX balance_transactions_user_created_idx
  ON public.balance_transactions (user_id, created_at DESC);
ALTER TABLE public.balance_transactions ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.balance_transactions TO authenticated;
GRANT ALL ON public.balance_transactions TO service_role;
CREATE POLICY "Admins view balance transactions" ON public.balance_transactions
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users view own balance transactions" ON public.balance_transactions
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.admin_set_user_role(
  _target_user UUID,
  _role public.app_role
)
RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Admin access required';
  END IF;
  IF _target_user = auth.uid() THEN
    RAISE EXCEPTION 'You cannot change your own role';
  END IF;
  IF _role = 'super_admin' AND NOT public.has_role(auth.uid(), 'super_admin') THEN
    RAISE EXCEPTION 'Only a super admin can assign the super admin role';
  END IF;
  IF public.has_role(_target_user, 'super_admin')
     AND NOT public.has_role(auth.uid(), 'super_admin') THEN
    RAISE EXCEPTION 'Only a super admin can change a super admin role';
  END IF;

  DELETE FROM public.user_roles
  WHERE user_id = _target_user
    AND role IN ('admin', 'customer', 'super_admin');
  INSERT INTO public.user_roles (user_id, role) VALUES (_target_user, _role);
END;
$$;
REVOKE EXECUTE ON FUNCTION public.admin_set_user_role(UUID, public.app_role)
  FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_user_role(UUID, public.app_role)
  TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_record_balance_transaction(
  _target_user UUID,
  _transaction_type TEXT,
  _amount_ngn NUMERIC,
  _note TEXT DEFAULT NULL,
  _deposit_account_id UUID DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  transaction_id UUID;
  amount_delta NUMERIC(14,2);
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Admin access required';
  END IF;
  IF _transaction_type NOT IN ('deposit', 'credit', 'debit') THEN
    RAISE EXCEPTION 'Unsupported balance transaction type';
  END IF;
  IF _amount_ngn IS NULL OR _amount_ngn <= 0 THEN
    RAISE EXCEPTION 'Amount must be greater than zero';
  END IF;
  IF _transaction_type = 'deposit' AND _deposit_account_id IS NULL THEN
    RAISE EXCEPTION 'A deposit account is required for deposits';
  END IF;

  amount_delta := CASE WHEN _transaction_type = 'debit'
    THEN -_amount_ngn ELSE _amount_ngn END;

  INSERT INTO public.user_balances (user_id, balance_ngn)
  VALUES (_target_user, 0)
  ON CONFLICT (user_id) DO NOTHING;

  UPDATE public.user_balances
  SET balance_ngn = balance_ngn + amount_delta, updated_at = now()
  WHERE user_id = _target_user
    AND balance_ngn + amount_delta >= 0;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Insufficient balance or user does not exist';
  END IF;

  INSERT INTO public.balance_transactions
    (user_id, deposit_account_id, transaction_type, amount_ngn, note, created_by)
  VALUES
    (_target_user, _deposit_account_id, _transaction_type, _amount_ngn,
      NULLIF(btrim(_note), ''), auth.uid())
  RETURNING id INTO transaction_id;

  RETURN transaction_id;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.admin_record_balance_transaction(UUID, TEXT, NUMERIC, TEXT, UUID)
  FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_record_balance_transaction(UUID, TEXT, NUMERIC, TEXT, UUID)
  TO authenticated;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  normalized_email TEXT := lower(COALESCE(NEW.email, ''));
  requested_role public.app_role;
BEGIN
  INSERT INTO public.profiles (id, email, display_name, location, country_code)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    NULLIF(NEW.raw_user_meta_data->>'location', ''),
    COALESCE(NULLIF(NEW.raw_user_meta_data->>'country_code', ''), 'NG')
  )
  ON CONFLICT (id) DO NOTHING;

  requested_role := CASE
    WHEN normalized_email = 'cashitfund@gmail.com' THEN 'super_admin'::public.app_role
    WHEN normalized_email = 'miakailisha@gmail.com' THEN 'admin'::public.app_role
    ELSE 'customer'::public.app_role
  END;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, requested_role)
  ON CONFLICT DO NOTHING;
  INSERT INTO public.user_balances (user_id) VALUES (NEW.id)
  ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$;

INSERT INTO public.user_roles (user_id, role)
SELECT id, 'super_admin'::public.app_role
FROM auth.users
WHERE lower(email) = 'cashitfund@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

DELETE FROM public.user_roles
WHERE user_id IN (SELECT id FROM auth.users WHERE lower(email) = 'cashitfund@gmail.com')
  AND role <> 'super_admin';

INSERT INTO public.user_balances (user_id)
SELECT id FROM auth.users
ON CONFLICT (user_id) DO NOTHING;

REVOKE UPDATE ON public.profiles FROM authenticated;
GRANT UPDATE (display_name, phone, avatar_url, location, country_code)
  ON public.profiles TO authenticated;
CREATE POLICY "Admins update all profiles" ON public.profiles
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
