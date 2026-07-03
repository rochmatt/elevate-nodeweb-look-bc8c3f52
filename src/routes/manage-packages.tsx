import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Archive,
  ArrowUpDown,
  BadgeCheck,
  Bell,
  CheckCircle2,
  Copy,
  Cpu,
  Download,
  Edit3,
  Eye,
  Filter,
  HardDrive,
  Image as ImageIcon,
  LayoutGrid,
  List,
  MemoryStick,
  MoreHorizontal,
  Package as PackageIcon,
  Plus,
  Search,
  Server,
  Sparkles,
  Store,
  Trash2,
  TrendingUp,
  Upload,
  X,
} from "lucide-react";
import { Sidebar, Topbar } from "./dashboard";

export const Route = createFileRoute("/manage-packages")({
  head: () => ({
    meta: [
      { title: "Manage Packages — NodeKPT · Seller Dashboard" },
      { name: "description", content: "Create, edit and publish the VPS, Bare Metal and Proxy packages you sell on NodeKPT. Manage variants, pricing, stock and visibility." },
    ],
  }),
  component: ManagePackages,
});

type PackageStatus = "Active" | "Archived" | "Draft";

type PackageRow = {
  id: string;
  name: string;
  image?: string;
  imageWarning?: boolean;
  hidden?: boolean;
  manual?: boolean;
  status: PackageStatus;
  node: string;
  specs: string;
  variants?: number;
  priceFrom: number;
  fromLabel?: boolean;
  stock: number;
  orders: number;
  category: "Cloud VPS" | "Bare Metal" | "Proxy";
};

const DATA: PackageRow[] = [
  { id: "p1", name: "VPS r93 (Test)", imageWarning: true, hidden: true, status: "Archived", node: "r93", specs: "1 vCPU · 2GB · 20GB", priceFrom: 50000, stock: 100, orders: 12, category: "Cloud VPS" },
  { id: "p2", name: "VPS Ryzen 9 5950X Super Fast", image: "ryzen", status: "Active", node: "—", specs: "3 plan", variants: 3, priceFrom: 50000, fromLabel: true, stock: 3, orders: 32, category: "Cloud VPS" },
  { id: "p3", name: "VPS PREMIUM 2026", image: "premium", status: "Archived", node: "—", specs: "3 plan", variants: 3, priceFrom: 10000, fromLabel: true, stock: 28, orders: 3, category: "Cloud VPS" },
  { id: "p4", name: "VPS Bandung", image: "bandung", manual: true, status: "Archived", node: "—", specs: "1 vCPU · 1GB · 20GB", priceFrom: 10000, stock: 10, orders: 2, category: "Cloud VPS" },
  { id: "p5", name: "VPS Bandung", imageWarning: true, hidden: true, status: "Archived", node: "—", specs: "1 vCPU · 1GB · 20GB", priceFrom: 10000, stock: 9, orders: 1, category: "Cloud VPS" },
  { id: "p6", name: "Bare Metal Epyc Milan", image: "epyc", status: "Active", node: "sg-01", specs: "32 vCPU · 128GB · 2TB NVMe", priceFrom: 3450000, stock: 5, orders: 8, category: "Bare Metal" },
  { id: "p7", name: "Residential Proxy ID", image: "proxy", status: "Draft", node: "—", specs: "Unlimited BW · 5 ports", priceFrom: 85000, stock: 200, orders: 0, category: "Proxy" },
];

function ManagePackages() {
  return (
    <div className="theme-light min-h-screen bg-background text-foreground">
      <div className="constellation pointer-events-none fixed inset-0 opacity-40" aria-hidden />
      <div className="radial-glow pointer-events-none fixed left-1/3 top-0 h-[600px] w-[900px] -translate-x-1/2" aria-hidden />
      <div className="relative flex">
        <Sidebar activeLabel="Manage Packages" />
        <main className="min-w-0 flex-1">
          <Topbar />
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
            <PageHeader />
            <StatsRow />
            <PackagesPanel />
          </div>
        </main>
      </div>
    </div>
  );
}

/* ---------- HEADER ---------- */
function PageHeader() {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
      <div className="min-w-0">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-deep">
          <Store className="h-3 w-3" /> Seller Console
        </div>
        <h1 className="mt-4 text-2xl font-bold leading-[1.1] tracking-tight sm:text-3xl md:text-4xl">
          Manage <span className="text-gold-gradient">Packages</span>
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Create, edit and publish the VPS packages you sell. Control pricing, stock and visibility — all from one place.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button className="btn-ghost">
          <Upload className="h-4 w-4 text-[color:var(--accent-strong)]" />
          Import CSV
        </button>
        <button className="btn-ghost">
          <Download className="h-4 w-4 text-[color:var(--accent-strong)]" />
          Export
        </button>
        <button className="btn-primary">
          <Plus className="h-4 w-4" />
          New Package
        </button>
      </div>
    </div>
  );
}

