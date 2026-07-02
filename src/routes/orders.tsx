import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Copy,
  Download,
  Filter,
  HardDrive,
  MoreHorizontal,
  Package,
  RefreshCw,
  Search,
  Server,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  XCircle,
  Eye,
  Receipt,
  ChevronRight,
} from "lucide-react";
import { Sidebar, Topbar } from "./dashboard";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "My Orders — NodeKPT" },
      {
        name: "description",
        content:
          "Track and manage every NodeKPT order: VPS, Bare Metal, proxies, and storage. Filter by status, download invoices, and re-order in one click.",
      },
    ],
  }),
  component: OrdersPage,
});

type OrderStatus = "completed" | "pending" | "processing" | "cancelled";
type OrderKind = "VPS" | "Bare Metal" | "Storage" | "Proxy";

type Order = {
  id: string;
  product: string;
  kind: OrderKind;
  region: string;
  qty: number;
  amount: number;
  date: string;
  status: OrderStatus;
  seller: string;
};

const ORDERS: Order[] = [
  { id: "NK-2410-8721", product: "Ryzen 9 7950X · 128GB · 2×NVMe 2TB", kind: "Bare Metal", region: "Jakarta, ID", qty: 1, amount: 3_450_000, date: "2 Jul 2026 · 14:22", status: "completed", seller: "NodeCore ID" },
  { id: "NK-2410-8698", product: "VPS Cloud 8 vCPU · 32GB RAM · 400GB", kind: "VPS", region: "Singapore, SG", qty: 2, amount: 1_280_000, date: "1 Jul 2026 · 09:10", status: "processing", seller: "Skyhost" },
  { id: "NK-2410-8654", product: "Residential Proxy Pool · 25 IPs", kind: "Proxy", region: "US Rotating", qty: 1, amount: 675_000, date: "30 Jun 2026 · 18:03", status: "completed", seller: "ProxyLabs" },
  { id: "NK-2410-8611", product: "Object Storage · 500GB", kind: "Storage", region: "Jakarta, ID", qty: 1, amount: 245_000, date: "28 Jun 2026 · 11:47", status: "pending", seller: "NodeKPT Cloud" },
  { id: "NK-2410-8577", product: "GPU RTX A5000 · 64GB · 1TB NVMe", kind: "Bare Metal", region: "Frankfurt, DE", qty: 1, amount: 5_890_000, date: "26 Jun 2026 · 22:15", status: "completed", seller: "EU DataForge" },
  { id: "NK-2410-8542", product: "VPS Starter 2 vCPU · 4GB RAM", kind: "VPS", region: "Jakarta, ID", qty: 3, amount: 435_000, date: "24 Jun 2026 · 08:31", status: "cancelled", seller: "Skyhost" },
  { id: "NK-2410-8501", product: "Datacenter Proxy · 100 IPs", kind: "Proxy", region: "SG Static", qty: 1, amount: 890_000, date: "22 Jun 2026 · 16:44", status: "completed", seller: "ProxyLabs" },
];

const FILTERS: { key: OrderStatus | "all"; label: string }[] = [
  { key: "all", label: "Semua" },
  { key: "completed", label: "Selesai" },
  { key: "processing", label: "Diproses" },
  { key: "pending", label: "Menunggu" },
  { key: "cancelled", label: "Dibatalkan" },
];

const KIND_FILTERS: (OrderKind | "all")[] = ["all", "VPS", "Bare Metal", "Storage", "Proxy"];

