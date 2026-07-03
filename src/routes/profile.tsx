import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  BadgeCheck,
  Bell,
  Building2,
  Calendar,
  Camera,
  Check,
  ChevronRight,
  Copy,
  CreditCard,
  Edit3,
  Fingerprint,
  Globe,
  Key,
  Languages,
  Lock,
  Mail,
  MapPin,
  Monitor,
  Phone,
  Save,
  Shield,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Trash2,
  Trophy,
  User as UserIcon,
  Zap,
} from "lucide-react";
import { Sidebar, Topbar } from "./dashboard";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile & Account — NodeKPT" },
      {
        name: "description",
        content:
          "Manage your NodeKPT account: personal information, security settings, verification, notifications, and connected devices.",
      },
    ],
  }),
  component: ProfilePage,
});

type TabId = "overview" | "personal" | "security" | "notifications" | "sessions";

function ProfilePage() {
  const [tab, setTab] = useState<TabId>("overview");

  return (
    <div className="theme-light min-h-screen bg-background text-foreground">
      <div className="constellation pointer-events-none fixed inset-0 opacity-40" aria-hidden />
      <div className="radial-glow pointer-events-none fixed left-1/3 top-0 h-[600px] w-[900px] -translate-x-1/2" aria-hidden />

      <div className="relative flex">
        <Sidebar activeLabel="Profile" />
        <main className="min-w-0 flex-1">
          <Topbar />
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
            <PageHeader />
            <ProfileHero />
            <Tabs current={tab} onChange={setTab} />
            <div className="mt-6">
              {tab === "overview" && <OverviewPanel />}
              {tab === "personal" && <PersonalPanel />}
              {tab === "security" && <SecurityPanel />}
              {tab === "notifications" && <NotificationsPanel />}
              {tab === "sessions" && <SessionsPanel />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ---------- HEADER ---------- */
function PageHeader() {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-medium text-muted-foreground">
          <UserIcon className="h-3.5 w-3.5 text-[color:var(--accent-strong)]" />
          Account Center
        </div>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Profile & Account
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your identity, security, and how NodeKPT keeps in touch with you.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-[color:var(--accent-tint)]">
          <Edit3 className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
          Edit profile
        </button>
        <button className="inline-flex items-center gap-2 rounded-lg bg-[color:var(--accent)] px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[color:var(--accent-strong)]">
          <Save className="h-4 w-4" strokeWidth={2} />
          Save changes
        </button>
      </div>
    </div>
  );
}

/* ---------- HERO ---------- */
function ProfileHero() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
      {/* Cover */}
      <div className="relative h-32 bg-gradient-to-br from-[color:var(--accent)]/25 via-[color:var(--accent-tint)] to-transparent sm:h-40">
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_1px_1px,var(--foreground)_1px,transparent_0)] [background-size:22px_22px]" />
        <button className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-background/80 px-2.5 py-1.5 text-[11px] font-medium text-foreground backdrop-blur transition-colors hover:bg-background">
          <Camera className="h-3.5 w-3.5" strokeWidth={1.75} />
          Change cover
        </button>
      </div>

      <div className="relative px-5 pb-5 sm:px-8 sm:pb-8">
        {/* Avatar */}
        <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <div className="relative">
              <div className="grid h-24 w-24 place-items-center rounded-2xl border-4 border-card bg-gradient-to-br from-[color:var(--accent)] to-[color:var(--accent-strong)] text-3xl font-semibold text-white shadow-lg sm:h-28 sm:w-28">
                AR
              </div>
              <button className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-[color:var(--accent-strong)]">
                <Camera className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>
            <div className="pb-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  Andi Rahman
                </h2>
                <BadgeCheck className="h-5 w-5 text-[color:var(--accent-strong)]" strokeWidth={2} />
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" strokeWidth={1.75} />
                  andi.rahman@nodekpt.id
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
                  Jakarta, Indonesia
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Chip icon={ShieldCheck} label="KYC Verified" tone="success" />
                <Chip icon={Trophy} label="Pro Seller" tone="accent" />
                <Chip icon={Star} label="4.9 Rating" tone="warning" />
              </div>
            </div>
          </div>

          <div className="hidden shrink-0 flex-col items-end gap-1 sm:flex">
            <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Member since
            </div>
            <div className="text-sm font-semibold text-foreground">March 12, 2023</div>
            <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-[color:var(--accent-tint)] px-2 py-0.5 text-[11px] font-medium text-[color:var(--accent-strong)]">
              <Sparkles className="h-3 w-3" strokeWidth={2} />
              Level 5 · Trusted
            </div>
          </div>
        </div>

        {/* Completion */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <CompletionCard percent={85} />
          <MiniStat icon={Zap} label="Active Services" value="12" hint="+2 this month" />
          <MiniStat icon={CreditCard} label="Lifetime Spend" value="Rp 18.4M" hint="Since 2023" />
        </div>
      </div>
    </div>
  );
}

