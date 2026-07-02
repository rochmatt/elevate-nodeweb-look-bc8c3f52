import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  AtSign,
  Award,
  BadgeCheck,
  Bell,
  Building2,
  Check,
  Copy,
  CreditCard,
  Crown,
  Fingerprint,
  Globe2,
  History,
  KeyRound,
  Laptop,
  Lock,
  Mail,
  MapPin,
  Moon,
  MoreHorizontal,
  Phone,
  Shield,
  ShieldCheck,
  Smartphone,
  Sun,
  Tablet,
  Trash2,
  Unlock,
  User,
  UserCircle,
  X,
} from "lucide-react";
import { Sidebar, Topbar } from "./dashboard";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile & Account — NodeKPT" },
      {
        name: "description",
        content:
          "Kelola profil, keamanan, sesi perangkat, dan preferensi notifikasi akun NodeKPT kamu.",
      },
    ],
  }),
  component: ProfilePage,
});

type TabId = "overview" | "personal" | "security" | "notifications" | "sessions";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          <div className="mx-auto max-w-6xl space-y-6">
            <ProfileHero />
            <TabNav active={activeTab} onChange={setActiveTab} />
            <TabPanel tab={activeTab} />
          </div>
        </main>
      </div>
    </div>
  );
}

/* ---------- Hero ---------- */

