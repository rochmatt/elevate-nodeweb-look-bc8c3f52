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
  Network,
  Database,
  KeyRound,
  FileText,
  Handshake,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — NodeKPT" },
      { name: "description", content: "Kelola server, pesanan, dan saldo NodeKPT dari satu panel. Pay in IDR (QRIS, VA). Full root access." },
      { property: "og:title", content: "Dashboard — NodeKPT" },
      { property: "og:description", content: "Kelola server, pesanan, dan saldo NodeKPT dari satu panel." },
      { property: "og:url", content: "https://elevate-nodeweb-look.lovable.app/dashboard" },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
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
        <Sidebar activeLabel="Dashboard" />
        <main className="min-w-0 flex-1">
          <Topbar />
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
            <Header />
            <Stats />
            <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-3">
              <WalletCard />
              <RefundsCard />
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
export function Sidebar({ activeLabel = "Dashboard" }: { activeLabel?: string }) {
  const overview = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Store, label: "Marketplace", href: "/marketplace" },
    { icon: Globe, label: "Proxy Services", href: "#" },
    { icon: Server, label: "Compute (VPS)", href: "#" },
    { icon: HardDrive, label: "Bare Metal Servers", href: "/bare-metal" },
    { icon: Download, label: "Winstaller", href: "#" },
  ];
  const inventory = [
    { icon: Database, label: "Object Storage" },
    { icon: HardDrive, label: "Block Storage" },
    { icon: Network, label: "Network Management (IP, DNS)" },
    { icon: KeyRound, label: "API Access" },
    { icon: Package, label: "Orders", href: "/orders" },
    { icon: Store, label: "Manage Packages", href: "/manage-packages" },
    { icon: FileText, label: "Billing & Invoices", href: "/invoices" },
    { icon: Wallet, label: "Wallet & Balance", href: "/wallet" },
    { icon: Heart, label: "Wishlist" },
    { icon: Gift, label: "Referrals" },
    { icon: Scale, label: "Disputes" },
  ];
  const account = [
    { icon: BookOpen, label: "Guide" },
    { icon: LifeBuoy, label: "Support" },
    { icon: Mail, label: "Contact" },
    { icon: User, label: "Profile", href: "/profile" },
  ];

  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-border bg-card lg:flex lg:flex-col">
      <Link to="/" className="flex items-center gap-3 border-b border-border px-6 py-5">
        <div className="grid h-10 w-10 place-items-center rounded-xl border border-[color:var(--accent)]/25 bg-[color:var(--accent-tint)]">
          <span className="text-base font-bold leading-none text-[color:var(--accent-strong)]">N</span>
        </div>
        <div className="leading-tight">
          <div className="text-base font-bold tracking-tight text-foreground">NodeKPT</div>
          <div className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Buy & Sell VPS</div>
        </div>
      </Link>

      <div className="flex-1 overflow-y-auto px-3 py-5">
        {/* Compact Become a Seller banner */}
        <button className="group mb-6 flex w-full items-center gap-3 rounded-xl border border-[color:var(--accent)]/20 bg-[color:var(--accent-tint)] px-3.5 py-3 text-left transition-colors hover:border-[color:var(--accent)]/40">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[color:var(--accent)] text-white">
            <Handshake className="h-4 w-4" strokeWidth={1.75} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-semibold leading-tight text-foreground">Start Selling</div>
            <div className="mt-0.5 text-[11px] leading-snug text-muted-foreground">Join our Marketplace today.</div>
          </div>
          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[color:var(--accent-strong)] transition-transform group-hover:translate-x-0.5" />
        </button>

        <NavGroup title="Platform Overview" items={overview} activeLabel={activeLabel} />
        <NavGroup title="Service Inventory" items={inventory} activeLabel={activeLabel} />
        <NavGroup title="Account" items={account} activeLabel={activeLabel} />
      </div>

      <button className="mx-3 mb-4 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-[color:var(--accent)]/40 hover:bg-[color:var(--accent-tint)]">
        <LogOut className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
        Logout
      </button>
    </aside>
  );
}