function Chip({
  icon: Icon,
  label,
  tone,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  tone: "success" | "accent" | "warning";
}) {
  const tones = {
    success: "border-emerald-200 bg-emerald-50 text-emerald-700",
    accent:
      "border-[color:var(--accent)]/25 bg-[color:var(--accent-tint)] text-[color:var(--accent-strong)]",
    warning: "border-amber-200 bg-amber-50 text-amber-700",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${tones[tone]}`}
    >
      <Icon className="h-3 w-3" strokeWidth={2} />
      {label}
    </span>
  );
}

function CompletionCard({ percent }: { percent: number }) {
  return (
    <div className="rounded-xl border border-border bg-background/60 p-4">
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Profile completion
        </div>
        <span className="text-sm font-semibold text-foreground">{percent}%</span>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[color:var(--accent)] to-[color:var(--accent-strong)]"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="mt-2 text-[11px] text-muted-foreground">
        Add tax ID and enable 2FA to reach 100%.
      </div>
    </div>
  );
}

function MiniStat({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-background/60 p-4">
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </div>
        <Icon className="h-4 w-4 text-[color:var(--accent-strong)]" strokeWidth={1.75} />
      </div>
      <div className="mt-2 text-xl font-semibold tracking-tight text-foreground">{value}</div>
      <div className="mt-1 text-[11px] text-muted-foreground">{hint}</div>
    </div>
  );
}

/* ---------- TABS ---------- */
function Tabs({ current, onChange }: { current: TabId; onChange: (t: TabId) => void }) {
  const items: { id: TabId; label: string; icon: React.ComponentType<{ className?: string; strokeWidth?: number }> }[] = [
    { id: "overview", label: "Overview", icon: UserIcon },
    { id: "personal", label: "Personal Info", icon: Edit3 },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "sessions", label: "Devices & Sessions", icon: Monitor },
  ];
  return (
    <div className="mt-8 flex gap-1 overflow-x-auto rounded-xl border border-border bg-card p-1">
      {items.map(({ id, label, icon: Icon }) => {
        const active = current === id;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors ${
              active
                ? "bg-[color:var(--accent-tint)] text-[color:var(--accent-strong)]"
                : "text-muted-foreground hover:bg-[color:var(--accent-tint)]/60 hover:text-foreground"
            }`}
          >
            <Icon className="h-4 w-4" strokeWidth={1.75} />
            {label}
          </button>
        );
      })}
    </div>
  );
}

