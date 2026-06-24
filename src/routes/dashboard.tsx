import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  ChevronDown,
  Globe,
  HeartHandshake,
  HelpCircle,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Package,
  Receipt,
  RefreshCw,
  Scale,
  Search,
  Server,
  ShoppingCart,
  Sparkles,
  Store,
  TrendingUp,
  User,
  Wallet,
  Heart,
  Clock,
  HardDrive,
  Download,
  BookOpen,
  Gift,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — NodeKPT · Buy & Sell VPS Servers with Full Control" },
      { name: "description", content: "Marketplace where anyone can sell VPSes and buyers get direct server control via an integrated panel. Pay in IDR (QRIS, VA). Full root access." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="theme-light min-h-screen bg-background text-foreground">
      <div className="constellation pointer-events-none fixed inset-0 opacity-40" aria-hidden />
      <div className="radial-glow pointer-events-none fixed left-1/3 top-0 h-[600px] w-[900px] -translate-x-1/2" aria-hidden />

      <div className="relative flex">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <Topbar />
          <div className="mx-auto max-w-7xl px-8 py-10">
            <Header />
            <Stats />
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              <WalletCard />
              <ReferralCard />
            </div>
            <MyVPS />
            <RecentOrders />
          </div>
        </main>
      </div>
    </div>
  );
}

/* ---------- SIDEBAR ---------- */
function Sidebar() {
  const main = [
    { icon: LayoutDashboard, label: "Dashboard", active: true, iconColor: "text-teal-600" },
    { icon: Store, label: "Marketplace", iconColor: "text-blue-600" },
    { icon: Globe, label: "Proxy", iconColor: "text-indigo-600" },
    { icon: HardDrive, label: "Bare Metal", iconColor: "text-violet-600" },
  ];
  const services = [
    { icon: Server, label: "My VPS", iconColor: "text-sky-600" },
    { icon: Download, label: "Winstaller", iconColor: "text-cyan-600" },
    { icon: HardDrive, label: "My Bare Metal", iconColor: "text-purple-600" },
    { icon: Package, label: "Orders", iconColor: "text-amber-600" },
    { icon: Wallet, label: "Wallet & Balance", iconColor: "text-emerald-600" },
    { icon: Heart, label: "Wishlist", iconColor: "text-rose-500" },
    { icon: Clock, label: "Recently Viewed", iconColor: "text-slate-600" },
    { icon: MessageSquare, label: "Messages", iconColor: "text-blue-500" },
    { icon: RefreshCw, label: "Subscriptions", iconColor: "text-orange-600" },
    { icon: Gift, label: "Referrals", iconColor: "text-pink-600" },
    { icon: Scale, label: "Disputes", iconColor: "text-red-600" },
  ];
  const account = [
    { icon: BookOpen, label: "Guide", iconColor: "text-lime-600" },
    { icon: LifeBuoy, label: "Support", iconColor: "text-teal-500" },
    { icon: Mail, label: "Contact", iconColor: "text-sky-500" },
    { icon: User, label: "Profile", iconColor: "text-fuchsia-600" },
  ];

  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-border/60 bg-card/40 backdrop-blur-xl lg:flex lg:flex-col">
      <Link to="/" className="flex items-center gap-2.5 border-b border-border/60 px-6 py-5">
        <div className="grid h-10 w-10 place-items-center rounded-lg border border-gold/30 bg-gradient-to-br from-gold-soft/20 to-transparent">

          <span className="text-lg font-bold leading-none text-gold">N</span>
        </div>
        <div className="leading-tight">
          <div className="text-lg font-bold tracking-tight">NodeKPT</div>
          <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/50">Buy & Sell VPS</div>
        </div>
      </Link>
      <div className="flex-1 overflow-y-auto px-3 py-5">
        {/* Become a Seller CTA */}
        <button className="group mb-6 flex w-full items-center gap-3 rounded-xl bg-gradient-to-b from-gold-soft to-gold-deep px-4 py-3 text-left text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:-translate-y-0.5">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-black/15">

            <Store className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium leading-tight">Become a Seller</div>
            <div className="text-[11px] opacity-80">List your VPS on the marketplace</div>
          </div>
          <ArrowRight className="h-4 w-4 opacity-80 transition-transform group-hover:translate-x-0.5" />
        </button>
        <NavGroup title="Main" items={main} />
        <NavGroup title="Services" items={services} />
        <NavGroup title="Account" items={account} />
      </div>
      <button className="mx-3 mb-4 flex items-center gap-3 rounded-xl border border-border/60 px-4 py-3 text-sm font-semibold text-foreground/80 transition-colors hover:border-gold/30 hover:text-foreground">

        <LogOut className="h-4 w-4 text-foreground/50" />
        Logout
      </button>
    </aside>
  );
}

