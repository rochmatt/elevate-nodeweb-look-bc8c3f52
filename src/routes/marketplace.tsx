import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowUpDown,
  BadgeCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Cpu,
  Filter,
  Flame,
  Globe2,
  HardDrive,
  Heart,
  LayoutGrid,
  List,
  
  MemoryStick,
  Plus,
  Search,
  Server,
  Shield,
  ShoppingCart,
  Sparkles,
  Star,
  TrendingUp,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import { Sidebar, Topbar } from "./dashboard";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "VPS Marketplace — NodeKPT · Find the best VPS from trusted sellers" },
      {
        name: "description",
        content:
          "Browse VPS, Bare Metal, and Proxy services from verified sellers. Filter by location, price, vCPU and RAM. Pay in IDR (QRIS, VA). Full root access.",
      },
    ],
  }),
  component: Marketplace,
});

/* ============================================================ */
/*  PAGE SHELL                                                   */
/* ============================================================ */
function Marketplace() {
  const [category, setCategory] = useState<CategoryKey>("cloud");
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [compare, setCompare] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleCompare = (id: string) =>
    setCompare((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length >= 4 ? prev : [...prev, id],
    );

  const list = useMemo(
    () => products.filter((p) => (category === "all" ? true : p.categoryKey === category)),
    [category],
  );

  return (
    <div className="theme-light min-h-screen bg-background text-foreground">
      <div className="constellation pointer-events-none fixed inset-0 opacity-40" aria-hidden />
      <div
        className="radial-glow pointer-events-none fixed left-1/3 top-0 h-[600px] w-[900px] -translate-x-1/2"
        aria-hidden
      />

      <div className="relative flex">
        <Sidebar activeLabel="Marketplace" />
        <main className="min-w-0 flex-1 pb-32">
          <Topbar />
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
            <PageHeader compareCount={compare.length} />
            <div className="mt-6 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
              <FilterPanel open={showFilters} onClose={() => setShowFilters(false)} />
              <div className="min-w-0">
                <Toolbar
                  category={category}
                  onCategory={setCategory}
                  billing={billing}
                  onBilling={setBilling}
                  view={view}
                  onView={setView}
                  onOpenFilters={() => setShowFilters(true)}
                  count={list.length}
                />
                {view === "grid" ? (
                  <ProductGrid list={list} compare={compare} onToggleCompare={toggleCompare} billing={billing} />
                ) : (
                  <ProductList list={list} compare={compare} onToggleCompare={toggleCompare} billing={billing} />
                )}
                <Pagination />
              </div>
            </div>
          </div>
        </main>
      </div>

      {compare.length > 0 && (
        <CompareBar
          ids={compare}
          onRemove={(id) => setCompare((prev) => prev.filter((x) => x !== id))}
          onClear={() => setCompare([])}
        />
      )}
    </div>
  );
}

/* ============================================================ */
/*  HEADER                                                       */
/* ============================================================ */
function PageHeader({ compareCount }: { compareCount: number }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:flex-wrap sm:justify-between sm:gap-6">
      <div className="min-w-0">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-deep">
          <Sparkles className="h-3 w-3" /> Verified Sellers · IDR Payment
        </div>
        <h1 className="mt-4 truncate text-2xl font-bold leading-[1.1] tracking-tight sm:text-3xl md:text-4xl">
          VPS <span className="text-gold-gradient">Marketplace</span>
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          248 packages from 42 verified sellers. Filter, compare up to 4 side-by-side, and deploy in minutes.
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button className="btn-ghost">
          <Heart className="h-4 w-4 text-[color:var(--accent-strong)]" />
          <span className="hidden sm:inline">Wishlist</span>
          <span className="rounded-full bg-[color:var(--accent-tint)] px-1.5 text-[10px] font-semibold text-[color:var(--accent-strong)]">
            4
          </span>
        </button>
        <button className="btn-secondary relative">
          <ArrowUpDown className="h-4 w-4 text-[color:var(--accent-strong)]" />
          <span className="hidden sm:inline">Compare</span>
          <span
            className={`rounded-full px-1.5 text-[10px] font-semibold ${
              compareCount > 0 ? "bg-[color:var(--accent)] text-white" : "bg-foreground/5 text-foreground/60"
            }`}
          >
            {compareCount}/4
          </span>
        </button>
      </div>
    </div>
  );
}

/* ============================================================ */
/*  TOOLBAR (category tabs + search + billing + view)            */
/* ============================================================ */
type CategoryKey = "all" | "cloud" | "bare" | "residential" | "datacenter";
const categories: { key: CategoryKey; label: string; count: number }[] = [
  { key: "all", label: "All Products", count: 248 },
  { key: "cloud", label: "Cloud VPS", count: 142 },
  { key: "bare", label: "Bare Metal", count: 38 },
  { key: "residential", label: "Residential Proxy", count: 51 },
  { key: "datacenter", label: "Datacenter Proxy", count: 17 },
];

