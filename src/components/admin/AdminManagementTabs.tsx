import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import type { Enums } from "@/integrations/supabase/types";
import { countries } from "@/lib/countries";
import { formatNGN } from "@/lib/products";

type AppRole = Enums<"app_role">;
type ManagedUser = {
  id: string;
  email: string | null;
  display_name: string | null;
  phone: string | null;
  location: string | null;
  country_code: string;
  role: AppRole;
  balance_ngn: number;
};
type DepositAccount = {
  id: string;
  bank_name: string;
  account_name: string;
  account_number: string;
  instructions: string | null;
  is_active: boolean;
};
type BalanceTransaction = {
  id: string;
  user_id: string;
  transaction_type: string;
  amount_ngn: number;
  note: string | null;
  created_at: string;
};

function useAdminUsers() {
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadUsers() {
    setLoading(true);
    const [profiles, roles, balances] = await Promise.all([
      supabase.from("profiles").select("id,email,display_name,phone,location,country_code").order("created_at", { ascending: false }),
      supabase.from("user_roles").select("user_id,role"),
      supabase.from("user_balances").select("user_id,balance_ngn"),
    ]);
    const error = profiles.error ?? roles.error ?? balances.error;
    if (error) {
      toast.error("Could not load users", { description: error.message });
      setLoading(false);
      return;
    }

    const roleByUser = new Map<string, AppRole>();
    for (const row of roles.data ?? []) {
      const current = roleByUser.get(row.user_id);
      if (row.role === "super_admin" || (row.role === "admin" && current !== "super_admin")) {
        roleByUser.set(row.user_id, row.role);
      } else if (!current) {
        roleByUser.set(row.user_id, row.role);
      }
    }
    const balanceByUser = new Map((balances.data ?? []).map((row) => [row.user_id, Number(row.balance_ngn)]));
    setUsers((profiles.data ?? []).map((profile) => ({
      ...profile,
      role: roleByUser.get(profile.id) ?? "customer",
      balance_ngn: balanceByUser.get(profile.id) ?? 0,
    })));
    setLoading(false);
  }

  useEffect(() => { void loadUsers(); }, []);
  return { users, loading, loadUsers };
}

function LoadingMessage({ loading }: { loading: boolean }) {
  return loading ? <p className="mt-6 text-sm text-muted-foreground">Loading…</p> : null;
}

