import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site/SiteShell";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency } from "@/lib/products";
import { useCurrency } from "@/hooks/use-currency";

type DepositAccount = {
  id: string;
  bank_name: string;
  account_name: string;
  account_number: string;
  instructions: string | null;
};
type BalanceTransaction = {
  id: string;
  transaction_type: string;
  amount_ngn: number;
  note: string | null;
  created_at: string;
};

export const Route = createFileRoute("/_authenticated/account")({
  head: () => ({ meta: [{ title: "My account — Perigon" }] }),
  component: AccountPage,
});

function AccountPage() {
  const currency = useCurrency();
  const [balance, setBalance] = useState(0);
  const [accounts, setAccounts] = useState<DepositAccount[]>([]);
  const [transactions, setTransactions] = useState<BalanceTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      const { data: userResult, error: userError } = await supabase.auth.getUser();
      if (userError || !userResult.user) {
        if (userError) toast.error("Could not load your account", { description: userError.message });
        if (active) setLoading(false);
        return;
      }

      const [balanceResult, accountResult, transactionResult] = await Promise.all([
        supabase.from("user_balances").select("balance_ngn").eq("user_id", userResult.user.id).maybeSingle(),
        supabase.from("deposit_accounts").select("id,bank_name,account_name,account_number,instructions").eq("is_active", true).order("created_at"),
        supabase.from("balance_transactions").select("id,transaction_type,amount_ngn,note,created_at").eq("user_id", userResult.user.id).order("created_at", { ascending: false }).limit(20),
      ]);
      const error = balanceResult.error ?? accountResult.error ?? transactionResult.error;
      if (error) toast.error("Could not load account details", { description: error.message });
      if (active) {
        setBalance(Number(balanceResult.data?.balance_ngn ?? 0));
        setAccounts((accountResult.data as DepositAccount[]) ?? []);
        setTransactions((transactionResult.data as BalanceTransaction[]) ?? []);
        setLoading(false);
      }
    }

    void load();
    return () => { active = false; };
  }, []);

  return (
    <SiteShell>
      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">My account</p>
        <h1 className="mt-2 font-display text-4xl">Balance & deposits</h1>
        {loading ? (
          <p className="mt-8 text-sm text-muted-foreground">Loading your account…</p>
        ) : (
          <>
            <div className="mt-8 rounded-2xl border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground">Available balance</p>
              <p className="mt-2 font-display text-4xl text-primary">{formatCurrency(balance, currency)}</p>
              <p className="mt-2 text-xs text-muted-foreground">Displayed in your selected currency without exchange conversion.</p>
            </div>

            <div className="mt-10">
              <h2 className="font-display text-2xl">Deposit accounts</h2>
              <p className="mt-1 text-sm text-muted-foreground">After transferring, share your payment reference with support. Your balance is updated after verification.</p>
              {accounts.length === 0 ? (
                <p className="mt-4 text-sm text-muted-foreground">No deposit accounts are currently available.</p>
              ) : (
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {accounts.map((account) => (
                    <article key={account.id} className="rounded-2xl border border-border bg-card p-5">
                      <h3 className="font-display text-xl">{account.bank_name}</h3>
                      <dl className="mt-3 space-y-2 text-sm">
                        <div><dt className="inline text-muted-foreground">Account name: </dt><dd className="inline">{account.account_name}</dd></div>
                        <div><dt className="inline text-muted-foreground">Account number: </dt><dd className="inline font-medium">{account.account_number}</dd></div>
                      </dl>
                      {account.instructions && <p className="mt-3 text-sm text-muted-foreground">{account.instructions}</p>}
                    </article>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-10">
              <h2 className="font-display text-2xl">Balance activity</h2>
              {transactions.length === 0 ? (
                <p className="mt-4 text-sm text-muted-foreground">No balance activity yet.</p>
              ) : (
                <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
                  <table className="w-full min-w-[560px] text-sm">
                    <thead className="bg-muted/50 text-left">
                      <tr>
                        <th className="px-4 py-3">Type</th>
                        <th className="px-4 py-3">Amount</th>
                        <th className="px-4 py-3">Note</th>
                        <th className="px-4 py-3">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="border-t border-border">
                          <td className="px-4 py-3 capitalize">{transaction.transaction_type}</td>
                          <td className="px-4 py-3">{transaction.transaction_type === "debit" ? "−" : "+"}{formatCurrency(Number(transaction.amount_ngn), currency)}</td>
                          <td className="px-4 py-3">{transaction.note || "—"}</td>
                          <td className="px-4 py-3">{new Date(transaction.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </SiteShell>
  );
}
