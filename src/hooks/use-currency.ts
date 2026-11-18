import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getCurrency, type CurrencyCode } from "@/lib/countries";

export function useCurrency() {
  const [currency, setCurrency] = useState<CurrencyCode>("NGN");

  useEffect(() => {
    let active = true;

    async function loadCurrency(userId: string | undefined) {
      if (!userId) {
        if (active) setCurrency("NGN");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("country_code")
        .eq("id", userId)
        .maybeSingle();
      if (error) {
        console.error("Could not load profile currency:", error.message);
        return;
      }
      if (active && data) setCurrency(getCurrency(data.country_code));
    }

    supabase.auth.getUser().then(({ data, error }) => {
      if (error) {
        console.error("Could not determine signed-in user:", error.message);
        return;
      }
      void loadCurrency(data.user?.id);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      void loadCurrency(session?.user.id);
    });

    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  return currency;
}