function NavGroup({
  title,
  items,
  activeLabel,
}: {
  title: string;
  items: {
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
    label: string;
    href?: string;
  }[];
  activeLabel?: string;
}) {
  return (
    <div className="mb-6">
      <div className="px-3 pb-2 text-[11px] font-semibold tracking-tight text-muted-foreground">
        {title}
      </div>
      <ul className="space-y-0.5">
        {items.map(({ icon: Icon, label, href }) => {
          const active = activeLabel === label;
          const cls = `group flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
            active
              ? "bg-[color:var(--accent-tint)] text-foreground"
              : "text-foreground/85 hover:bg-[color:var(--accent-tint)]/60 hover:text-foreground"
          }`;
          const inner = (
            <>
              <Icon
                className={`h-[18px] w-[18px] shrink-0 ${
                  active ? "text-[color:var(--accent-strong)]" : "text-muted-foreground group-hover:text-[color:var(--accent-strong)]"
                }`}
                strokeWidth={1.75}
              />
              <span className="truncate">{label}</span>
              {active && (
                <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
              )}
            </>
          );
          return (
            <li key={label}>
              {href && href.startsWith("/") ? (
                <Link to={href} className={cls}>{inner}</Link>
              ) : (
                <a href={href || "#"} className={cls}>{inner}</a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ---------- TOPBAR ---------- */

export function Topbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-end gap-2 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4 lg:px-8">
        <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
          <IconButton icon={ShoppingCart} badge="3" />
          <IconButton icon={MessageSquare} />
          <button className="hidden h-9 items-center gap-1.5 rounded-lg px-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground sm:flex">
            <Globe className="h-4 w-4" strokeWidth={1.75} />
            EN
            <ChevronDown className="h-3.5 w-3.5 text-foreground/50" strokeWidth={1.75} />
          </button>
          <IconButton icon={Bell} badge="99+" />

          <span className="mx-1 hidden h-5 w-px bg-border/70 sm:block" aria-hidden="true" />

          <div className="ml-1 flex shrink-0 cursor-pointer items-center gap-2 rounded-lg py-1.5 pl-1.5 pr-2 transition-colors hover:bg-foreground/5 sm:ml-0 sm:gap-3 sm:pr-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-gold-soft to-gold-deep font-serif text-base text-primary-foreground">
              D
            </div>
            <div className="hidden text-right leading-tight md:block">
              <div className="text-sm font-semibold text-foreground">Demo Buyer</div>
              <div className="text-[10px] text-foreground/60">buyer@nodekpt.com</div>
            </div>
            <ChevronDown className="hidden h-3.5 w-3.5 text-foreground/50 sm:block" strokeWidth={1.75} />
          </div>
        </div>
      </div>
    </header>
  );
}

function IconButton({
  icon: Icon,
  badge,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  badge?: string;
}) {
  return (
    <button className="relative grid h-9 w-9 place-items-center rounded-lg text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground sm:h-10 sm:w-10">
      <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" strokeWidth={1.75} />
      {badge && (
        <span className="absolute right-1 top-1 grid h-3.5 min-w-3.5 place-items-center rounded-full bg-[color:var(--badge-notification)] px-1 text-[8px] font-semibold leading-none text-white">
          {badge}
        </span>
      )}
    </button>
  );
}

/* ---------- HEADER ---------- */
function Header() {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-6">
      <div className="min-w-0">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-deep">
          <Sparkles className="h-3 w-3" /> Buy & Sell VPS Servers
        </div>
        <h1 className="mt-4 text-2xl font-bold leading-[1.1] tracking-tight sm:text-3xl md:text-4xl">
          Welcome back,{" "}
          <span className="text-gold-gradient">Demo Buyer</span>.
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          The first marketplace where anyone can sell VPSes and buyers get direct server control via an integrated panel — no long contracts, pay in IDR (QRIS, VA), full root access.
        </p>
      </div>
      <button className="btn-secondary self-start sm:self-auto">
        <Store className="h-4 w-4 text-[color:var(--accent-strong)]" />
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
    <div className="mt-6 grid gap-3 grid-cols-2 sm:mt-10 sm:gap-4 lg:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="card-interactive group relative overflow-hidden p-4 sm:p-6"
        >
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gold/5 blur-2xl transition-opacity group-hover:bg-gold/10" />

          <div className="relative flex items-start justify-between gap-2">
            <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border sm:h-11 sm:w-11 ${s.ringColor}`}>
              <s.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${s.iconColor}`} />
            </div>
            {s.trend && (
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-600/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                <TrendingUp className="h-3 w-3" /> +12%
              </span>
            )}
          </div>
          <div className="relative mt-4 text-2xl font-bold leading-none tracking-tight sm:mt-6 sm:text-4xl">
            {s.value}
          </div>
          <div className="relative mt-3 flex items-center justify-between sm:mt-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground/70 sm:text-[11px]">{s.label}</div>
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
    <div className="card-surface relative overflow-hidden p-5 sm:p-6">
      <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        <Wallet className="h-3.5 w-3.5 text-[color:var(--accent-strong)]" strokeWidth={1.75} /> Wallet Balance
      </div>
      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="text-base font-semibold text-muted-foreground">Rp</span>
        <span className="text-4xl font-bold tracking-tight leading-none text-foreground sm:text-[42px]">618.147</span>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        Usable for your next deploy — VPS, Bare Metal, or Proxy
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <button className="btn-primary !py-2 !px-4 !text-[13px]">
          Top Up <ArrowRight className="h-3.5 w-3.5" />
        </button>
        <button className="btn-secondary !py-2 !px-4 !text-[13px]">
          <Receipt className="h-3.5 w-3.5" /> History
        </button>
      </div>
    </div>
  );
}

/* ---------- REFUNDS CARD ---------- */
function RefundsCard() {
  const refunds = [
    { id: "KPT-0001", date: "9/6/2026", amount: "+Rp 10.000" },
    { id: "KPT-0014", date: "2/6/2026", amount: "+Rp 25.000" },
    { id: "KPT-0022", date: "28/5/2026", amount: "+Rp 8.500" },
  ];
  return (
    <div className="card-surface relative overflow-hidden p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          <Receipt className="h-3.5 w-3.5 text-[color:var(--accent-strong)]" strokeWidth={1.75} /> Recent Refunds
        </div>
        <a href="#" className="text-[11px] font-medium text-[color:var(--accent-strong)] hover:underline">
          View all
        </a>
      </div>
      <ul className="mt-4 divide-y divide-border/60">
        {refunds.map((r) => (
          <li key={r.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
            <div className="min-w-0">
              <div className="text-[13px] font-semibold text-foreground">{r.id}</div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">{r.date}</div>
            </div>
            <span className="font-mono text-[13px] font-semibold text-[color:var(--accent-strong)]">
              {r.amount}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- REFERRAL ---------- */
function ReferralCard() {
  return (
    <div className="card-surface relative overflow-hidden p-5 sm:p-6">
      <div className="grid h-9 w-9 place-items-center rounded-lg border border-[color:var(--accent)]/25 bg-[color:var(--accent-tint)]">
        <HeartHandshake className="h-4.5 w-4.5 text-[color:var(--accent-strong)]" strokeWidth={1.75} />
      </div>
      <h3 className="mt-4 text-lg font-bold leading-snug tracking-tight">
        Invite friends, <span className="text-[color:var(--accent-strong)]">earn balance</span>.
      </h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
        Rp 25.000 for every friend who joins and makes their first top up.
      </p>
      <div className="mt-5 flex items-center gap-2 rounded-lg border border-border bg-[color:var(--card-muted)] p-1 pl-3">
        <span className="truncate font-mono text-xs text-foreground">nodekpt.com/r/demo</span>
        <button className="btn-primary ml-auto shrink-0 !py-1.5 !px-3 !text-xs">
          Copy
        </button>
      </div>
    </div>
  );
}

/* ---------- EMPTY STATE ---------- */
function EmptyState({
  icon: Icon,
  title,
  description,
  cta,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  cta?: React.ReactNode;
}) {
  return (
    <div className="mt-6 grid place-items-center rounded-xl border border-dashed border-border/80 bg-background/60 px-4 py-10 text-center sm:mt-8 sm:py-16">
      <div className="grid h-14 w-14 place-items-center rounded-xl border border-[color:var(--accent)]/30 bg-[color:var(--accent-tint)]">
        <Icon className="h-6 w-6 text-[color:var(--accent)]" />
      </div>
      <h3 className="mt-5 text-lg font-bold tracking-tight">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      {cta && <div className="mt-6">{cta}</div>}
    </div>
  );
}

/* ---------- MY VPS ---------- */
function MyVPS() {
  return (
    <section className="card-surface mt-6 p-5 sm:mt-8 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-lg font-bold tracking-tight sm:text-xl">My VPS</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Active servers you control directly via the integrated panel</p>
        </div>
        <a href="#" className="inline-flex items-center gap-1.5 text-sm text-gold-deep hover:gap-2.5 transition-all">
          View All <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <EmptyState
        icon={Server}
        title="No active VPS yet"
        description="Choose a VPS from trusted sellers — Jakarta, Singapore, Tokyo, Frankfurt, New York, or London."
        cta={
          <button className="btn-primary">
            Browse Marketplace <ArrowRight className="h-4 w-4" />
          </button>
        }
      />
    </section>
  );
}

/* ---------- RECENT ORDERS ---------- */
function RecentOrders() {
  const orders: {
    pkg: string;
    seller: string;
    price: string;
    status: string;
    date: string;
  }[] = [];

  const hasOrders = orders.length > 0;

  const recommendations = [
    { icon: Server, name: "Entry VPS", price: "From Rp 55K/mo", tint: "text-sky-600 border-sky-500/30 bg-sky-500/10" },
    { icon: HardDrive, name: "Business Bare Metal", price: "From Rp 850K/mo", tint: "text-violet-600 border-violet-500/30 bg-violet-500/10" },
    { icon: Globe, name: "Residential Proxies", price: "From Rp 110K/mo", tint: "text-indigo-600 border-indigo-500/30 bg-indigo-500/10" },
  ];

  return (
    <section className="card-surface mt-6 overflow-hidden sm:mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 p-5 sm:p-7">
        <div className="min-w-0">
          <h2 className="text-lg font-bold tracking-tight sm:text-xl">Recent Orders</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Latest deploys across VPS, Bare Metal, and Proxy</p>
        </div>
        <a href="#" className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--accent-strong)] hover:gap-2.5 transition-all">
          View All <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      {hasOrders ? (
        <>
          {/* Mobile: card list */}
          <ul className="divide-y divide-border/40 md:hidden">
            {orders.map((o, i) => {
              const isBare = o.pkg.includes("Bare");
              const isProxy = o.pkg.toLowerCase().includes("residential") || o.pkg.toLowerCase().includes("proxy");
              const Icon = isBare ? HardDrive : isProxy ? Globe : Server;
              const color = isBare ? "text-violet-600 border-violet-500/30 bg-violet-500/10" : isProxy ? "text-indigo-600 border-indigo-500/30 bg-indigo-500/10" : "text-sky-600 border-sky-500/30 bg-sky-500/10";
              return (
                <li key={i} className="flex items-start gap-3 p-4 sm:p-5">
                  <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg border ${color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <span className="truncate text-sm font-semibold text-foreground">{o.pkg}</span>
                      <span className="shrink-0 font-mono text-xs text-foreground">{o.price}</span>
                    </div>
                    <div className="mt-0.5 truncate text-xs text-muted-foreground">{o.seller}</div>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <StatusPill status={o.status} />
                      <span className="text-[11px] text-muted-foreground">{o.date}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Desktop: table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <th className="px-5 py-4 text-left lg:px-7">Package</th>
                  <th className="px-5 py-4 text-left lg:px-7">Seller</th>
                  <th className="px-5 py-4 text-left lg:px-7">Price</th>
                  <th className="px-5 py-4 text-left lg:px-7">Status</th>
                  <th className="px-5 py-4 text-left lg:px-7">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o, i) => (
                  <tr key={i} className="border-b border-border/40 transition-colors last:border-0 hover:bg-gold/[0.03]">
                    <td className="px-5 py-5 lg:px-7">
                      <div className="flex items-center gap-3">
                        {(() => {
                          const isBare = o.pkg.includes("Bare");
                          const isProxy = o.pkg.toLowerCase().includes("residential") || o.pkg.toLowerCase().includes("proxy");
                          const Icon = isBare ? HardDrive : isProxy ? Globe : Server;
                          const color = isBare ? "text-violet-600 border-violet-500/30 bg-violet-500/10" : isProxy ? "text-indigo-600 border-indigo-500/30 bg-indigo-500/10" : "text-sky-600 border-sky-500/30 bg-sky-500/10";
                          return (
                            <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border ${color}`}>
                              <Icon className="h-4 w-4" />
                            </div>
                          );
                        })()}
                        <span className="font-semibold text-foreground">{o.pkg}</span>
                      </div>
                    </td>
                    <td className="px-5 py-5 text-muted-foreground lg:px-7">{o.seller}</td>
                    <td className="px-5 py-5 font-mono lg:px-7">{o.price}</td>
                    <td className="px-5 py-5 lg:px-7">
                      <StatusPill status={o.status} />
                    </td>
                    <td className="px-5 py-5 text-muted-foreground lg:px-7">{o.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/60 px-5 py-4 text-xs text-muted-foreground sm:px-7">
            <span>Showing {orders.length} of 60 orders</span>
            <button className="inline-flex items-center gap-1.5 text-gold-deep hover:gap-2.5 transition-all">
              <HelpCircle className="h-3.5 w-3.5" /> Need help?
            </button>
          </div>
        </>
      ) : (
        <div className="px-5 py-8 sm:px-7 sm:py-12">
          {/* Server illustration */}
          <div className="mx-auto flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32" aria-hidden>
            <ServerIllustration />
          </div>
          <h3 className="mt-5 text-center text-xl font-bold tracking-tight text-foreground">
            No orders yet
          </h3>
          <p className="mx-auto mt-2 max-w-md text-center text-sm leading-relaxed text-muted-foreground">
            Explore our top-tier server and proxy solutions on the marketplace.
          </p>

          {/* Recommendation cards */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
            {recommendations.map((r) => (
              <div
                key={r.name}
                className="rounded-xl border border-border bg-[color:var(--card-muted)] p-4 transition-all hover:-translate-y-0.5 hover:border-[color:var(--accent)]/30 hover:shadow-[var(--card-shadow-hover)]"
              >
                <div className="flex items-center gap-3">
                  <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg border ${r.tint}`}>
                    <r.icon className="h-4 w-4" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-[13px] font-semibold text-foreground">{r.name}</div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">{r.price}</div>
                  </div>
                </div>
                <button className="btn-secondary mt-4 w-full !py-1.5 !text-xs">
                  View Details <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>

          {/* Primary CTA centered below */}
          <div className="mt-8 flex justify-center">
            <button className="btn-primary">
              <Store className="h-4 w-4" /> Browse Marketplace
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function ServerIllustration() {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      className="h-full w-full text-[color:var(--accent-strong)]"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Server rack body */}
      <rect x="30" y="22" width="60" height="76" rx="6" stroke="currentColor" strokeWidth="1.75" opacity="0.85" />
      {/* Top unit */}
      <rect x="36" y="30" width="48" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.75" />
      <circle cx="42" cy="37" r="1.3" fill="currentColor" opacity="0.8" />
      <circle cx="48" cy="37" r="1.3" fill="currentColor" opacity="0.4" />
      <line x1="58" y1="37" x2="78" y2="37" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      {/* Middle unit */}
      <rect x="36" y="50" width="48" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.75" />
      <circle cx="42" cy="57" r="1.3" fill="currentColor" opacity="0.8" />
      <circle cx="48" cy="57" r="1.3" fill="currentColor" opacity="0.4" />
      <line x1="58" y1="57" x2="78" y2="57" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      {/* Bottom unit */}
      <rect x="36" y="70" width="48" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.75" />
      <circle cx="42" cy="80" r="1.3" fill="currentColor" opacity="0.8" />
      <circle cx="48" cy="80" r="1.3" fill="currentColor" opacity="0.4" />
      <line x1="58" y1="80" x2="78" y2="80" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      {/* Connection lines */}
      <path d="M30 60 L18 60 M18 50 L18 70" stroke="currentColor" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
      <path d="M90 40 L102 40 M102 32 L102 48" stroke="currentColor" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
      <path d="M90 80 L102 80 M102 72 L102 88" stroke="currentColor" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
      {/* Dotted base */}
      <circle cx="60" cy="108" r="1" fill="currentColor" opacity="0.4" />
      <circle cx="50" cy="108" r="1" fill="currentColor" opacity="0.3" />
      <circle cx="70" cy="108" r="1" fill="currentColor" opacity="0.3" />
      <circle cx="40" cy="108" r="1" fill="currentColor" opacity="0.2" />
      <circle cx="80" cy="108" r="1" fill="currentColor" opacity="0.2" />
    </svg>
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