function NavGroup({
  title,
  items,
}: {
  title: string;
  items: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    active?: boolean;
    iconColor: string;
  }[];
}) {
  return (
    <div className="mb-6">

      <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/50">
        {title}
      </div>
      <ul className="space-y-1">
        {items.map(({ icon: Icon, label, active, iconColor }) => (
          <li key={label}>
            <a
              href="#"
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
                active
                  ? "border border-gold/20 bg-gold/10 text-foreground"
                  : "text-foreground/80 hover:bg-gold/[0.03] hover:text-foreground"
              }`}
            >
              <Icon
                className={`h-5 w-5 transition-colors ${
                  active ? iconColor : `${iconColor} opacity-80 group-hover:opacity-100`
                }`}
              />

              <span>{label}</span>
              {active && (
                <span className="ml-auto h-2 w-2 rounded-full bg-gold shadow-[0_0_8px_var(--gold)]" />
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- TOPBAR ---------- */

function Topbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-8 py-4">
        <div className="relative hidden flex-1 max-w-md md:block">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search VPS, Bare Metal, or Proxy..."
            className="h-10 w-full rounded-xl border border-border bg-card/60 pl-10 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:border-gold/40"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-border bg-background/60 px-1.5 py-0.5 text-[10px] text-muted-foreground">
            ⌘K
          </span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <IconButton icon={ShoppingCart} badge="3" iconColor="text-amber-600" />
          <IconButton icon={MessageSquare} iconColor="text-blue-600" />
          <button className="flex h-10 items-center gap-1.5 rounded-xl border border-border bg-card/60 px-3 text-sm font-semibold text-foreground/80 transition-colors hover:text-foreground">
            <Globe className="h-4 w-4 text-indigo-600" />
            EN
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          <IconButton icon={Bell} badge="99+" iconColor="text-rose-600" />

          <div className="ml-2 flex items-center gap-3 rounded-xl border border-border bg-card/60 py-1.5 pl-1.5 pr-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-gold-soft to-gold-deep font-serif text-base text-primary-foreground">
              D
            </div>
            <div className="hidden text-right leading-tight sm:block">
              <div className="text-sm font-semibold text-foreground">Demo Buyer</div>
              <div className="text-[10px] text-foreground/60">buyer@nodekpt.com</div>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-foreground/60" />
          </div>
        </div>
      </div>
    </header>
  );
}

function IconButton({
  icon: Icon,
  badge,
  iconColor = "text-foreground/70",
}: {
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  iconColor?: string;
}) {
  return (
    <button className="relative grid h-10 w-10 place-items-center rounded-xl border border-border bg-card/60 transition-colors hover:border-gold/30">
      <Icon className={`h-4 w-4 ${iconColor}`} />
      {badge && (
        <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-gradient-to-b from-gold-soft to-gold-deep px-1 text-[9px] font-semibold text-primary-foreground">
          {badge}
        </span>
      )}
    </button>
  );
}

/* ---------- HEADER ---------- */
function Header() {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-deep">
          <Sparkles className="h-3 w-3" /> Buy & Sell VPS Servers
        </div>
        <h1 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight md:text-4xl">
          Welcome back,{" "}
          <span className="text-gold-gradient">Demo Buyer</span>.
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          The first marketplace where anyone can sell VPSes and buyers get direct server control via an integrated panel — no long contracts, pay in IDR (QRIS, VA), full root access.
        </p>
      </div>
      <button className="group inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium transition-colors hover:border-gold/30 hover:text-gold-deep">
        <Store className="h-4 w-4 text-gold-deep" />
        Browse VPS
        <ArrowUpRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

/* ---------- STATS ---------- */
function Stats() {
  const stats = [
    { label: "Active VPS", value: "0", icon: Server, hint: "Deploy in under 60 seconds", iconColor: "text-sky-600", ringColor: "border-sky-500/30 bg-sky-500/10" },
    { label: "Total Orders", value: "60", icon: Package, hint: "+4 this week", trend: true, iconColor: "text-amber-600", ringColor: "border-amber-500/30 bg-amber-500/10" },
    { label: "Pending Orders", value: "1", icon: Clock, hint: "Awaiting payment (QRIS / VA)", iconColor: "text-orange-600", ringColor: "border-orange-500/30 bg-orange-500/10" },
    { label: "Total VPS", value: "0", icon: HardDrive, hint: "Across all sellers", iconColor: "text-violet-600", ringColor: "border-violet-500/30 bg-violet-500/10" },
  ];
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 transition-all hover:-translate-y-0.5 hover:border-gold/30"
        >
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gold/5 blur-2xl transition-opacity group-hover:bg-gold/10" />
          <div className="relative flex items-start justify-between">
            <div className={`grid h-11 w-11 place-items-center rounded-xl border ${s.ringColor}`}>
              <s.icon className={`h-5 w-5 ${s.iconColor}`} />
            </div>
            {s.trend && (
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-600/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                <TrendingUp className="h-3 w-3" /> +12%
              </span>
            )}
          </div>
          <div className="relative mt-6 text-4xl font-bold leading-none tracking-tight">
            {s.value}
          </div>
          <div className="relative mt-4 flex items-center justify-between">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/70">{s.label}</div>
          </div>
          <div className="relative mt-1 text-[11px] leading-relaxed text-foreground/60">{s.hint}</div>
        </div>
      ))}
    </div>
  );
}

/* ---------- WALLET CARD ---------- */
function WalletCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/[0.08] via-card to-card p-7 shadow-[var(--shadow-gold)] lg:col-span-2">
      <div className="constellation absolute inset-0 opacity-50" aria-hidden />
      <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-gold/15 blur-3xl" aria-hidden />

      <div className="relative flex flex-wrap items-start justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-deep">
            <Wallet className="h-3.5 w-3.5" /> Wallet Balance
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-xl font-semibold text-muted-foreground">Rp</span>
            <span className="text-5xl font-bold tracking-tight leading-none text-gold-gradient">618.147</span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Usable for your next deploy — VPS, Bare Metal, or Proxy</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-b from-gold-soft to-gold-deep px-4 py-2 text-sm text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:-translate-y-0.5">
              Top Up <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/40 px-4 py-2 text-sm text-foreground transition-colors hover:border-gold/30 hover:text-gold">
              <Receipt className="h-3.5 w-3.5" /> History
            </button>
          </div>
        </div>

        <div className="min-w-[240px] flex-1 rounded-xl border border-border bg-background/40 p-4 backdrop-blur">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Recent Refunds
          </div>
          <ul className="mt-3 space-y-2.5 text-sm">
            <li className="flex items-center justify-between border-b border-border/60 pb-2.5">
              <div>
                <div className="text-foreground">KPT-0001</div>
                <div className="text-[11px] text-muted-foreground">9/6/2026</div>
              </div>
              <span className="font-mono text-emerald-700">+Rp 10.000</span>
            </li>
            <li className="flex items-center justify-between border-b border-border/60 pb-2.5">
              <div>
                <div className="text-foreground">KPT-0014</div>
                <div className="text-[11px] text-muted-foreground">2/6/2026</div>
              </div>
              <span className="font-mono text-emerald-700">+Rp 25.000</span>
            </li>
            <li className="flex items-center justify-between">
              <div>
                <div className="text-foreground">KPT-0022</div>
                <div className="text-[11px] text-muted-foreground">28/5/2026</div>
              </div>
              <span className="font-mono text-emerald-700">+Rp 8.500</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------- REFERRAL ---------- */
function ReferralCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card/60 p-7">
      <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative">
        <HeartHandshake className="h-6 w-6 text-gold" />
        <h3 className="mt-4 text-xl font-bold leading-snug tracking-tight">
          Invite friends, <span className="text-gold-gradient">earn balance</span>.
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Rp 25.000 for every friend who joins and makes their first top up.
        </p>
        <div className="mt-5 flex items-center gap-2 rounded-lg border border-border bg-background/40 p-1 pl-3">
          <span className="font-mono text-sm text-gold">nodekpt.com/r/demo</span>
          <button className="ml-auto rounded-md bg-gradient-to-b from-gold-soft to-gold-deep px-3 py-1.5 text-xs text-primary-foreground">
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- MY VPS ---------- */
function MyVPS() {
  return (
    <section className="mt-8 rounded-2xl border border-border bg-card/40 p-7">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight">My VPS</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Active servers you control directly via the integrated panel</p>
        </div>
        <a href="#" className="inline-flex items-center gap-1.5 text-sm text-gold-deep hover:gap-2.5 transition-all">
          View All <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-8 grid place-items-center rounded-xl border border-dashed border-border/80 bg-background/60 py-16 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-xl border border-gold/30 bg-gold/5">
          <Server className="h-6 w-6 text-gold-deep" />
        </div>
        <h3 className="mt-5 text-lg font-bold tracking-tight">No active VPS yet</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Choose a VPS from trusted sellers — Jakarta, Singapore, Tokyo, Frankfurt, New York, or London.
        </p>
        <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-gold-soft to-gold-deep px-5 py-2.5 text-sm text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:-translate-y-0.5">
          Browse Marketplace <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}

/* ---------- RECENT ORDERS ---------- */
function RecentOrders() {
  const orders = [
    { pkg: "VPS Ryzen 9 5950X Super Fast", seller: "Kepeed Store", price: "Rp 50rb", status: "ACTIVE", date: "23/6/2026" },
    { pkg: "Residential 100 ip", seller: "Proxy9proxy", price: "Rp 75rb", status: "ACTIVE", date: "23/6/2026" },
    { pkg: "AMD Ryzen 5 3600 — Bare Metal", seller: "Admin NodeKPT", price: "Rp 1,1jt", status: "PENDING", date: "23/6/2026" },
    { pkg: "Intel Core i7-6700 — Bare Metal", seller: "Admin NodeKPT", price: "Rp 1,2jt", status: "CANCELLED", date: "22/6/2026" },
    { pkg: "Residential 20 ip", seller: "Proxy9proxy", price: "Rp 17rb", status: "ACTIVE", date: "22/6/2026" },
  ];

  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-border bg-card/40">
      <div className="flex items-center justify-between border-b border-border/60 p-7">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Recent Orders</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Latest deploys across VPS, Bare Metal, and Proxy</p>
        </div>
        <a href="#" className="inline-flex items-center gap-1.5 text-sm text-gold hover:gap-2.5 transition-all">
          View All <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <th className="px-7 py-4 text-left">Package</th>
              <th className="px-7 py-4 text-left">Seller</th>
              <th className="px-7 py-4 text-left">Price</th>
              <th className="px-7 py-4 text-left">Status</th>
              <th className="px-7 py-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, i) => (
              <tr key={i} className="border-b border-border/40 transition-colors last:border-0 hover:bg-gold/[0.03]">
                <td className="px-7 py-5">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const isBare = o.pkg.includes("Bare");
                      const isProxy = o.pkg.toLowerCase().includes("residential") || o.pkg.toLowerCase().includes("proxy");
                      const Icon = isBare ? HardDrive : isProxy ? Globe : Server;
                      const color = isBare ? "text-violet-600 border-violet-500/30 bg-violet-500/10" : isProxy ? "text-indigo-600 border-indigo-500/30 bg-indigo-500/10" : "text-sky-600 border-sky-500/30 bg-sky-500/10";
                      return (
                        <div className={`grid h-9 w-9 place-items-center rounded-lg border ${color}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                      );
                    })()}
                    <span className="font-semibold text-foreground">{o.pkg}</span>
                  </div>
                </td>
                <td className="px-7 py-5 text-muted-foreground">{o.seller}</td>
                <td className="px-7 py-5 font-mono">{o.price}</td>
                <td className="px-7 py-5">
                  <StatusPill status={o.status} />
                </td>
                <td className="px-7 py-5 text-muted-foreground">{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-border/60 px-7 py-4 text-xs text-muted-foreground">
        <span>Showing 5 of 60 orders</span>
        <button className="inline-flex items-center gap-1.5 text-gold-deep hover:gap-2.5 transition-all">
          <HelpCircle className="h-3.5 w-3.5" /> Need help?
        </button>
      </div>
    </section>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    ACTIVE: "border-emerald-600/30 bg-emerald-500/10 text-emerald-700",
    CANCELLED: "border-red-600/30 bg-red-500/10 text-red-700",
    PENDING: "border-gold/40 bg-gold/10 text-gold-deep",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] ${
        map[status] ?? map.PENDING
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