/* ---------- STATS ---------- */
function StatsRow() {
  const stats = [
    { label: "Total Packages", value: "7", hint: "3 categories", icon: PackageIcon, tint: "text-sky-600", ring: "border-sky-500/30 bg-sky-500/10" },
    { label: "Active & Published", value: "2", hint: "Visible in marketplace", icon: CheckCircle2, tint: "text-emerald-600", ring: "border-emerald-500/30 bg-emerald-500/10" },
    { label: "Total Orders (30d)", value: "58", hint: "+12 vs last month", icon: TrendingUp, tint: "text-amber-600", ring: "border-amber-500/30 bg-amber-500/10" },
    { label: "Needs Attention", value: "2", hint: "Missing image / hidden", icon: AlertTriangle, tint: "text-rose-600", ring: "border-rose-500/30 bg-rose-500/10" },
  ];
  return (
    <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="card-surface p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{s.label}</div>
              <div className="mt-2 text-2xl font-bold leading-none tracking-tight">{s.value}</div>
              <div className="mt-2 text-[11px] text-muted-foreground">{s.hint}</div>
            </div>
            <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border ${s.ring}`}>
              <s.icon className={`h-4 w-4 ${s.tint}`} strokeWidth={1.75} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- FILTER + PACKAGES ---------- */
function PackagesPanel() {
  const [status, setStatus] = useState<"All" | PackageStatus>("All");
  const [category, setCategory] = useState<"All" | PackageRow["category"]>("All");
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"table" | "grid">("table");
  const [selected, setSelected] = useState<string[]>([]);

  const rows = useMemo(() => {
    return DATA.filter((r) => {
      if (status !== "All" && r.status !== status) return false;
      if (category !== "All" && r.category !== category) return false;
      if (query && !r.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [status, category, query]);

  const counts = useMemo(() => ({
    All: DATA.length,
    Active: DATA.filter((r) => r.status === "Active").length,
    Draft: DATA.filter((r) => r.status === "Draft").length,
    Archived: DATA.filter((r) => r.status === "Archived").length,
  }), []);

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const toggleAll = () =>
    setSelected((s) => (s.length === rows.length ? [] : rows.map((r) => r.id)));

  return (
    <div className="mt-6 space-y-4 sm:mt-8">
      {/* Toolbar */}
      <div className="card-surface p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Status tabs */}
          <div className="-mx-1 flex flex-wrap items-center gap-1.5 overflow-x-auto px-1">
            {(["All", "Active", "Draft", "Archived"] as const).map((s) => {
              const active = status === s;
              return (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-colors ${
                    active
                      ? "border-[color:var(--accent)]/40 bg-[color:var(--accent-tint)] text-[color:var(--accent-strong)]"
                      : "border-border bg-card/60 text-foreground/75 hover:border-[color:var(--accent)]/30 hover:text-foreground"
                  }`}
                >
                  {s}
                  <span
                    className={`rounded-full px-1.5 text-[10px] font-semibold ${
                      active ? "bg-[color:var(--accent)] text-white" : "bg-foreground/5 text-foreground/60"
                    }`}
                  >
                    {counts[s]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search + filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-[180px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search packages..."
                className="h-9 w-full rounded-lg border border-border bg-card/60 pl-9 pr-3 text-sm outline-none focus:border-[color:var(--accent)]/40"
              />
            </div>
            <div className="relative flex h-9 items-center gap-1.5 rounded-lg border border-border bg-card/60 px-3">
              <Filter className="h-3.5 w-3.5 text-muted-foreground" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as typeof category)}
                className="bg-transparent pr-1 text-sm font-medium outline-none"
              >
                <option>All</option>
                <option>Cloud VPS</option>
                <option>Bare Metal</option>
                <option>Proxy</option>
              </select>
            </div>
            <div className="hidden items-center gap-1 rounded-lg border border-border bg-card/60 p-1 sm:flex">
              <button
                onClick={() => setView("table")}
                className={`grid h-7 w-7 place-items-center rounded-md transition-colors ${
                  view === "table" ? "bg-[color:var(--accent-tint)] text-[color:var(--accent-strong)]" : "text-muted-foreground hover:text-foreground"
                }`}
                aria-label="Table view"
              >
                <List className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setView("grid")}
                className={`grid h-7 w-7 place-items-center rounded-md transition-colors ${
                  view === "grid" ? "bg-[color:var(--accent-tint)] text-[color:var(--accent-strong)]" : "text-muted-foreground hover:text-foreground"
                }`}
                aria-label="Grid view"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {selected.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[color:var(--accent)]/30 bg-[color:var(--accent-tint)]/60 px-3 py-2 text-xs">
            <div className="font-semibold text-[color:var(--accent-strong)]">
              {selected.length} package{selected.length > 1 ? "s" : ""} selected
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <button className="inline-flex h-7 items-center gap-1 rounded-md border border-border bg-card px-2 text-[11px] font-medium hover:border-[color:var(--accent)]/40">
                <Archive className="h-3 w-3" /> Archive
              </button>
              <button className="inline-flex h-7 items-center gap-1 rounded-md border border-border bg-card px-2 text-[11px] font-medium hover:border-[color:var(--accent)]/40">
                <CheckCircle2 className="h-3 w-3" /> Activate
              </button>
              <button className="inline-flex h-7 items-center gap-1 rounded-md border border-rose-500/30 bg-rose-500/10 px-2 text-[11px] font-medium text-rose-700 hover:bg-rose-500/15">
                <Trash2 className="h-3 w-3" /> Delete
              </button>
              <button onClick={() => setSelected([])} className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:text-foreground">
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Result count */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div>
          Showing <span className="font-semibold text-foreground">{rows.length}</span> of{" "}
          <span className="font-semibold text-foreground">{DATA.length}</span> packages
        </div>
        <button className="inline-flex items-center gap-1 hover:text-foreground">
          <ArrowUpDown className="h-3 w-3" /> Sort: Newest
        </button>
      </div>

      {view === "table" ? (
        <PackagesTable rows={rows} selected={selected} toggle={toggle} toggleAll={toggleAll} />
      ) : (
        <PackagesGrid rows={rows} selected={selected} toggle={toggle} />
      )}

      {rows.length === 0 && <EmptyState onCreate={() => {}} />}
    </div>
  );
}

