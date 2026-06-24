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
      { title: "Dashboard — NodeKPT" },
      { name: "description", content: "Dashboard buyer NodeKPT — kelola VPS, order, dan saldo Anda." },
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
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Store, label: "Marketplace" },
    { icon: Globe, label: "Proxy" },
    { icon: HardDrive, label: "Bare Metal" },
  ];
  const services = [
    { icon: Server, label: "My VPS" },
    { icon: Download, label: "Winstaller" },
    { icon: HardDrive, label: "My Bare Metal" },
    { icon: Package, label: "Orders" },
    { icon: Wallet, label: "Wallet & Balance" },
    { icon: Heart, label: "Wishlist" },
    { icon: Clock, label: "Recently Viewed" },
    { icon: MessageSquare, label: "Messages" },
    { icon: RefreshCw, label: "Subscriptions" },
    { icon: Gift, label: "Referrals" },
    { icon: Scale, label: "Disputes" },
  ];
  const account = [
    { icon: BookOpen, label: "Guide" },
    { icon: LifeBuoy, label: "Support" },
    { icon: Mail, label: "Contact" },
    { icon: User, label: "Profile" },
  ];

  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-border/60 bg-card/40 backdrop-blur-xl lg:flex lg:flex-col">
      <Link to="/" className="flex items-center gap-2.5 border-b border-border/60 px-6 py-5">
        <div className="grid h-10 w-10 place-items-center rounded-lg border border-gold/30 bg-gradient-to-br from-gold-soft/20 to-transparent">
          <span className="font-serif text-xl italic leading-none text-gold">N</span>
        </div>
        <div className="leading-tight">
          <div className="font-serif text-xl tracking-tight">NodeKPT</div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Buyer · Console</div>
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
            <div className="text-[11px] opacity-80">Mulai jual VPS Anda</div>
          </div>
          <ArrowRight className="h-4 w-4 opacity-80 transition-transform group-hover:translate-x-0.5" />
        </button>

        <NavGroup title="Main" items={main} />
        <NavGroup title="Services" items={services} />
        <NavGroup title="Account" items={account} />
      </div>

      <button className="mx-3 mb-4 flex items-center gap-3 rounded-xl border border-border/60 px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-gold/30 hover:text-gold">
        <LogOut className="h-4 w-4" />
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
  items: { icon: React.ComponentType<{ className?: string }>; label: string; active?: boolean }[];
}) {
  return (
    <div className="mb-6">
      <div className="px-3 pb-2 text-[10px] uppercase tracking-[0.28em] text-muted-foreground/70">
        {title}
      </div>
      <ul className="space-y-0.5">
        {items.map(({ icon: Icon, label, active }) => (
          <li key={label}>
            <a
              href="#"
              className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
                active
                  ? "border border-gold/30 bg-gradient-to-r from-gold/10 to-transparent text-foreground shadow-[var(--shadow-gold)]"
                  : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
              }`}
            >
              <Icon
                className={`h-4 w-4 transition-colors ${active ? "text-gold" : "group-hover:text-gold"}`}
              />
              <span>{label}</span>
              {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_8px_var(--gold)]" />}
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
            placeholder="Cari VPS, order, atau seller..."
            className="h-10 w-full rounded-xl border border-border bg-card/60 pl-10 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:border-gold/40"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-border bg-background/60 px-1.5 py-0.5 text-[10px] text-muted-foreground">
            ⌘K
          </span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <IconButton icon={ShoppingCart} badge="3" />
          <IconButton icon={MessageSquare} />
          <button className="flex h-10 items-center gap-1.5 rounded-xl border border-border bg-card/60 px-3 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <Globe className="h-4 w-4" />
            EN
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          <IconButton icon={Bell} badge="99+" />

          <div className="ml-2 flex items-center gap-3 rounded-xl border border-border bg-card/60 py-1.5 pl-1.5 pr-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-gold-soft to-gold-deep font-serif text-base text-primary-foreground">
              D
            </div>
            <div className="hidden text-right leading-tight sm:block">
              <div className="text-sm">Demo Buyer</div>
              <div className="text-[10px] text-muted-foreground">buyer@nodekpt.com</div>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
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
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}) {
  return (
    <button className="relative grid h-10 w-10 place-items-center rounded-xl border border-border bg-card/60 text-muted-foreground transition-colors hover:border-gold/30 hover:text-gold">
      <Icon className="h-4 w-4" />
      {badge && (
        <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-gradient-to-b from-gold-soft to-gold-deep px-1 text-[9px] font-medium text-primary-foreground">
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
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-gold-soft">
          <Sparkles className="h-3 w-3" /> Buyer Console
        </div>
        <h1 className="mt-4 font-serif text-4xl leading-tight tracking-tight md:text-5xl">
          Selamat datang kembali,
          <br />
          <span className="italic text-gold-gradient">Demo Buyer</span>.
        </h1>
        <p className="mt-3 max-w-lg text-sm text-muted-foreground">
          Kelola VPS, pantau order, dan jelajahi marketplace dalam satu tempat yang tenang dan elegan.
        </p>
      </div>
      <button className="group inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 px-5 py-3 text-sm transition-colors hover:border-gold/30 hover:text-gold">
        <Store className="h-4 w-4 text-gold" />
        Jelajahi Marketplace
        <ArrowUpRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

/* ---------- STATS ---------- */
function Stats() {
  const stats = [
    { label: "Active VPS", value: "0", icon: Server, hint: "Belum ada VPS aktif" },
    { label: "Total Orders", value: "60", icon: Package, hint: "+4 minggu ini", trend: true },
    { label: "Pending Orders", value: "1", icon: Clock, hint: "Menunggu pembayaran" },
    { label: "Total VPS", value: "0", icon: HardDrive, hint: "Seumur hidup" },
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
            <div className="grid h-11 w-11 place-items-center rounded-xl border border-gold/30 bg-gold/5">
              <s.icon className="h-5 w-5 text-gold" />
            </div>
            {s.trend && (
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-600/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-700">
                <TrendingUp className="h-3 w-3" /> +12%
              </span>
            )}
          </div>
          <div className="relative mt-6 font-serif text-5xl leading-none tracking-tight">
            {s.value}
          </div>
          <div className="relative mt-4 flex items-center justify-between">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.label}</div>
          </div>
          <div className="relative mt-1 text-[11px] text-muted-foreground/80">{s.hint}</div>
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
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-gold">
            <Wallet className="h-3.5 w-3.5" /> Wallet Balance
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-serif text-2xl text-muted-foreground">Rp</span>
            <span className="font-serif text-6xl tracking-tight text-gold-gradient">618.147</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Usable for your next order payment</p>
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
          <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
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
        <h3 className="mt-4 font-serif text-2xl leading-tight">
          Undang teman, <span className="italic text-gold-gradient">dapatkan saldo</span>.
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Rp 25.000 untuk setiap teman yang bergabung dan top up pertama kali.
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
          <h2 className="font-serif text-2xl tracking-tight">My VPS</h2>
          <p className="text-xs text-muted-foreground">Server aktif yang Anda kelola</p>
        </div>
        <a href="#" className="inline-flex items-center gap-1.5 text-sm text-gold hover:gap-2.5 transition-all">
          View All <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-8 grid place-items-center rounded-xl border border-dashed border-border/80 bg-background/30 py-16 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-xl border border-gold/30 bg-gold/5">
          <Server className="h-6 w-6 text-gold" />
        </div>
        <h3 className="mt-5 font-serif text-2xl">Belum ada VPS aktif</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Mulai perjalanan Anda dengan memilih VPS dari seller terverifikasi di marketplace.
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
    { pkg: "VPS r93 (Test)", seller: "Kepeed Store", price: "Rp 0", status: "CANCELLED", date: "23/6/2026" },
    { pkg: "VPS r93 (Test)", seller: "Kepeed Store", price: "Rp 0", status: "ACTIVE", date: "23/6/2026" },
    { pkg: "VPS r93 (Test)", seller: "Kepeed Store", price: "Rp 0", status: "CANCELLED", date: "23/6/2026" },
    { pkg: "Bare Metal Dedicated Server", seller: "Admin NodeKPT", price: "Rp 3.924", status: "CANCELLED", date: "22/6/2026" },
    { pkg: "Bare Metal Dedicated Server", seller: "Admin NodeKPT", price: "Rp 2.241", status: "CANCELLED", date: "22/6/2026" },
  ];

  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-border bg-card/40">
      <div className="flex items-center justify-between border-b border-border/60 p-7">
        <div>
          <h2 className="font-serif text-2xl tracking-tight">Recent Orders</h2>
          <p className="text-xs text-muted-foreground">Aktivitas pembelian terbaru Anda</p>
        </div>
        <a href="#" className="inline-flex items-center gap-1.5 text-sm text-gold hover:gap-2.5 transition-all">
          View All <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <th className="px-7 py-4 text-left font-normal">Package</th>
              <th className="px-7 py-4 text-left font-normal">Seller</th>
              <th className="px-7 py-4 text-left font-normal">Price</th>
              <th className="px-7 py-4 text-left font-normal">Status</th>
              <th className="px-7 py-4 text-left font-normal">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, i) => (
              <tr key={i} className="border-b border-border/40 transition-colors last:border-0 hover:bg-gold/[0.03]">
                <td className="px-7 py-5">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-background/40">
                      {o.pkg.includes("Bare") ? (
                        <HardDrive className="h-4 w-4 text-gold" />
                      ) : (
                        <Server className="h-4 w-4 text-gold" />
                      )}
                    </div>
                    <span className="font-medium">{o.pkg}</span>
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
        <span>Menampilkan 5 dari 60 order</span>
        <button className="inline-flex items-center gap-1.5 text-gold hover:gap-2.5 transition-all">
          <HelpCircle className="h-3.5 w-3.5" /> Butuh bantuan?
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