/* ---------- OVERVIEW ---------- */
function OverviewPanel() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <Card title="Account Summary" icon={UserIcon}>
          <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <Field label="Full name" value="Andi Rahman" />
            <Field label="Username" value="@andirahman" />
            <Field label="Email" value="andi.rahman@nodekpt.id" verified />
            <Field label="Phone" value="+62 812-3456-7890" verified />
            <Field label="Country" value="Indonesia" />
            <Field label="Timezone" value="GMT+7 · Jakarta" />
          </dl>
        </Card>

        <Card title="Verification Status" icon={ShieldCheck}>
          <div className="grid gap-3 sm:grid-cols-2">
            <VerificationRow icon={Mail} title="Email address" status="verified" />
            <VerificationRow icon={Phone} title="Phone number" status="verified" />
            <VerificationRow icon={Fingerprint} title="Identity (KYC)" status="verified" />
            <VerificationRow icon={Building2} title="Business / Tax ID" status="pending" />
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <Card title="Referral Code" icon={Sparkles}>
          <div className="rounded-lg border border-dashed border-[color:var(--accent)]/40 bg-[color:var(--accent-tint)] p-4">
            <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-[color:var(--accent-strong)]">
              Your code
            </div>
            <div className="mt-1 flex items-center justify-between gap-2">
              <span className="font-mono text-lg font-semibold text-foreground">ANDI-NKPT-2024</span>
              <button className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-[11px] font-medium text-foreground hover:bg-background">
                <Copy className="h-3 w-3" strokeWidth={2} />
                Copy
              </button>
            </div>
          </div>
          <div className="mt-3 text-[12px] text-muted-foreground">
            Earn <span className="font-semibold text-foreground">10%</span> commission for every new
            user that signs up with your code.
          </div>
        </Card>

        <Card title="Quick Actions" icon={Zap}>
          <ul className="space-y-1">
            {[
              { icon: Key, label: "Change password" },
              { icon: Smartphone, label: "Enable 2FA" },
              { icon: Languages, label: "Change language" },
              { icon: Trash2, label: "Delete account", danger: true },
            ].map(({ icon: Icon, label, danger }) => (
              <li key={label}>
                <button
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-[13px] transition-colors ${
                    danger
                      ? "text-red-600 hover:bg-red-50"
                      : "text-foreground hover:bg-[color:var(--accent-tint)]"
                  }`}
                >
                  <span className="inline-flex items-center gap-2.5">
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                    {label}
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
                </button>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

function Field({ label, value, verified }: { label: string; value: string; verified?: boolean }) {
  return (
    <div>
      <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 flex items-center gap-2 text-sm font-medium text-foreground">
        {value}
        {verified && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700">
            <Check className="h-2.5 w-2.5" strokeWidth={3} />
            Verified
          </span>
        )}
      </dd>
    </div>
  );
}

function VerificationRow({
  icon: Icon,
  title,
  status,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  status: "verified" | "pending" | "missing";
}) {
  const map = {
    verified: {
      cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
      label: "Verified",
    },
    pending: {
      cls: "bg-amber-50 text-amber-700 border-amber-200",
      label: "Pending",
    },
    missing: {
      cls: "bg-red-50 text-red-700 border-red-200",
      label: "Missing",
    },
  } as const;
  const s = map[status];
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-background/60 px-3.5 py-3">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-[color:var(--accent-tint)]">
          <Icon className="h-4 w-4 text-[color:var(--accent-strong)]" strokeWidth={1.75} />
        </div>
        <div className="text-[13px] font-medium text-foreground">{title}</div>
      </div>
      <span className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${s.cls}`}>
        {s.label}
      </span>
    </div>
  );
}

/* ---------- PERSONAL ---------- */
function PersonalPanel() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card title="Personal Information" icon={Edit3}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="First name" defaultValue="Andi" />
            <Input label="Last name" defaultValue="Rahman" />
            <Input label="Display name" defaultValue="andirahman" />
            <Input label="Email" defaultValue="andi.rahman@nodekpt.id" type="email" />
            <Input label="Phone" defaultValue="+62 812-3456-7890" />
            <Input label="Date of birth" defaultValue="1994-08-14" type="date" />
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Bio
              </label>
              <textarea
                rows={3}
                defaultValue="Cloud engineer & VPS seller based in Jakarta. Building reliable infrastructure for Indonesian developers."
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-[color:var(--accent)]"
              />
            </div>
          </div>
        </Card>
      </div>

      <div>
        <Card title="Address" icon={MapPin}>
          <div className="space-y-4">
            <Input label="Street" defaultValue="Jl. Sudirman No. 42" />
            <div className="grid grid-cols-2 gap-3">
              <Input label="City" defaultValue="Jakarta" />
              <Input label="Postal code" defaultValue="10220" />
            </div>
            <Select label="Country" options={["Indonesia", "Singapore", "Malaysia"]} />
          </div>
        </Card>
      </div>
    </div>
  );
}