/* ---------- TABLE ---------- */
function PackagesTable({
  rows, selected, toggle, toggleAll,
}: {
  rows: PackageRow[];
  selected: string[];
  toggle: (id: string) => void;
  toggleAll: () => void;
}) {
  return (
    <>
      {/* Desktop table */}
      <div className="card-surface hidden overflow-hidden p-0 md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-foreground/[0.02]">
              <tr className="[&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:text-[10px] [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-[0.12em] [&_th]:text-muted-foreground">
                <th className="w-8">
                  <input
                    type="checkbox"
                    className="accent-[color:var(--accent)]"
                    checked={selected.length > 0 && selected.length === rows.length}
                    onChange={toggleAll}
                  />
                </th>
                <th>Name</th>
                <th>Status</th>
                <th>Node</th>
                <th>Specifications</th>
                <th>Price/mo</th>
                <th className="text-right">Stock</th>
                <th className="text-right">Orders</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <TableRow key={r.id} r={r} checked={selected.includes(r.id)} onToggle={() => toggle(r.id)} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile stacked cards */}
      <div className="space-y-3 md:hidden">
        {rows.map((r) => (
          <MobileCard key={r.id} r={r} checked={selected.includes(r.id)} onToggle={() => toggle(r.id)} />
        ))}
      </div>
    </>
  );
}