function OrdersPage() {
  const [status, setStatus] = useState<OrderStatus | "all">("all");
  const [kind, setKind] = useState<OrderKind | "all">("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return ORDERS.filter((o) => {
      if (status !== "all" && o.status !== status) return false;
      if (kind !== "all" && o.kind !== kind) return false;
      if (q && !`${o.id} ${o.product} ${o.seller}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [status, kind, q]);

  const totals = useMemo(() => {
    const total = ORDERS.reduce((n, o) => n + (o.status !== "cancelled" ? o.amount : 0), 0);
    const active = ORDERS.filter((o) => o.status === "processing" || o.status === "pending").length;
    const done = ORDERS.filter((o) => o.status === "completed").length;
    return { total, active, done, count: ORDERS.length };
  }, []);

  return (
    <div className="theme-light min-h-screen bg-background text-foreground">
      <div className="constellation pointer-events-none fixed inset-0 opacity-40" aria-hidden />
      <div className="radial-glow pointer-events-none fixed left-1/3 top-0 h-[600px] w-[900px] -translate-x-1/2" aria-hidden />

      <div className="relative flex">
        <Sidebar activeLabel="Orders" />
        <main className="min-w-0 flex-1">
          <Topbar />
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
            <PageHeader count={totals.count} />
            <StatsRow total={totals.total} active={totals.active} done={totals.done} count={totals.count} />
            <FilterBar
              status={status}
              setStatus={setStatus}
              kind={kind}
              setKind={setKind}
              q={q}
              setQ={setQ}
              resultCount={filtered.length}
            />
            <OrdersTable orders={filtered} />
            <OrdersMobile orders={filtered} />
            <EmptyOrCta count={filtered.length} />
          </div>
        </main>
      </div>
    </div>
  );
}

/* ---------------- HEADER ---------------- */
function PageHeader({ count }: { count: number }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--accent)]/25 bg-[color:var(--accent-tint)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-strong)]">
          <ShoppingBag className="h-3 w-3" strokeWidth={2} /> My Orders
        </div>
        <h1 className="mt-4 text-2xl font-bold leading-[1.1] tracking-tight sm:text-3xl md:text-4xl">
          Riwayat pesanan Anda
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
          Kelola {count} pesanan VPS, Bare Metal, proxy, dan storage — semua dalam satu tempat.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent">
          <Download className="h-4 w-4" /> Export CSV
        </button>
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-2 rounded-lg bg-[color:var(--accent)] px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
        >
          <Sparkles className="h-4 w-4" /> Pesan lagi
        </Link>
      </div>
    </div>
  );
}

/* ---------------- STATS ---------------- */
function StatsRow({ total, active, done, count }: { total: number; active: number; done: number; count: number }) {
  const items = [
    { icon: Receipt, label: "Total belanja", value: rupiah(total), tint: "var(--accent)", chip: `+${count} pesanan` },
    { icon: Clock, label: "Sedang diproses", value: String(active), tint: "#f59e0b", chip: "Menunggu server" },
    { icon: CheckCircle2, label: "Selesai bulan ini", value: String(done), tint: "#10b981", chip: "Aktif & berjalan" },
    { icon: TrendingUp, label: "Kategori teratas", value: "Bare Metal", tint: "#8b5cf6", chip: "2 pesanan" },
  ];
  return (
    <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
      {items.map((it) => (
        <div key={it.label} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm transition-colors hover:border-[color:var(--accent)]/30">
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 blur-2xl" style={{ background: it.tint }} />
          <div className="flex items-start justify-between">
            <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: `${it.tint}18`, color: it.tint }}>
              <it.icon className="h-5 w-5" strokeWidth={2} />
            </div>
            <span className="rounded-full border border-border bg-background px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{it.chip}</span>
          </div>
          <div className="mt-4 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{it.label}</div>
          <div className="mt-1 text-lg font-bold tracking-tight text-foreground sm:text-xl">{it.value}</div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- FILTER BAR ---------------- */
function FilterBar({
  status, setStatus, kind, setKind, q, setQ, resultCount,
}: {
  status: OrderStatus | "all";
  setStatus: (s: OrderStatus | "all") => void;
  kind: OrderKind | "all";
  setKind: (k: OrderKind | "all") => void;
  q: string;
  setQ: (v: string) => void;
  resultCount: number;
}) {
  return (
    <div className="mt-6 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {FILTERS.map((f) => {
            const active = status === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setStatus(f.key)}
                className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  active
                    ? "border-[color:var(--accent)]/40 bg-[color:var(--accent-tint)] text-[color:var(--accent-strong)]"
                    : "border-border bg-background text-muted-foreground hover:border-[color:var(--accent)]/30 hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari ID, produk, atau seller"
              className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-[color:var(--accent)]/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]/20 sm:w-72"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            <Filter className="h-3.5 w-3.5" /> Kategori
          </span>
          {KIND_FILTERS.map((k) => {
            const active = kind === k;
            return (
              <button
                key={k}
                onClick={() => setKind(k)}
                className={`whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "border-[color:var(--accent)]/40 bg-[color:var(--accent-tint)] text-[color:var(--accent-strong)]"
                    : "border-border bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                {k === "all" ? "Semua produk" : k}
              </button>
            );
          })}
        </div>
        <div className="text-xs text-muted-foreground">
          Menampilkan <span className="font-semibold text-foreground">{resultCount}</span> pesanan
        </div>
      </div>
    </div>
  );
}