function Input({
  label,
  defaultValue,
  type = "text",
}: {
  label: string;
  defaultValue?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-[color:var(--accent)]"
      />
    </div>
  );
}

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </label>
      <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-[color:var(--accent)]">
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

/* ---------- SECURITY ---------- */
function SecurityPanel() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <Card title="Password" icon={Lock}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Current password" type="password" defaultValue="********" />
            <div />
            <Input label="New password" type="password" />
            <Input label="Confirm new password" type="password" />
          </div>
          <div className="mt-4 flex justify-end">
            <button className="inline-flex items-center gap-2 rounded-lg bg-[color:var(--accent)] px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[color:var(--accent-strong)]">
              <Save className="h-4 w-4" strokeWidth={2} />
              Update password
            </button>
          </div>
        </Card>

        <Card title="Two-Factor Authentication" icon={Smartphone}>
          <div className="space-y-3">
            <ToggleRow
              icon={Smartphone}
              title="Authenticator app"
              desc="Use Google Authenticator, Authy, or 1Password."
              enabled
            />
            <ToggleRow
              icon={Mail}
              title="Email codes"
              desc="Receive a one-time code by email at each login."
              enabled={false}
            />
            <ToggleRow
              icon={Key}
              title="Hardware security key"
              desc="Sign in with a YubiKey or other WebAuthn device."
              enabled={false}
            />
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <Card title="Security Score" icon={ShieldCheck}>
          <div className="text-center">
            <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border-4 border-[color:var(--accent-tint)]">
              <div className="text-2xl font-semibold text-foreground">82</div>
            </div>
            <div className="mt-3 text-sm font-medium text-foreground">Strong protection</div>
            <div className="mt-1 text-[12px] text-muted-foreground">
              Add a backup 2FA method to reach 100%.
            </div>
          </div>
        </Card>

        <Card title="Recent Activity" icon={Calendar}>
          <ul className="space-y-3 text-[12px]">
            {[
              { t: "Signed in", d: "Chrome on macOS · Jakarta · 2h ago" },
              { t: "Password changed", d: "Yesterday, 14:22" },
              { t: "New device authorized", d: "iPhone 15 · 3 days ago" },
            ].map((a) => (
              <li key={a.t} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                <div>
                  <div className="font-medium text-foreground">{a.t}</div>
                  <div className="text-muted-foreground">{a.d}</div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

function ToggleRow({
  icon: Icon,
  title,
  desc,
  enabled,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  desc: string;
  enabled: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background/60 px-4 py-3">
      <div className="flex items-start gap-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[color:var(--accent-tint)]">
          <Icon className="h-4 w-4 text-[color:var(--accent-strong)]" strokeWidth={1.75} />
        </div>
        <div>
          <div className="text-[13px] font-semibold text-foreground">{title}</div>
          <div className="mt-0.5 text-[12px] text-muted-foreground">{desc}</div>
        </div>
      </div>
      <Toggle enabled={enabled} />
    </div>
  );
}

function Toggle({ enabled }: { enabled: boolean }) {
  const [on, setOn] = useState(enabled);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
        on ? "bg-[color:var(--accent)]" : "bg-border"
      }`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${
          on ? "left-4" : "left-0.5"
        }`}
      />
    </button>
  );
}