function Toolbar({
  category,
  onCategory,
  billing,
  onBilling,
  view,
  onView,
  onOpenFilters,
  count,
}: {
  category: CategoryKey;
  onCategory: (k: CategoryKey) => void;
  billing: "monthly" | "yearly";
  onBilling: (b: "monthly" | "yearly") => void;
  view: "grid" | "list";
  onView: (v: "grid" | "list") => void;
  onOpenFilters: () => void;
  count: number;
}) {
  return (
    <div className="card-surface p-4">
      <div className="flex flex-col gap-3">
        {/* Category underline tabs */}
        <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <div className="flex min-w-max items-center gap-6 border-b border-border/60">
            {categories.map((c) => {
              const active = c.key === category;
              return (
                <button
                  key={c.key}
                  onClick={() => onCategory(c.key)}
                  className={`relative flex items-center gap-2 pb-3 pt-1 text-[13px] font-semibold tracking-tight transition-colors ${
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c.label}
                  <span
                    className={`rounded-full px-1.5 text-[10px] font-bold ${
                      active
                        ? "bg-[color:var(--accent-tint)] text-[color:var(--accent-strong)]"
                        : "bg-foreground/5 text-foreground/50"
                    }`}
                  >
                    {c.count}
                  </span>
                  {active && (
                    <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-gold-soft to-gold-deep" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search + sort + billing + view */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search VPS, location, or seller…"
              className="h-10 w-full rounded-xl border border-border bg-card/60 pl-10 pr-4 text-sm outline-none transition-colors focus:border-[color:var(--accent)]/40"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex h-10 items-center rounded-xl border border-border bg-card/60 p-1">
              <button
                onClick={() => onBilling("monthly")}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  billing === "monthly"
                    ? "bg-[color:var(--accent)] text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => onBilling("yearly")}
                className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  billing === "yearly"
                    ? "bg-[color:var(--accent)] text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Yearly
                <span
                  className={`rounded-full px-1 text-[9px] font-bold ${
                    billing === "yearly" ? "bg-white/25 text-white" : "bg-emerald-500/15 text-emerald-600"
                  }`}
                >
                  -20%
                </span>
              </button>
            </div>

            <select className="h-10 rounded-xl border border-border bg-card/60 px-3 text-sm font-medium outline-none focus:border-[color:var(--accent)]/40">
              <option>Sort: Best Match</option>
              <option>Price: Low → High</option>
              <option>Price: High → Low</option>
              <option>Top Rated</option>
              <option>Newest</option>
            </select>

            <div className="inline-flex h-10 items-center rounded-xl border border-border bg-card/60 p-1">
              <button
                onClick={() => onView("grid")}
                aria-label="Grid view"
                className={`grid h-8 w-8 place-items-center rounded-lg transition-colors ${
                  view === "grid"
                    ? "bg-foreground/10 text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => onView("list")}
                aria-label="List view"
                className={`grid h-8 w-8 place-items-center rounded-lg transition-colors ${
                  view === "list"
                    ? "bg-foreground/10 text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            <button onClick={onOpenFilters} className="btn-ghost lg:hidden">
              <Filter className="h-4 w-4 text-[color:var(--accent-strong)]" />
              Filters
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div>
            Showing <span className="font-semibold text-foreground">{count}</span> packages
          </div>
          <div className="hidden items-center gap-1.5 sm:flex">
            <ActiveChip label="Singapore" />
            <ActiveChip label="SSD" />
            <ActiveChip label="Verified" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ActiveChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-[color:var(--accent)]/30 bg-[color:var(--accent-tint)] px-2.5 py-1 text-[11px] font-medium text-[color:var(--accent-strong)]">
      {label}
      <X className="h-3 w-3 cursor-pointer" />
    </span>
  );
}

/* ============================================================ */
/*  FILTER PANEL                                                 */
/* ============================================================ */
function FilterPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}
      <aside
        className={`card-surface fixed inset-y-0 left-0 z-50 w-[85%] max-w-sm overflow-y-auto p-5 transition-transform lg:sticky lg:top-24 lg:z-0 lg:h-fit lg:w-auto lg:translate-x-0 lg:transition-none ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <Filter className="h-3.5 w-3.5 text-[color:var(--accent-strong)]" /> Filters
          </div>
          <div className="flex items-center gap-2">
            <button className="text-[11px] font-medium text-[color:var(--accent-strong)] hover:underline">Clear</button>
            <button
              onClick={onClose}
              aria-label="Close"
              className="grid h-8 w-8 place-items-center rounded-lg border border-border text-muted-foreground lg:hidden"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <FilterSection title="Datacenter Location">
          <div className="space-y-2">
            {[
              { flag: "🇸🇬", label: "Singapore", count: 62, checked: true },
              { flag: "🇮🇩", label: "Jakarta", count: 41 },
              { flag: "🇺🇸", label: "United States", count: 58 },
              { flag: "🇩🇪", label: "Germany", count: 34 },
              { flag: "🇯🇵", label: "Japan", count: 27 },
            ].map((l) => (
              <label
                key={l.label}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-foreground/85 hover:bg-foreground/[0.03]"
              >
                <input
                  type="checkbox"
                  defaultChecked={l.checked}
                  className="rounded border-border accent-[color:var(--accent)]"
                />
                <span className="text-base leading-none">{l.flag}</span>
                <span className="flex-1 truncate">{l.label}</span>
                <span className="text-[10px] font-medium text-muted-foreground">{l.count}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Price / month (Rp)">
          <div className="flex items-center gap-2">
            <input
              placeholder="Min"
              className="h-10 w-full rounded-xl border border-border bg-card/60 px-3 text-sm outline-none focus:border-[color:var(--accent)]/40"
            />
            <span className="text-muted-foreground">–</span>
            <input
              placeholder="Max"
              className="h-10 w-full rounded-xl border border-border bg-card/60 px-3 text-sm outline-none focus:border-[color:var(--accent)]/40"
            />
          </div>
        </FilterSection>

        <FilterSection title="vCPU cores" rangeLabel="1 – 32">
          <input type="range" min={1} max={32} defaultValue={16} className="w-full accent-[color:var(--accent)]" />
          <div className="mt-2 grid grid-cols-4 gap-1.5">
            {["2", "4", "8", "16"].map((n, i) => (
              <button
                key={n}
                className={`h-8 rounded-lg border text-[11px] font-semibold transition-colors ${
                  i === 1
                    ? "border-[color:var(--accent)]/40 bg-[color:var(--accent-tint)] text-[color:var(--accent-strong)]"
                    : "border-border bg-card/60 text-foreground/75 hover:border-[color:var(--accent)]/30"
                }`}
              >
                {n} vCPU
              </button>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="RAM">
          <div className="grid grid-cols-3 gap-1.5">
            {["2 GB", "4 GB", "8 GB", "16 GB", "32 GB", "64 GB"].map((n, i) => (
              <button
                key={n}
                className={`h-8 rounded-lg border text-[11px] font-semibold transition-colors ${
                  i === 2
                    ? "border-[color:var(--accent)]/40 bg-[color:var(--accent-tint)] text-[color:var(--accent-strong)]"
                    : "border-border bg-card/60 text-foreground/75 hover:border-[color:var(--accent)]/30"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Storage type">
          <div className="flex flex-wrap gap-2">
            {[
              { s: "NVMe", checked: true },
              { s: "SSD", checked: true },
              { s: "HDD" },
            ].map((s) => (
              <label
                key={s.s}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-foreground/80 hover:border-[color:var(--accent)]/30"
              >
                <input
                  type="checkbox"
                  defaultChecked={s.checked}
                  className="accent-[color:var(--accent)]"
                />
                {s.s}
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Delivery time">
          <div className="space-y-1.5">
            {["Instant", "< 15 minutes", "< 1 hour", "Manual"].map((d, i) => (
              <label
                key={d}
                className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-foreground/85 hover:bg-foreground/[0.03]"
              >
                <input
                  type="radio"
                  name="delivery"
                  defaultChecked={i === 0}
                  className="accent-[color:var(--accent)]"
                />
                {d}
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Seller">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground/85">
            <input type="checkbox" defaultChecked className="accent-[color:var(--accent)]" />
            <BadgeCheck className="h-4 w-4 text-[color:var(--accent-strong)]" />
            Verified sellers only
          </label>
          <label className="mt-2 flex cursor-pointer items-center gap-2 text-sm text-foreground/85">
            <input type="checkbox" className="accent-[color:var(--accent)]" />
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            Top rated (4.5+)
          </label>
        </FilterSection>

        <button className="btn-primary mt-5 w-full">Apply Filters</button>
      </aside>
    </>
  );
}

function FilterSection({
  title,
  rangeLabel,
  children,
}: {
  title: string;
  rangeLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5 border-t border-border/60 pt-5 first-of-type:mt-5 first-of-type:border-t-0 first-of-type:pt-5">
      <div className="mb-2.5 flex items-center justify-between">
        <div className="text-[12px] font-semibold tracking-tight text-foreground">{title}</div>
        {rangeLabel && <div className="text-[10px] text-muted-foreground">{rangeLabel}</div>}
      </div>
      {children}
    </div>
  );
}

/* ============================================================ */
/*  PRODUCT DATA + GRID/LIST                                     */
/* ============================================================ */
type ProductBadge = "popular" | "new" | "best" | "deal" | null;
type ThumbTheme = "indigo" | "emerald" | "gold" | "slate" | "rose" | "cyan" | "violet" | "amber";
type OS = "ubuntu" | "debian" | "centos" | "windows" | "alpine" | "proxy";
type Product = {
  id: string;
  name: string;
  category: string;
  categoryKey: Exclude<CategoryKey, "all">;
  seller: string;
  sellerInitial: string;
  sellerTier: "Pro" | "Verified" | "Platinum";
  location: string;
  flag: string;
  rating: number;
  reviews: number;
  sold: number;
  price: number;
  oldPrice?: number;
  vcpu: string;
  ram: string;
  disk: string;
  bandwidth: string;
  delivery: string;
  stock: number;
  badge: ProductBadge;
  theme: ThumbTheme;
  os: OS;
};

const products: Product[] = [
  {
    id: "p1", name: "Performance Cloud", category: "Cloud VPS", categoryKey: "cloud",
    seller: "HostKey", sellerInitial: "H", sellerTier: "Pro",
    location: "Singapore", flag: "🇸🇬", rating: 4.9, reviews: 1240, sold: 3421,
    price: 165000, oldPrice: 195000, vcpu: "4 vCPU", ram: "8 GB", disk: "160 GB NVMe",
    bandwidth: "3 TB", delivery: "~15 min", stock: 3, badge: "popular",
    theme: "gold", os: "ubuntu",
  },
  {
    id: "p2", name: "Nano Starter", category: "Cloud VPS", categoryKey: "cloud",
    seller: "GlobalCloud", sellerInitial: "G", sellerTier: "Verified",
    location: "Jakarta", flag: "🇮🇩", rating: 4.7, reviews: 842, sold: 1980,
    price: 85000, vcpu: "2 vCPU", ram: "4 GB", disk: "80 GB SSD",
    bandwidth: "1 TB", delivery: "Instant", stock: 42, badge: null,
    theme: "emerald", os: "debian",
  },
  {
    id: "p3", name: "Epyc High-CPU", category: "Cloud VPS", categoryKey: "cloud",
    seller: "GoldNode", sellerInitial: "G", sellerTier: "Platinum",
    location: "Singapore", flag: "🇸🇬", rating: 5.0, reviews: 42, sold: 88,
    price: 340000, vcpu: "8 vCPU", ram: "16 GB", disk: "250 GB NVMe",
    bandwidth: "Unlimited", delivery: "~1 hour", stock: 12, badge: "new",
    theme: "violet", os: "ubuntu",
  },
  {
    id: "p4", name: "Enterprise Dedicated", category: "Bare Metal", categoryKey: "bare",
    seller: "IronCloud", sellerInitial: "I", sellerTier: "Platinum",
    location: "Germany", flag: "🇩🇪", rating: 4.8, reviews: 412, sold: 620,
    price: 1450000, vcpu: "Xeon 12C", ram: "64 GB DDR4", disk: "2× 1TB NVMe",
    bandwidth: "10 Gbps", delivery: "~2 hours", stock: 2, badge: "best",
    theme: "slate", os: "centos",
  },
  {
    id: "p5", name: "Cloud Compute Pro", category: "Cloud VPS", categoryKey: "cloud",
    seller: "NetVanguard", sellerInitial: "N", sellerTier: "Pro",
    location: "United States", flag: "🇺🇸", rating: 4.6, reviews: 731, sold: 1450,
    price: 145000, oldPrice: 175000, vcpu: "2 vCPU", ram: "4 GB", disk: "80 GB NVMe",
    bandwidth: "5 TB", delivery: "Instant", stock: 24, badge: "deal",
    theme: "indigo", os: "windows",
  },
  {
    id: "p6", name: "Residential Static", category: "Residential Proxy", categoryKey: "residential",
    seller: "ProxyPool", sellerInitial: "P", sellerTier: "Verified",
    location: "Jakarta", flag: "🇮🇩", rating: 4.5, reviews: 184, sold: 512,
    price: 45000, vcpu: "10M+ IPs", ram: "SOCKS5/HTTP", disk: "Rotating",
    bandwidth: "Unlimited", delivery: "~15 min", stock: 200, badge: null,
    theme: "cyan", os: "proxy",
  },
  {
    id: "p7", name: "Datacenter Bulk", category: "Datacenter Proxy", categoryKey: "datacenter",
    seller: "SkyLink", sellerInitial: "S", sellerTier: "Pro",
    location: "United States", flag: "🇺🇸", rating: 4.4, reviews: 96, sold: 218,
    price: 28000, vcpu: "1000 IPs", ram: "HTTP/HTTPS", disk: "Static",
    bandwidth: "Unlimited", delivery: "Instant", stock: 999, badge: null,
    theme: "rose", os: "proxy",
  },
  {
    id: "p8", name: "Bare Metal Compact", category: "Bare Metal", categoryKey: "bare",
    seller: "HostKey", sellerInitial: "H", sellerTier: "Pro",
    location: "Japan", flag: "🇯🇵", rating: 4.9, reviews: 312, sold: 420,
    price: 890000, vcpu: "Ryzen 8C", ram: "32 GB", disk: "1 TB NVMe",
    bandwidth: "1 Gbps", delivery: "~30 min", stock: 6, badge: "popular",
    theme: "amber", os: "alpine",
  },
  {
    id: "p9", name: "VPS v2 Mini", category: "Cloud VPS", categoryKey: "cloud",
    seller: "GlobalCloud", sellerInitial: "G", sellerTier: "Verified",
    location: "Singapore", flag: "🇸🇬", rating: 4.9, reviews: 312, sold: 780,
    price: 175353, vcpu: "2 vCPU", ram: "4 GB", disk: "80 GB NVMe",
    bandwidth: "5 TB", delivery: "Instant", stock: 18, badge: null,
    theme: "indigo", os: "ubuntu",
  },
];

/* ---------- Thumbnail ---------- */
const themeMap: Record<ThumbTheme, { bg: string; glow: string; ring: string; icon: string; grid: string }> = {
  indigo:  { bg: "from-indigo-500 via-indigo-600 to-slate-900", glow: "bg-indigo-300/40",  ring: "ring-indigo-400/40",  icon: "text-white",     grid: "text-white/10" },
  emerald: { bg: "from-emerald-500 via-teal-600 to-slate-900",  glow: "bg-emerald-300/40", ring: "ring-emerald-400/40", icon: "text-white",     grid: "text-white/10" },
  gold:    { bg: "from-amber-400 via-yellow-500 to-amber-700",  glow: "bg-amber-200/50",   ring: "ring-amber-300/40",   icon: "text-white",     grid: "text-white/15" },
  slate:   { bg: "from-slate-700 via-slate-800 to-slate-950",   glow: "bg-slate-400/30",   ring: "ring-slate-500/40",   icon: "text-slate-100", grid: "text-white/10" },
  rose:    { bg: "from-rose-500 via-pink-600 to-purple-900",    glow: "bg-rose-300/40",    ring: "ring-rose-400/40",    icon: "text-white",     grid: "text-white/10" },
  cyan:    { bg: "from-cyan-400 via-sky-600 to-indigo-900",     glow: "bg-cyan-200/50",    ring: "ring-cyan-300/40",    icon: "text-white",     grid: "text-white/10" },
  violet:  { bg: "from-violet-500 via-purple-600 to-slate-900", glow: "bg-violet-300/40",  ring: "ring-violet-400/40",  icon: "text-white",     grid: "text-white/10" },
  amber:   { bg: "from-orange-500 via-red-600 to-slate-900",    glow: "bg-orange-300/40",  ring: "ring-orange-400/40",  icon: "text-white",     grid: "text-white/10" },
};

const osLabel: Record<OS, string> = {
  ubuntu: "Ubuntu 22.04", debian: "Debian 12", centos: "AlmaLinux 9",
  windows: "Win Server 2022", alpine: "Alpine 3.19", proxy: "Multi-region",
};

function OsGlyph({ os, className = "" }: { os: OS; className?: string }) {
  const cls = `h-3.5 w-3.5 ${className}`;
  if (os === "windows")
    return (
      <svg viewBox="0 0 20 20" className={cls} fill="currentColor" aria-hidden>
        <path d="M2 4l7-1v7H2V4zm0 8h7v6l-7-1v-5zm8-9l8-1v9h-8V3zm0 9h8v9l-8-1v-8z" />
      </svg>
    );
  if (os === "proxy")
    return (
      <svg viewBox="0 0 20 20" className={cls} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <circle cx="10" cy="10" r="7" />
        <path d="M3 10h14M10 3c2.5 3 2.5 11 0 14M10 3c-2.5 3-2.5 11 0 14" />
      </svg>
    );
  return (
    <svg viewBox="0 0 20 20" className={cls} fill="currentColor" aria-hidden>
      <path d="M10 2c-2.2 0-3.5 2-3.5 4.5 0 1.3.4 2.3 1 3-1.6 1-3 2.6-3 5 0 2.6 2.5 3.5 5.5 3.5s5.5-.9 5.5-3.5c0-2.4-1.4-4-3-5 .6-.7 1-1.7 1-3C13.5 4 12.2 2 10 2zm-1.3 4c.5 0 .8.5.8 1s-.3 1-.8 1-.8-.5-.8-1 .3-1 .8-1zm2.6 0c.5 0 .8.5.8 1s-.3 1-.8 1-.8-.5-.8-1 .3-1 .8-1z" />
    </svg>
  );
}

function ProductThumbnail({ p, size = "md" }: { p: Product; size?: "md" | "sm" }) {
  const t = themeMap[p.theme];
  const CatIcon = p.categoryKey === "bare" ? HardDrive : p.categoryKey === "cloud" ? Server : Globe2;
  const isSm = size === "sm";
  return (
    <div
      className={`relative isolate overflow-hidden bg-gradient-to-br ${t.bg} ${
        isSm ? "h-full w-full rounded-xl" : "aspect-[16/9] w-full rounded-t-2xl"
      }`}
    >
      <svg className={`absolute inset-0 h-full w-full ${t.grid}`} aria-hidden>
        <defs>
          <pattern id={`grid-${p.id}-${size}`} width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M22 0H0V22" fill="none" stroke="currentColor" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${p.id}-${size})`} />
      </svg>
      <div className={`pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl ${t.glow}`} aria-hidden />
      <div className="pointer-events-none absolute -bottom-10 -left-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" aria-hidden />
      <CatIcon
        className={`absolute -bottom-3 -right-3 opacity-25 ${t.icon} ${isSm ? "h-16 w-16" : "h-40 w-40"}`}
        strokeWidth={1}
        aria-hidden
      />

      {!isSm && (
        <>
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/30 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
              <span className="text-sm leading-none">{p.flag}</span>
              <span className="uppercase tracking-wider">{p.location}</span>
            </span>
            <BadgePill badge={p.badge} />
          </div>
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3">
            <div className={`inline-flex items-center gap-2 rounded-lg bg-white/15 px-2.5 py-1.5 text-[11px] font-semibold text-white ring-1 backdrop-blur-md ${t.ring}`}>
              <OsGlyph os={p.os} />
              <span className="tracking-tight">{osLabel[p.os]}</span>
            </div>
            <button
              aria-label="Wishlist"
              className="grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-md transition-colors hover:bg-white/25"
            >
              <Heart className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          </div>
        </>
      )}

      {isSm && (
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-1.5 pb-1">
          <span className="text-[11px] leading-none">{p.flag}</span>
          <OsGlyph os={p.os} className="text-white/80" />
        </div>
      )}
    </div>
  );
}

function ProductGrid({
  list, compare, onToggleCompare, billing,
}: {
  list: Product[]; compare: string[]; onToggleCompare: (id: string) => void; billing: "monthly" | "yearly";
}) {
  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {list.map((p) => (
        <ProductCard
          key={p.id}
          p={p}
          selected={compare.includes(p.id)}
          onToggleCompare={() => onToggleCompare(p.id)}
          billing={billing}
        />
      ))}
    </div>
  );
}

function priceFor(p: Product, billing: "monthly" | "yearly") {
  return billing === "yearly" ? Math.round(p.price * 0.8) : p.price;
}

function BadgePill({ badge }: { badge: ProductBadge }) {
  if (!badge) return null;
  const map: Record<Exclude<ProductBadge, null>, { label: string; cls: string; Icon: typeof Flame }> = {
    popular: { label: "Popular", cls: "bg-gradient-to-r from-gold-soft to-gold-deep text-white", Icon: TrendingUp },
    new: { label: "New", cls: "bg-blue-500/10 text-blue-700 border border-blue-500/20", Icon: Sparkles },
    best: { label: "Best Value", cls: "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20", Icon: Shield },
    deal: { label: "Deal", cls: "bg-orange-500/10 text-orange-700 border border-orange-500/20", Icon: Flame },
  };
  const { label, cls, Icon } = map[badge];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-tight ${cls}`}>
      <Icon className="h-3 w-3" /> {label}
    </span>
  );
}

function ProductCard({
  p, selected, onToggleCompare, billing,
}: {
  p: Product; selected: boolean; onToggleCompare: () => void; billing: "monthly" | "yearly";
}) {
  const CatIcon = p.categoryKey === "bare" ? HardDrive : p.categoryKey === "cloud" ? Server : Globe2;
  const currentPrice = priceFor(p, billing);
  const stockTone =
    p.stock <= 3
      ? "text-orange-600"
      : p.stock <= 10
        ? "text-amber-600"
        : "text-emerald-600";

  return (
    <div
      className={`card-interactive group relative flex flex-col overflow-hidden p-0 transition-all ${
        selected ? "ring-2 ring-[color:var(--accent)]/50" : ""
      }`}
    >
      {/* Thumbnail */}
      <ProductThumbnail p={p} />

      <div className="flex flex-1 flex-col p-4">
        {/* Seller strip */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[color:var(--accent)]/25 bg-[color:var(--accent-tint)] text-[11px] font-bold text-[color:var(--accent-strong)]">
              {p.sellerInitial}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 text-[12px] font-bold text-foreground">
                <span className="truncate">{p.seller}</span>
                <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-[color:var(--accent-strong)]" />
              </div>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-foreground">{p.rating}</span>
                <span>({p.reviews.toLocaleString()})</span>
                <span className="text-foreground/30">·</span>
                <span className="text-[color:var(--accent-strong)]">{p.sellerTier}</span>
              </div>
            </div>
          </div>
          <span className={`inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/60 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground`}>
            <CatIcon className="h-3 w-3" /> {p.category}
          </span>
        </div>

        {/* Title */}
        <h4 className="mt-3 truncate text-[15px] font-bold tracking-tight text-foreground">{p.name}</h4>

        {/* Specs */}
        <div className="mt-2 grid grid-cols-2 gap-1.5 rounded-xl border border-border/60 bg-foreground/[0.02] p-2.5">
          <Spec icon={Cpu} label={p.vcpu} />
          <Spec icon={MemoryStick} label={p.ram} />
          <Spec icon={HardDrive} label={p.disk} />
          <Spec icon={Wifi} label={p.bandwidth} />
        </div>

        {/* Meta */}
        <div className="mt-3 flex items-center justify-between text-[10px] font-medium">
          <span className="inline-flex items-center gap-1 text-muted-foreground">
            <Zap className="h-3 w-3 text-[color:var(--accent-strong)]" /> {p.delivery}
          </span>
          <span className={`inline-flex items-center gap-1 font-bold ${stockTone}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
            {p.stock <= 3 ? `Only ${p.stock} left` : `${p.stock} in stock`}
          </span>
        </div>

        {/* Price + CTA */}
        <div className="mt-3 flex items-end justify-between border-t border-border/60 pt-3">
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {billing === "yearly" ? "Billed yearly" : "Starting from"}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[11px] font-semibold text-muted-foreground">Rp</span>
              <span className="text-xl font-bold leading-none tracking-tight text-foreground">
                {currentPrice.toLocaleString("id-ID")}
              </span>
              <span className="text-[11px] text-muted-foreground">/mo</span>
            </div>
            {p.oldPrice && billing === "monthly" && (
              <div className="mt-0.5 text-[10px] text-muted-foreground line-through">
                Rp {p.oldPrice.toLocaleString("id-ID")}
              </div>
            )}
          </div>
          <button className="btn-primary !h-9 !py-0 !px-3.5 !text-[12px]">
            <ShoppingCart className="h-3.5 w-3.5" />
            Deploy
          </button>
        </div>

        {/* Compare footer */}
        <button
          onClick={onToggleCompare}
          className={`mt-3 flex items-center justify-between rounded-lg border px-3 py-2 text-[11px] font-semibold uppercase tracking-tight transition-colors ${
            selected
              ? "border-[color:var(--accent)]/40 bg-[color:var(--accent-tint)] text-[color:var(--accent-strong)]"
              : "border-border bg-card/60 text-muted-foreground hover:text-foreground"
          }`}
        >
          <span className="inline-flex items-center gap-2">
            <span
              className={`grid h-4 w-4 place-items-center rounded border ${
                selected
                  ? "border-[color:var(--accent)] bg-[color:var(--accent)] text-white"
                  : "border-border bg-background"
              }`}
            >
              {selected && <Check className="h-3 w-3" strokeWidth={3} />}
            </span>
            Compare
          </span>
          <span className="text-[10px] normal-case text-foreground/50">{p.sold.toLocaleString()} sold</span>
        </button>
      </div>
    </div>
  );
}

function Spec({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5 text-[11px] text-foreground/75">
      <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" strokeWidth={1.75} />
      <span className="truncate font-medium">{label}</span>
    </div>
  );
}

/* ============================================================ */
/*  LIST VIEW                                                    */
/* ============================================================ */
function ProductList({
  list, compare, onToggleCompare, billing,
}: {
  list: Product[]; compare: string[]; onToggleCompare: (id: string) => void; billing: "monthly" | "yearly";
}) {
  return (
    <div className="mt-4 space-y-2.5">
      {list.map((p) => {
        const selected = compare.includes(p.id);
        const CatIcon = p.categoryKey === "bare" ? HardDrive : p.categoryKey === "cloud" ? Server : Globe2;
        const price = priceFor(p, billing);
        return (
          <div
            key={p.id}
            className={`card-interactive grid grid-cols-1 items-center gap-3 p-3.5 md:grid-cols-[minmax(0,2.2fr)_minmax(0,2.5fr)_minmax(0,1fr)_auto] ${
              selected ? "ring-2 ring-[color:var(--accent)]/50" : ""
            }`}
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="h-14 w-14 shrink-0 sm:h-16 sm:w-16">
                <ProductThumbnail p={p} size="sm" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <div className="truncate text-sm font-bold text-foreground">{p.name}</div>
                  <BadgePill badge={p.badge} />
                </div>
                <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <CatIcon className="h-3 w-3 shrink-0" />
                  <span className="truncate">{p.location}</span>
                  <span className="text-foreground/30">·</span>
                  <span className="truncate">{p.seller}</span>
                  <BadgeCheck className="h-3 w-3 shrink-0 text-[color:var(--accent-strong)]" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <Spec icon={Cpu} label={p.vcpu} />
              <Spec icon={MemoryStick} label={p.ram} />
              <Spec icon={HardDrive} label={p.disk} />
              <Spec icon={Wifi} label={p.bandwidth} />
            </div>

            <div className="flex flex-col text-[11px]">
              <span className="inline-flex items-center gap-1 text-foreground/80">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span className="font-semibold">{p.rating}</span>
                <span className="text-muted-foreground">({p.reviews})</span>
              </span>
              <span className="mt-0.5 inline-flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" /> {p.delivery}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 md:justify-end">
              <div className="text-right">
                <div className="flex items-baseline justify-end gap-1">
                  <span className="text-[10px] font-semibold text-muted-foreground">Rp</span>
                  <span className="text-base font-bold tracking-tight text-foreground">
                    {price.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="text-[10px] text-muted-foreground">/mo</div>
              </div>
              <button
                onClick={() => onToggleCompare(p.id)}
                aria-label="Compare"
                className={`grid h-9 w-9 place-items-center rounded-lg border transition-colors ${
                  selected
                    ? "border-[color:var(--accent)] bg-[color:var(--accent-tint)] text-[color:var(--accent-strong)]"
                    : "border-border bg-card text-foreground/60 hover:border-[color:var(--accent)]/40"
                }`}
              >
                {selected ? <Check className="h-4 w-4" strokeWidth={3} /> : <Plus className="h-4 w-4" />}
              </button>
              <button className="btn-primary !h-9 !py-0 !px-3.5 !text-[12px]">
                <ShoppingCart className="h-3.5 w-3.5" />
                Deploy
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ============================================================ */
/*  PAGINATION                                                   */
/* ============================================================ */
function Pagination() {
  return (
    <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
      <div className="text-xs text-muted-foreground">Page 1 of 24</div>
      <div className="flex items-center gap-1">
        <button className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card text-foreground/60 transition-colors hover:border-[color:var(--accent)]/40">
          <ChevronLeft className="h-4 w-4" />
        </button>
        {[1, 2, 3, 4].map((n) => (
          <button
            key={n}
            className={`h-9 w-9 rounded-lg text-sm font-semibold transition-colors ${
              n === 1
                ? "bg-[color:var(--accent)] text-white"
                : "border border-border bg-card text-foreground/70 hover:border-[color:var(--accent)]/40 hover:text-foreground"
            }`}
          >
            {n}
          </button>
        ))}
        <span className="px-1 text-sm text-muted-foreground">…</span>
        <button className="h-9 w-9 rounded-lg border border-border bg-card text-sm font-semibold text-foreground/70 transition-colors hover:border-[color:var(--accent)]/40">
          24
        </button>
        <button className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card text-foreground/60 transition-colors hover:border-[color:var(--accent)]/40">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* ============================================================ */
/*  COMPARE BAR (sticky bottom)                                  */
/* ============================================================ */
function CompareBar({
  ids, onRemove, onClear,
}: {
  ids: string[]; onRemove: (id: string) => void; onClear: () => void;
}) {
  const items = ids
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/95 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <div className="hidden shrink-0 items-center gap-2 rounded-full border border-[color:var(--accent)]/30 bg-[color:var(--accent-tint)] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[color:var(--accent-strong)] sm:inline-flex">
            <ArrowUpDown className="h-3.5 w-3.5" /> Compare {items.length}/4
          </div>
          <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto">
            {items.map((p) => (
              <div
                key={p.id}
                className="flex shrink-0 items-center gap-2 rounded-xl border border-border bg-card px-3 py-1.5"
              >
                <div className="grid h-7 w-7 place-items-center rounded-full border border-[color:var(--accent)]/25 bg-[color:var(--accent-tint)] text-[10px] font-bold text-[color:var(--accent-strong)]">
                  {p.sellerInitial}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-[12px] font-bold text-foreground">{p.name}</div>
                  <div className="truncate text-[10px] text-muted-foreground">
                    {p.vcpu} · {p.ram}
                  </div>
                </div>
                <button
                  onClick={() => onRemove(p.id)}
                  aria-label="Remove"
                  className="grid h-6 w-6 place-items-center rounded-full text-foreground/50 hover:bg-foreground/10 hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            {Array.from({ length: Math.max(0, 2 - items.length) }).map((_, i) => (
              <div
                key={i}
                className="hidden shrink-0 items-center gap-2 rounded-xl border border-dashed border-border/70 bg-card/40 px-4 py-1.5 text-[11px] text-muted-foreground sm:flex"
              >
                <Plus className="h-3.5 w-3.5" /> Add package
              </div>
            ))}
          </div>
        </div>
        <div className="flex shrink-0 items-center justify-end gap-2">
          <button onClick={onClear} className="btn-ghost !text-[12px]">
            Clear
          </button>
          <button
            disabled={items.length < 2}
            className="btn-primary !text-[12px] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ArrowUpDown className="h-3.5 w-3.5" /> Compare {items.length} packages
          </button>
        </div>
      </div>
    </div>
  );
}