export function UsersTab({ canManageSuperAdmins }: { canManageSuperAdmins: boolean }) {
  const { users, loading, loadUsers } = useAdminUsers();

  async function changeRole(userId: string, role: AppRole) {
    const { error } = await supabase.rpc("admin_set_user_role", {
      _target_user: userId,
      _role: role,
    });
    if (error) return toast.error("Could not update role", { description: error.message });
    toast.success("User role updated");
    void loadUsers();
  }

  async function changeCountry(userId: string, countryCode: string) {
    const { error } = await supabase
      .from("profiles")
      .update({ country_code: countryCode })
      .eq("id", userId);
    if (error) return toast.error("Could not update country", { description: error.message });
    toast.success("User country updated");
    void loadUsers();
  }

  async function changeLocation(userId: string, location: string) {
    const { error } = await supabase.from("profiles").update({ location: location.trim() || null }).eq("id", userId);
    if (error) return toast.error("Could not update location", { description: error.message });
    toast.success("User location updated");
    void loadUsers();
  }

  return (
    <div className="mt-6">
      <LoadingMessage loading={loading} />
      {!loading && users.length === 0 && <p className="text-sm text-muted-foreground">No users found.</p>}
      {!loading && users.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Country / currency</th>
                <th className="px-4 py-3">Balance</th>
                <th className="px-4 py-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-border">
                  <td className="px-4 py-3">
                    <p className="font-medium">{user.display_name || "Unnamed user"}</p>
                    <p className="text-xs text-muted-foreground">{user.email ?? user.id}</p>
                    {user.phone && <p className="text-xs text-muted-foreground">{user.phone}</p>}
                  </td>
                  <td className="px-4 py-3">
                    <Input
                      aria-label={`Location for ${user.email ?? user.id}`}
                      defaultValue={user.location ?? ""}
                      placeholder="City or region"
                      onBlur={(event) => {
                        if (event.currentTarget.value !== (user.location ?? "")) {
                          void changeLocation(user.id, event.currentTarget.value);
                        }
                      }}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <select
                      aria-label={`Country for ${user.email ?? user.id}`}
                      value={user.country_code}
                      onChange={(event) => void changeCountry(user.id, event.target.value)}
                      className="h-9 rounded-md border border-input bg-background px-2 text-sm"
                    >
                      {countries.map((country) => (
                        <option key={country.code} value={country.code}>{country.name} ({country.currency})</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 font-medium">{formatNGN(user.balance_ngn)}</td>
                  <td className="px-4 py-3">
                    <select
                      aria-label={`Role for ${user.email ?? user.id}`}
                      value={user.role}
                      onChange={(event) => void changeRole(user.id, event.target.value as AppRole)}
                      className="h-9 rounded-md border border-input bg-background px-2 text-sm"
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                      {canManageSuperAdmins && <option value="super_admin">Super admin</option>}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export function DepositAccountsTab() {
  const [accounts, setAccounts] = useState<DepositAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [instructions, setInstructions] = useState("");
  const [saving, setSaving] = useState(false);
  const [drafts, setDrafts] = useState<Record<string, Partial<DepositAccount>>>({});

  async function loadAccounts() {
    setLoading(true);
    const { data, error } = await supabase.from("deposit_accounts").select("*").order("created_at", { ascending: false });
    if (error) toast.error("Could not load deposit accounts", { description: error.message });
    setAccounts((data as DepositAccount[]) ?? []);
    setLoading(false);
  }
  useEffect(() => { void loadAccounts(); }, []);

  async function addAccount(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("deposit_accounts").insert({
      bank_name: bankName.trim(),
      account_name: accountName.trim(),
      account_number: accountNumber.trim(),
      instructions: instructions.trim() || null,
    });
    setSaving(false);
    if (error) return toast.error("Could not add deposit account", { description: error.message });
    toast.success("Deposit account added");
    setBankName("");
    setAccountName("");
    setAccountNumber("");
    setInstructions("");
    void loadAccounts();
  }

  async function updateAccount(account: DepositAccount) {
    const patch = drafts[account.id] ?? {};
    const { error } = await supabase.from("deposit_accounts").update(patch).eq("id", account.id);
    if (error) return toast.error("Could not update deposit account", { description: error.message });
    toast.success("Deposit account updated");
    setDrafts((current) => {
      const next = { ...current };
      delete next[account.id];
      return next;
    });
    void loadAccounts();
  }

  async function toggleActive(account: DepositAccount) {
    const { error } = await supabase.from("deposit_accounts").update({ is_active: !account.is_active }).eq("id", account.id);
    if (error) return toast.error("Could not update deposit account", { description: error.message });
    void loadAccounts();
  }

  return (
    <div className="mt-6 space-y-8">
      <form onSubmit={addAccount} className="grid gap-4 rounded-2xl border border-border bg-card p-5 md:grid-cols-2">
        <div>
          <Label htmlFor="deposit-bank">Bank</Label>
          <Input id="deposit-bank" required value={bankName} onChange={(event) => setBankName(event.target.value)} className="mt-2" />
        </div>
        <div>
          <Label htmlFor="deposit-account-name">Account name</Label>
          <Input id="deposit-account-name" required value={accountName} onChange={(event) => setAccountName(event.target.value)} className="mt-2" />
        </div>
        <div>
          <Label htmlFor="deposit-account-number">Account number</Label>
          <Input id="deposit-account-number" required value={accountNumber} onChange={(event) => setAccountNumber(event.target.value)} className="mt-2" />
        </div>
        <div>
          <Label htmlFor="deposit-instructions">Payment instructions</Label>
          <Input id="deposit-instructions" value={instructions} onChange={(event) => setInstructions(event.target.value)} className="mt-2" />
        </div>
        <button disabled={saving} className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60 md:col-span-2">
          {saving ? "Adding…" : "Add deposit account"}
        </button>
      </form>

      <LoadingMessage loading={loading} />
      {!loading && accounts.length === 0 && <p className="text-sm text-muted-foreground">No deposit accounts yet.</p>}
      <div className="space-y-4">
        {accounts.map((account) => {
          const draft = drafts[account.id] ?? {};
          return (
            <div key={account.id} className="grid gap-4 rounded-2xl border border-border bg-card p-5 md:grid-cols-2">
              <div>
                <Label htmlFor={`bank-${account.id}`}>Bank</Label>
                <Input id={`bank-${account.id}`} value={draft.bank_name ?? account.bank_name} onChange={(event) => setDrafts((current) => ({ ...current, [account.id]: { ...current[account.id], bank_name: event.target.value } }))} className="mt-2" />
              </div>
              <div>
                <Label htmlFor={`account-name-${account.id}`}>Account name</Label>
                <Input id={`account-name-${account.id}`} value={draft.account_name ?? account.account_name} onChange={(event) => setDrafts((current) => ({ ...current, [account.id]: { ...current[account.id], account_name: event.target.value } }))} className="mt-2" />
              </div>
              <div>
                <Label htmlFor={`account-number-${account.id}`}>Account number</Label>
                <Input id={`account-number-${account.id}`} value={draft.account_number ?? account.account_number} onChange={(event) => setDrafts((current) => ({ ...current, [account.id]: { ...current[account.id], account_number: event.target.value } }))} className="mt-2" />
              </div>
              <div>
                <Label htmlFor={`instructions-${account.id}`}>Instructions</Label>
                <Input id={`instructions-${account.id}`} value={draft.instructions ?? account.instructions ?? ""} onChange={(event) => setDrafts((current) => ({ ...current, [account.id]: { ...current[account.id], instructions: event.target.value } }))} className="mt-2" />
              </div>
              <div className="flex items-center justify-between gap-3 md:col-span-2">
                <span className="text-sm text-muted-foreground">{account.is_active ? "Shown to customers" : "Inactive"}</span>
                <div className="flex gap-2">
                  {Object.keys(draft).length > 0 && (
                    <button onClick={() => void updateAccount(account)} className="rounded-full border border-input px-4 py-2 text-sm hover:bg-muted">
                      Save changes
                    </button>
                  )}
                  <button onClick={() => void toggleActive(account)} className="rounded-full border border-input px-4 py-2 text-sm hover:bg-muted">
                    {account.is_active ? "Deactivate" : "Activate"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function BalancesTab() {
  const { users, loading: usersLoading, loadUsers } = useAdminUsers();
  const [accounts, setAccounts] = useState<DepositAccount[]>([]);
  const [transactions, setTransactions] = useState<BalanceTransaction[]>([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [userId, setUserId] = useState("");
  const [type, setType] = useState<"deposit" | "credit" | "debit">("deposit");
  const [amount, setAmount] = useState("");
  const [accountId, setAccountId] = useState("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  async function loadAccounts() {
    const { data, error } = await supabase.from("deposit_accounts").select("*").order("bank_name");
    if (error) toast.error("Could not load deposit accounts", { description: error.message });
    setAccounts((data as DepositAccount[]) ?? []);
  }
  async function loadTransactions() {
    setLoadingTransactions(true);
    const { data, error } = await supabase
      .from("balance_transactions")
      .select("id,user_id,transaction_type,amount_ngn,note,created_at")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) toast.error("Could not load balance history", { description: error.message });
    setTransactions((data as BalanceTransaction[]) ?? []);
    setLoadingTransactions(false);
  }
  useEffect(() => {
    void loadAccounts();
    void loadTransactions();
  }, []);

  async function recordTransaction(event: React.FormEvent) {
    event.preventDefault();
    const parsedAmount = Number(amount);
    if (!userId || !Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      toast.error("Choose a user and enter an amount greater than zero");
      return;
    }
    if (type === "deposit" && !accountId) {
      toast.error("Choose the account where the deposit was received");
      return;
    }
    setSaving(true);
    const { error } = await supabase.rpc("admin_record_balance_transaction", {
      _target_user: userId,
      _transaction_type: type,
      _amount_ngn: parsedAmount,
      _note: note.trim() || null,
      _deposit_account_id: type === "deposit" ? accountId : null,
    });
    setSaving(false);
    if (error) return toast.error("Could not record balance change", { description: error.message });
    toast.success(type === "debit" ? "Balance debited" : "Balance credited");
    setAmount("");
    setNote("");
    setAccountId("");
    await Promise.all([loadUsers(), loadTransactions()]);
  }

  const userById = new Map(users.map((user) => [user.id, user]));

  return (
    <div className="mt-6 space-y-8">
      <form onSubmit={recordTransaction} className="grid gap-4 rounded-2xl border border-border bg-card p-5 md:grid-cols-2">
        <div>
          <Label htmlFor="balance-user">User</Label>
          <select id="balance-user" required value={userId} onChange={(event) => setUserId(event.target.value)} className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
            <option value="" disabled>{usersLoading ? "Loading users…" : "Choose a user"}</option>
            {users.map((user) => <option key={user.id} value={user.id}>{user.display_name || user.email || user.id}</option>)}
          </select>
        </div>
        <div>
          <Label htmlFor="balance-type">Action</Label>
          <select id="balance-type" value={type} onChange={(event) => setType(event.target.value as typeof type)} className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
            <option value="deposit">Record deposit</option>
            <option value="credit">Add credit</option>
            <option value="debit">Debit balance</option>
          </select>
        </div>
        {type === "deposit" && (
          <div>
            <Label htmlFor="balance-account">Deposit account</Label>
            <select id="balance-account" required value={accountId} onChange={(event) => setAccountId(event.target.value)} className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
              <option value="" disabled>Choose an account</option>
              {accounts.map((account) => <option key={account.id} value={account.id}>{account.bank_name} · {account.account_number}{account.is_active ? "" : " (inactive)"}</option>)}
            </select>
          </div>
        )}
        <div>
          <Label htmlFor="balance-amount">Amount (NGN)</Label>
          <Input id="balance-amount" type="number" min="0.01" step="0.01" required value={amount} onChange={(event) => setAmount(event.target.value)} className="mt-2" />
        </div>
        <div className={type === "deposit" ? "" : "md:col-span-2"}>
          <Label htmlFor="balance-note">Note or reference</Label>
          <Input id="balance-note" value={note} onChange={(event) => setNote(event.target.value)} className="mt-2" />
        </div>
        <button disabled={saving || usersLoading || users.length === 0} className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60 md:col-span-2">
          {saving ? "Saving…" : "Record balance change"}
        </button>
      </form>

      <div>
        <h2 className="font-display text-2xl">Recent balance activity</h2>
        <LoadingMessage loading={loadingTransactions} />
        {!loadingTransactions && transactions.length === 0 && <p className="mt-3 text-sm text-muted-foreground">No balance changes yet.</p>}
        {!loadingTransactions && transactions.length > 0 && (
          <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[650px] text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Note</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-t border-border">
                    <td className="px-4 py-3">{userById.get(transaction.user_id)?.email ?? transaction.user_id}</td>
                    <td className="px-4 py-3 capitalize">{transaction.transaction_type}</td>
                    <td className="px-4 py-3">{transaction.transaction_type === "debit" ? "−" : "+"}{formatNGN(Number(transaction.amount_ngn))}</td>
                    <td className="px-4 py-3">{transaction.note || "—"}</td>
                    <td className="px-4 py-3">{new Date(transaction.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