/* ---------------- DESKTOP TABLE ---------------- */
function OrdersTable({ orders }: { orders: Order[] }) {
  return (
    <div className="mt-6 hidden overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:block">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-background/60">
            <tr className="border-b border-border text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-3">Pesanan</th>
              <th className="px-5 py-3">Kategori</th>
              <th className="px-5 py-3">Tanggal</th>
              <th className="px-5 py-3 text-right">Total</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="group border-b border-border/60 transition-colors last:border-0 hover:bg-[color:var(--accent-tint)]/40">
                <td className="px-5 py-4">
                  <div className="flex items-start gap-3">
                    <KindIcon kind={o.kind} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-semibold text-[color:var(--accent-strong)]">{o.id}</span>
                        <button className="rounded p-0.5 text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100" aria-label="Copy order id">
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="mt-0.5 truncate text-sm font-medium text-foreground">{o.product}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground">{o.region} · {o.seller}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center rounded-md border border-border bg-background px-2 py-0.5 text-xs font-medium text-foreground">
                    {o.kind}
                  </span>
                  <div className="mt-1 text-xs text-muted-foreground">Qty {o.qty}</div>
                </td>
                <td className="px-5 py-4 text-sm text-muted-foreground whitespace-nowrap">{o.date}</td>
                <td className="px-5 py-4 text-right font-semibold text-foreground whitespace-nowrap">{rupiah(o.amount)}</td>
                <td className="px-5 py-4"><StatusBadge status={o.status} /></td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <IconAction label="Lihat detail"><Eye className="h-4 w-4" /></IconAction>
                    <IconAction label="Unduh invoice"><Download className="h-4 w-4" /></IconAction>
                    <IconAction label="Lainnya"><MoreHorizontal className="h-4 w-4" /></IconAction>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------- MOBILE LIST ---------------- */
function OrdersMobile({ orders }: { orders: Order[] }) {
  return (
    <div className="mt-6 grid gap-3 md:hidden">
      {orders.map((o) => (
        <div key={o.id} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <KindIcon kind={o.kind} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] font-semibold text-[color:var(--accent-strong)]">{o.id}</span>
                <StatusBadge status={o.status} />
              </div>
              <div className="mt-1 truncate text-sm font-semibold text-foreground">{o.product}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">{o.region} · {o.seller}</div>
            </div>
          </div>
          <div className="mt-3 flex items-end justify-between border-t border-border pt-3">
            <div>
              <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Total</div>
              <div className="text-base font-bold text-foreground">{rupiah(o.amount)}</div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">{o.date}</div>
            </div>
            <button className="inline-flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent">
              Detail <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- EMPTY / CTA ---------------- */
function EmptyOrCta({ count }: { count: number }) {
  if (count === 0) {
    return (
      <div className="mt-6 grid place-items-center rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[color:var(--accent-tint)] text-[color:var(--accent-strong)]">
          <Package className="h-7 w-7" strokeWidth={1.8} />
        </div>
        <h3 className="mt-4 text-lg font-bold text-foreground">Belum ada pesanan cocok</h3>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">Coba ubah filter atau kata kunci pencarian Anda. Anda juga bisa mulai jelajahi marketplace.</p>
        <Link to="/marketplace" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[color:var(--accent)] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90">
          Jelajahi Marketplace <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }
  return (
    <div className="mt-6 flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3 text-xs text-muted-foreground shadow-sm">
      <div className="inline-flex items-center gap-2"><RefreshCw className="h-3.5 w-3.5" /> Diperbarui beberapa detik lalu</div>
      <button className="inline-flex items-center gap-1 font-semibold text-[color:var(--accent-strong)] hover:opacity-80">
        Lihat arsip pesanan lama <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

/* ---------------- HELPERS ---------------- */
function KindIcon({ kind }: { kind: OrderKind }) {
  const map: Record<OrderKind, { icon: typeof Server; color: string }> = {
    "Bare Metal": { icon: HardDrive, color: "#8b5cf6" },
    "VPS": { icon: Server, color: "var(--accent)" },
    "Storage": { icon: Package, color: "#0ea5e9" },
    "Proxy": { icon: TrendingUp, color: "#10b981" },
  };
  const { icon: Icon, color } = map[kind];
  return (
    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style={{ background: `${color}18`, color }}>
      <Icon className="h-5 w-5" strokeWidth={2} />
    </div>
  );
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const map: Record<OrderStatus, { label: string; color: string; bg: string; icon: typeof CheckCircle2 }> = {
    completed: { label: "Selesai", color: "#059669", bg: "#10b98118", icon: CheckCircle2 },
    processing: { label: "Diproses", color: "#2563eb", bg: "#2563eb18", icon: RefreshCw },
    pending: { label: "Menunggu", color: "#b45309", bg: "#f59e0b22", icon: Clock },
    cancelled: { label: "Dibatalkan", color: "#b91c1c", bg: "#ef444418", icon: XCircle },
  };
  const s = map[status];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ color: s.color, background: s.bg }}>
      <s.icon className="h-3 w-3" strokeWidth={2.5} /> {s.label}
    </span>
  );
}

function IconAction({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <button aria-label={label} className="grid h-8 w-8 place-items-center rounded-lg border border-transparent text-muted-foreground transition-colors hover:border-border hover:bg-background hover:text-foreground">
      {children}
    </button>
  );
}

function rupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}