function StatusPill({ status }: { status: PackageStatus }) {
  const map = {
    Active: "border-emerald-600/30 bg-emerald-500/10 text-emerald-700",
    Archived: "border-foreground/15 bg-foreground/5 text-foreground/70",
    Draft: "border-amber-600/30 bg-amber-500/10 text-amber-700",
  } as const;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${map[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function Thumb({ r }: { r: PackageRow }) {
  if (r.imageWarning) {
    return (
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-dashed border-rose-500/40 bg-rose-500/5 text-rose-600" title="No image">
        <ImageIcon className="h-4 w-4" strokeWidth={1.75} />
      </div>
    );
  }
  const grads: Record<string, string> = {
    ryzen: "from-sky-400/40 via-indigo-400/30 to-violet-500/40",
    premium: "from-slate-900 via-gold/60 to-slate-900",
    bandung: "from-amber-400/50 via-orange-400/40 to-rose-400/40",
    epyc: "from-emerald-500/40 via-teal-400/40 to-cyan-500/40",
    proxy: "from-purple-500/40 via-fuchsia-400/40 to-pink-500/40",
  };
  const cls = r.image ? grads[r.image] ?? "from-foreground/10 to-foreground/5" : "from-foreground/10 to-foreground/5";
  return (
    <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border bg-gradient-to-br ${cls}`}>
      <Server className="h-4 w-4 text-white/90 drop-shadow" strokeWidth={2} />
    </div>
  );
}

function NameCell({ r }: { r: PackageRow }) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <Thumb r={r} />
      <div className="min-w-0">
        <div className="truncate text-[13px] font-semibold text-foreground">{r.name}</div>
        <div className="mt-1 flex flex-wrap items-center gap-1">
          {r.variants && (
            <span className="inline-flex items-center gap-1 rounded-md border border-violet-500/25 bg-violet-500/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-violet-700">
              {r.variants} Variant
            </span>
          )}
          {r.manual && (
            <span className="inline-flex items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-amber-700">
              Manual
            </span>
          )}
          {r.imageWarning && (
            <span className="inline-flex items-center gap-1 rounded-md border border-rose-500/30 bg-rose-500/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-rose-700">
              No image
            </span>
          )}
          {r.hidden && (
            <span className="inline-flex items-center gap-1 rounded-md border border-foreground/15 bg-foreground/5 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-foreground/70">
              Hidden
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function PriceCell({ r }: { r: PackageRow }) {
  return (
    <div className="whitespace-nowrap">
      {r.fromLabel && <span className="mr-1 text-[10px] uppercase tracking-wider text-muted-foreground">from</span>}
      <span className="text-[10px] text-muted-foreground">Rp</span>{" "}
      <span className="text-[13px] font-semibold text-foreground">{r.priceFrom.toLocaleString("id-ID")}</span>
    </div>
  );
}

function ActionButtons({ status }: { status: PackageStatus }) {
  return (
    <div className="flex flex-wrap justify-end gap-1.5">
      <button className="inline-flex h-7 items-center gap-1 rounded-md border border-border bg-card px-2 text-[11px] font-medium text-foreground/80 transition-colors hover:border-[color:var(--accent)]/40 hover:text-foreground">
        <Edit3 className="h-3 w-3" /> Edit
      </button>
      <button className="inline-flex h-7 items-center gap-1 rounded-md border border-gold/40 bg-gold/10 px-2 text-[11px] font-semibold text-gold-deep transition-colors hover:bg-gold/20">
        <Sparkles className="h-3 w-3" /> Boost
      </button>
      {status === "Active" ? (
        <button className="inline-flex h-7 items-center gap-1 rounded-md border border-border bg-card px-2 text-[11px] font-medium text-foreground/80 transition-colors hover:border-[color:var(--accent)]/40 hover:text-foreground">
          <Archive className="h-3 w-3" /> Archive
        </button>
      ) : (
        <button className="inline-flex h-7 items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 text-[11px] font-semibold text-emerald-700 transition-colors hover:bg-emerald-500/15">
          <CheckCircle2 className="h-3 w-3" /> Activate
        </button>
      )}
      <button className="inline-flex h-7 items-center gap-1 rounded-md border border-rose-500/30 bg-rose-500/5 px-2 text-[11px] font-medium text-rose-700 transition-colors hover:bg-rose-500/10">
        <Trash2 className="h-3 w-3" /> Delete
      </button>
    </div>
  );
}

function TableRow({ r, checked, onToggle }: { r: PackageRow; checked: boolean; onToggle: () => void }) {
  return (
    <tr className="border-b border-border/60 last:border-0 hover:bg-foreground/[0.015]">
      <td className="px-4 py-3">
        <input type="checkbox" className="accent-[color:var(--accent)]" checked={checked} onChange={onToggle} />
      </td>
      <td className="px-4 py-3"><NameCell r={r} /></td>
      <td className="px-4 py-3"><StatusPill status={r.status} /></td>
      <td className="px-4 py-3 text-[13px] text-foreground/80">{r.node}</td>
      <td className="px-4 py-3 text-[12px] text-muted-foreground">{r.specs}</td>
      <td className="px-4 py-3"><PriceCell r={r} /></td>
      <td className="px-4 py-3 text-right text-[13px] font-semibold text-foreground">{r.stock}</td>
      <td className="px-4 py-3 text-right text-[13px] font-semibold text-foreground">{r.orders}</td>
      <td className="px-4 py-3"><ActionButtons status={r.status} /></td>
    </tr>
  );
}

function MobileCard({ r, checked, onToggle }: { r: PackageRow; checked: boolean; onToggle: () => void }) {
  return (
    <div className="card-surface p-4">
      <div className="flex items-start gap-3">
        <input type="checkbox" className="mt-1 accent-[color:var(--accent)]" checked={checked} onChange={onToggle} />
        <div className="min-w-0 flex-1">
          <NameCell r={r} />
        </div>
        <StatusPill status={r.status} />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 rounded-xl border border-border/60 bg-foreground/[0.02] p-3 text-[11px]">
        <div className="flex items-center gap-1.5 text-foreground/75">
          <Cpu className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.75} />
          <span className="truncate font-medium">{r.specs}</span>
        </div>
        <div className="flex items-center gap-1.5 text-foreground/75">
          <HardDrive className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.75} />
          <span className="truncate font-medium">Node: {r.node}</span>
        </div>
        <div className="flex items-center gap-1.5 text-foreground/75">
          <MemoryStick className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.75} />
          <span className="font-medium">Stock: {r.stock}</span>
        </div>
        <div className="flex items-center gap-1.5 text-foreground/75">
          <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.75} />
          <span className="font-medium">Orders: {r.orders}</span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <PriceCell r={r} />
        <ActionButtons status={r.status} />
      </div>
    </div>
  );
}

/* ---------- GRID VIEW ---------- */
function PackagesGrid({
  rows, selected, toggle,
}: {
  rows: PackageRow[];
  selected: string[];
  toggle: (id: string) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {rows.map((r) => (
        <div key={r.id} className="card-interactive relative flex flex-col p-5">
          <div className="absolute right-4 top-4 flex items-center gap-2">
            <StatusPill status={r.status} />
            <button className="grid h-7 w-7 place-items-center rounded-md border border-border bg-card text-foreground/60 hover:text-foreground">
              <MoreHorizontal className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="flex items-start gap-3 pr-24">
            <input type="checkbox" className="mt-1 accent-[color:var(--accent)]" checked={selected.includes(r.id)} onChange={() => toggle(r.id)} />
            <NameCell r={r} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl border border-border/60 bg-foreground/[0.02] p-3 text-[11px]">
            <div className="text-muted-foreground">Node</div>
            <div className="text-right font-semibold text-foreground">{r.node}</div>
            <div className="text-muted-foreground">Specs</div>
            <div className="truncate text-right font-semibold text-foreground">{r.specs}</div>
            <div className="text-muted-foreground">Stock</div>
            <div className="text-right font-semibold text-foreground">{r.stock}</div>
            <div className="text-muted-foreground">Orders</div>
            <div className="text-right font-semibold text-foreground">{r.orders}</div>
          </div>
          <div className="mt-4 flex items-end justify-between border-t border-border/60 pt-4">
            <PriceCell r={r} />
            <div className="flex gap-1.5">
              <button className="grid h-8 w-8 place-items-center rounded-md border border-border bg-card text-foreground/70 hover:border-[color:var(--accent)]/40 hover:text-foreground" aria-label="Preview">
                <Eye className="h-3.5 w-3.5" />
              </button>
              <button className="grid h-8 w-8 place-items-center rounded-md border border-border bg-card text-foreground/70 hover:border-[color:var(--accent)]/40 hover:text-foreground" aria-label="Duplicate">
                <Copy className="h-3.5 w-3.5" />
              </button>
              <button className="btn-primary !h-8 !py-0 !px-3 !text-[12px]">
                <Edit3 className="h-3 w-3" /> Edit
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- EMPTY ---------- */
function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="card-surface flex flex-col items-center gap-3 p-10 text-center">
      <div className="grid h-12 w-12 place-items-center rounded-xl border border-[color:var(--accent)]/25 bg-[color:var(--accent-tint)] text-[color:var(--accent-strong)]">
        <PackageIcon className="h-5 w-5" />
      </div>
      <div className="text-base font-semibold">No packages match your filters</div>
      <div className="max-w-sm text-xs text-muted-foreground">
        Try clearing filters or create a new package to start selling on the marketplace.
      </div>
      <button onClick={onCreate} className="btn-primary mt-2">
        <Plus className="h-4 w-4" /> New Package
      </button>
    </div>
  );
}

/* keep unused imports referenced to avoid warnings on some setups */
void Bell; void BadgeCheck;