function ProfileHero() {
  const completion = 82;
  const badges = [
    { label: "Verified", icon: BadgeCheck, color: "bg-emerald-100 text-emerald-700" },
    { label: "Pro Buyer", icon: Crown, color: "bg-violet-100 text-violet-700" },
  ];

  return (
    <section className="relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700" />
      <div className="relative px-6 pb-6 pt-16 sm:px-8 sm:pb-8 sm:pt-20">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="grid h-24 w-24 place-items-center rounded-full border-4 border-white bg-slate-200 shadow-sm sm:h-28 sm:w-28">
                <User className="h-12 w-12 text-slate-400 sm:h-14 sm:w-14" />
              </div>
              <button className="absolute bottom-1 right-1 rounded-full bg-slate-900 p-1.5 text-white shadow hover:bg-slate-800">
                <UserCircle className="h-4 w-4" />
              </button>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Demo Buyer</h1>
              <p className="text-sm text-slate-500">buyer@nodekpt.com</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {badges.map((b) => (
                  <span
                    key={b.label}
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${b.color}`}
                  >
                    <b.icon className="h-3.5 w-3.5" />
                    {b.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full sm:w-64">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700">Profile Completion</span>
              <span className="font-semibold text-slate-900">{completion}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all"
                style={{ width: `${completion}%` }}
              />
            </div>
            <p className="mt-1.5 text-xs text-slate-500">Add phone + KYC to reach 100%.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Tab Nav ---------- */

const tabs: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "overview", label: "Overview", icon: User },
  { id: "personal", label: "Personal", icon: MapPin },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "sessions", label: "Sessions", icon: History },
];

function TabNav({ active, onChange }: { active: TabId; onChange: (id: TabId) => void }) {
  return (
    <div className="rounded-xl bg-white p-1.5 shadow-sm ring-1 ring-slate-200/70">
      <nav className="flex gap-1 overflow-x-auto">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                isActive
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Icon className="h-4 w-4" />
              {t.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

/* ---------- Tab Panel ---------- */

function TabPanel({ tab }: { tab: TabId }) {
  switch (tab) {
    case "overview":
      return <OverviewPanel />;
    case "personal":
      return <PersonalPanel />;
    case "security":
      return <SecurityPanel />;
    case "notifications":
      return <NotificationsPanel />;
    case "sessions":
      return <SessionsPanel />;
    default:
      return null;
  }
}

/* ---------- Overview Panel ---------- */

function OverviewPanel() {
  const referralCode = "NODEKPT-ASDF1234";

  const handleCopy = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(referralCode);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <Card>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Account Summary</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoItem icon={Mail} label="Email" value="buyer@nodekpt.com" />
            <InfoItem icon={Phone} label="Phone" value="+62 877 7867 8031" />
            <InfoItem icon={MapPin} label="Location" value="Jakarta, Indonesia" />
            <InfoItem icon={Building2} label="Company" value="-" />
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Verification Status</h2>
          <div className="space-y-4">
            <VerificationRow
              label="Email Verified"
              status="verified"
              description="Email kamu sudah terverifikasi."
            />
            <VerificationRow
              label="Phone Verified"
              status="verified"
              description="Nomor HP sudah terverifikasi."
            />
            <VerificationRow
              label="KYC Identity"
              status="pending"
              description="Upload KTP/paspor untuk meningkatkan limit."
            />
            <VerificationRow
              label="Tax Identity (NPWP)"
              status="optional"
              description="Opsional — diperlukan untuk invoice PPN."
            />
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-emerald-400" />
            <h2 className="text-lg font-semibold">Referral Program</h2>
          </div>
          <p className="mt-2 text-sm text-slate-300">
            Ajak teman dan dapatkan reward untuk setiap pendaftaran pertama.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <input
              readOnly
              value={referralCode}
              className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-300 outline-none"
            />
            <button
              onClick={handleCopy}
              className="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Quick Stats</h2>
          <div className="space-y-3">
            <StatItem label="Total Orders" value="12" />
            <StatItem label="Active Services" value="3" />
            <StatItem label="Pending Invoices" value="1" />
            <StatItem label="Reward Points" value="2.450" />
          </div>
        </Card>
      </div>
    </div>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-white text-slate-600 shadow-sm">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <p className="text-sm font-semibold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function VerificationRow({
  label,
  status,
  description,
}: {
  label: string;
  status: "verified" | "pending" | "optional";
  description: string;
}) {
  const styles = {
    verified: "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    optional: "bg-slate-100 text-slate-600 border-slate-200",
  };
  const labels = {
    verified: "Verified",
    pending: "Pending",
    optional: "Optional",
  };

  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
      <div>
        <p className="text-sm font-semibold text-slate-900">{label}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${styles[status]}`}>
        {labels[status]}
      </span>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-bold text-slate-900">{value}</span>
    </div>
  );
}

/* ---------- Personal Panel ---------- */

function PersonalPanel() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Personal Information</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField label="First Name" defaultValue="Demo" />
            <TextField label="Last Name" defaultValue="Buyer" />
            <TextField label="Email" type="email" defaultValue="buyer@nodekpt.com" />
            <TextField label="Phone" defaultValue="+62 877 7867 8031" />
            <div className="sm:col-span-2">
              <TextField label="Address" defaultValue="Jl. Sudirman No. 1" />
            </div>
            <TextField label="City" defaultValue="Jakarta" />
            <TextField label="State/Region" defaultValue="DKI Jakarta" />
            <TextField label="Country" defaultValue="Indonesia" />
            <TextField label="Zip Code" defaultValue="10110" />
          </div>
          <div className="mt-6">
            <button className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800">
              Save Changes
            </button>
          </div>
        </Card>
      </div>

      <div>
        <Card>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Language & Region</h2>
          <div className="space-y-4">
            <SelectField label="Language" defaultValue="Indonesia" options={["Indonesia", "English", "中文"]} />
            <SelectField label="Timezone" defaultValue="Asia/Jakarta" options={["Asia/Jakarta", "Asia/Singapore", "UTC"]} />
            <SelectField label="Currency" defaultValue="IDR" options={["IDR", "USD", "SGD"]} />
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ---------- Security Panel ---------- */

function SecurityPanel() {
  const score = 78;
  const scoreColor = score >= 80 ? "bg-emerald-500" : score >= 60 ? "bg-amber-500" : "bg-rose-500";
  const scoreLabel = score >= 80 ? "Strong" : score >= 60 ? "Good" : "Weak";

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <Card>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Change Password</h2>
          <div className="space-y-4">
            <TextField label="Current Password" type="password" />
            <TextField label="New Password" type="password" />
            <TextField label="Confirm New Password" type="password" />
          </div>
          <div className="mt-6">
            <button className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800">
              Update Password
            </button>
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Two-Factor Authentication</h2>
          <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <Shield className="mt-0.5 h-5 w-5 text-amber-600" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-amber-900">2FA is not enabled</p>
              <p className="text-xs text-amber-700">
                Aktifkan 2FA untuk melindungi akun kamu dengan lapisan tambahan.
              </p>
            </div>
            <button className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700">
              Enable
            </button>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Security Score</h2>
          <div className="flex items-center justify-center py-4">
            <div className="relative grid h-32 w-32 place-items-center">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                <path className="fill-none stroke-slate-100" strokeWidth="3" d="M18 2.084a15.916 15.916 0 0 1 0 31.832" />
                <path
                  className={`fill-none ${scoreColor}`}
                  strokeWidth="3"
                  strokeDasharray={`${score}, 100`}
                  d="M18 2.084a15.916 15.916 0 0 1 0 31.832"
                />
              </svg>
              <div className="absolute text-center">
                <p className="text-2xl font-bold text-slate-900">{score}</p>
                <p className="text-xs font-medium text-slate-500">{scoreLabel}</p>
              </div>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <SecurityCheck label="Strong password" ok />
            <SecurityCheck label="2FA enabled" ok={false} />
            <SecurityCheck label="Recovery email set" ok />
            <SecurityCheck label="No suspicious logins" ok />
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Recovery</h2>
          <div className="space-y-4">
            <TextField label="Recovery Email" type="email" defaultValue="backup@email.com" />
            <button className="w-full rounded-lg border border-slate-200 bg-white py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Update Recovery Email
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function SecurityCheck({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-600">{label}</span>
      {ok ? <Check className="h-4 w-4 text-emerald-500" /> : <X className="h-4 w-4 text-rose-500" />}
    </div>
  );
}

/* ---------- Notifications Panel ---------- */

function NotificationsPanel() {
  const rows = [
    { channel: "Order updates", email: true, push: true, sms: false },
    { channel: "Invoices & billing", email: true, push: true, sms: true },
    { channel: "Promotions", email: false, push: false, sms: false },
    { channel: "Security alerts", email: true, push: true, sms: true },
    { channel: "Service reminders", email: true, push: false, sms: false },
  ];

  return (
    <Card>
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Notification Preferences</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase text-slate-500">
              <th className="pb-3 pr-4">Channel</th>
              <th className="pb-3 pr-4 text-center">Email</th>
              <th className="pb-3 pr-4 text-center">Push</th>
              <th className="pb-3 text-center">SMS</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.channel} className="border-b border-slate-100 last:border-0">
                <td className="py-3 pr-4 text-sm font-medium text-slate-900">{row.channel}</td>
                <td className="py-3 pr-4 text-center">
                  <Toggle checked={row.email} />
                </td>
                <td className="py-3 pr-4 text-center">
                  <Toggle checked={row.push} />
                </td>
                <td className="py-3 text-center">
                  <Toggle checked={row.sms} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <button className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800">
          Save Preferences
        </button>
      </div>
    </Card>
  );
}

function Toggle({ checked }: { checked: boolean }) {
  return (
    <button
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
        checked ? "bg-emerald-500" : "bg-slate-200"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

/* ---------- Sessions Panel ---------- */

function SessionsPanel() {
  const sessions = [
    {
      id: "1",
      device: "Chrome on macOS",
      icon: Laptop,
      location: "Jakarta, Indonesia",
      ip: "103.1xx.xx.12",
      lastActive: "Active now",
      current: true,
    },
    {
      id: "2",
      device: "Safari on iPhone",
      icon: Smartphone,
      location: "Jakarta, Indonesia",
      ip: "114.1xx.xx.45",
      lastActive: "2 hours ago",
      current: false,
    },
    {
      id: "3",
      device: "Chrome on Android",
      icon: Smartphone,
      location: "Bandung, Indonesia",
      ip: "182.2xx.xx.89",
      lastActive: "3 days ago",
      current: false,
    },
    {
      id: "4",
      device: "Edge on Windows",
      icon: Laptop,
      location: "Singapore",
      ip: "43.2xx.xx.10",
      lastActive: "2 weeks ago",
      current: false,
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Active Sessions</h2>
          <div className="space-y-3">
            {sessions.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-slate-100 text-slate-600">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-slate-900">{s.device}</p>
                      {s.current ? (
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                          Current
                        </span>
                      ) : null}
                    </div>
                    <p className="text-xs text-slate-500">
                      {s.location} · IP {s.ip} · {s.lastActive}
                    </p>
                  </div>
                </div>
                {!s.current ? (
                  <button className="rounded-lg border border-rose-200 p-2 text-rose-600 hover:bg-rose-50">
                    <Trash2 className="h-4 w-4" />
                  </button>
                ) : null}
              </div>
            ))}
          </div>
          <div className="mt-6">
            <button className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
              Log Out All Other Sessions
            </button>
          </div>
        </Card>
      </div>

      <div>
        <Card>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Login History</h2>
          <div className="space-y-4">
            <HistoryItem time="Today, 09:41" event="Successful login" location="Jakarta, ID" />
            <HistoryItem time="Yesterday, 18:20" event="Successful login" location="Jakarta, ID" />
            <HistoryItem time="Jun 28, 14:03" event="Password changed" location="Jakarta, ID" />
            <HistoryItem time="Jun 25, 08:15" event="2FA disabled" location="Bandung, ID" />
          </div>
        </Card>
      </div>
    </div>
  );
}

function HistoryItem({
  time,
  event,
  location,
}: {
  time: string;
  event: string;
  location: string;
}) {
  return (
    <div className="flex items-start gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
      <div className="mt-0.5 h-2 w-2 rounded-full bg-emerald-500" />
      <div>
        <p className="text-sm font-medium text-slate-900">{event}</p>
        <p className="text-xs text-slate-500">
          {time} · {location}
        </p>
      </div>
    </div>
  );
}

/* ---------- Reusable UI ---------- */

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm ${className}`}
    >
      {children}
    </section>
  );
}

function TextField({
  label,
  type = "text",
  defaultValue,
}: {
  label: string;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
      />
    </div>
  );
}

function SelectField({
  label,
  defaultValue,
  options,
}: {
  label: string;
  defaultValue?: string;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</label>
      <select
        defaultValue={defaultValue}
        className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