/* ---------- NOTIFICATIONS ---------- */
function NotificationsPanel() {
  const groups = [
    {
      title: "Account & Security",
      items: [
        { label: "New sign-in from unknown device", email: true, push: true },
        { label: "Password or 2FA changes", email: true, push: true },
        { label: "KYC status updates", email: true, push: false },
      ],
    },
    {
      title: "Billing",
      items: [
        { label: "Invoice issued", email: true, push: false },
        { label: "Payment received", email: true, push: true },
        { label: "Wallet low balance", email: false, push: true },
      ],
    },
    {
      title: "Marketplace",
      items: [
        { label: "New order on your listing", email: true, push: true },
        { label: "Product review received", email: false, push: true },
        { label: "Promotions and offers", email: false, push: false },
      ],
    },
  ];
  return (
    <div className="space-y-6">
      {groups.map((g) => (
        <Card key={g.title} title={g.title} icon={Bell}>
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-[13px]">
              <thead className="bg-background/60 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">Notification</th>
                  <th className="px-4 py-2 text-center font-medium">Email</th>
                  <th className="px-4 py-2 text-center font-medium">Push</th>
                </tr>
              </thead>
              <tbody>
                {g.items.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 0 ? "bg-card" : "bg-background/40"}
                  >
                    <td className="px-4 py-3 text-foreground">{row.label}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-flex">
                        <Toggle enabled={row.email} />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-flex">
                        <Toggle enabled={row.push} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ))}
    </div>
  );
}

/* ---------- SESSIONS ---------- */
function SessionsPanel() {
  const sessions = [
    {
      device: "MacBook Pro 14",
      browser: "Chrome 126 · macOS Sonoma",
      loc: "Jakarta, ID",
      ip: "182.253.xx.xx",
      when: "Active now",
      current: true,
    },
    {
      device: "iPhone 15 Pro",
      browser: "Safari · iOS 17.5",
      loc: "Jakarta, ID",
      ip: "114.10.xx.xx",
      when: "2 hours ago",
      current: false,
    },
    {
      device: "Windows PC",
      browser: "Firefox 128 · Windows 11",
      loc: "Bandung, ID",
      ip: "36.72.xx.xx",
      when: "Yesterday, 21:04",
      current: false,
    },
    {
      device: "iPad Air",
      browser: "Safari · iPadOS 17",
      loc: "Bali, ID",
      ip: "180.244.xx.xx",
      when: "3 days ago",
      current: false,
    },
  ];
  return (
    <Card title="Active Devices & Sessions" icon={Monitor}>
      <div className="mb-4 flex items-center justify-between">
        <div className="text-[12px] text-muted-foreground">
          {sessions.length} devices signed in to your account
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-[12px] font-medium text-red-700 transition-colors hover:bg-red-100">
          <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
          Sign out all others
        </button>
      </div>
      <ul className="space-y-2">
        {sessions.map((s) => (
          <li
            key={s.device + s.ip}
            className="flex flex-col gap-3 rounded-xl border border-border bg-background/60 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[color:var(--accent-tint)]">
                {s.device.toLowerCase().includes("iphone") ||
                s.device.toLowerCase().includes("ipad") ? (
                  <Smartphone className="h-4 w-4 text-[color:var(--accent-strong)]" strokeWidth={1.75} />
                ) : (
                  <Monitor className="h-4 w-4 text-[color:var(--accent-strong)]" strokeWidth={1.75} />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-semibold text-foreground">{s.device}</span>
                  {s.current && (
                    <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700">
                      This device
                    </span>
                  )}
                </div>
                <div className="mt-0.5 text-[12px] text-muted-foreground">{s.browser}</div>
                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Globe className="h-3 w-3" strokeWidth={1.75} />
                    {s.loc} · {s.ip}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" strokeWidth={1.75} />
                    {s.when}
                  </span>
                </div>
              </div>
            </div>
            {!s.current && (
              <button className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-[12px] font-medium text-foreground hover:bg-[color:var(--accent-tint)]">
                <Trash2 className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.75} />
                Revoke
              </button>
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* ---------- CARD ---------- */
function Card({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-[color:var(--accent-tint)]">
          <Icon className="h-4 w-4 text-[color:var(--accent-strong)]" strokeWidth={1.75} />
        </div>
        <h3 className="text-sm font-semibold tracking-tight text-foreground">{title}</h3>
      </div>
      {children}
    </section>
  );
}
