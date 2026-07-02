import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  Banknote,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock,
  CreditCard,
  Download,
  FileText,
  Filter,
  Landmark,
  MoreHorizontal,
  Printer,
  QrCode,
  Receipt,
  RefreshCw,
  Search,
  Send,
  Sparkles,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Sidebar, Topbar } from "./dashboard";

export const Route = createFileRoute("/invoices")({
  head: () => ({
    meta: [
      { title: "Billing & Invoices — NodeKPT" },
      {
        name: "description",
        content:
          "Kelola tagihan NodeKPT: unduh invoice PDF, lihat status pembayaran, dan pantau siklus billing VPS, Bare Metal, proxy, & storage Anda.",
      },
    ],
  }),
  component: InvoicesPage,
});

type InvoiceStatus = "paid" | "unpaid" | "overdue" | "draft" | "refunded";
type PayMethod = "QRIS" | "VA BCA" | "VA Mandiri" | "Wallet" | "Card";

type Invoice = {
  id: string;
  period: string;
  issued: string;
  due: string;
  amount: number;
  status: InvoiceStatus;
  method: PayMethod;
  items: number;
  summary: string;
};

const INVOICES: Invoice[] = [
  { id: "INV-2026-07-0421", period: "Jul 2026", issued: "1 Jul 2026", due: "8 Jul 2026", amount: 4_730_000, status: "unpaid", method: "VA BCA", items: 3, summary: "Bare Metal Ryzen 9 · VPS 8vCPU ×2" },
  { id: "INV-2026-06-0389", period: "Jun 2026", issued: "1 Jun 2026", due: "8 Jun 2026", amount: 4_120_000, status: "paid", method: "QRIS", items: 4, summary: "Renewal 4 layanan aktif" },
  { id: "INV-2026-06-0361", period: "Jun 2026", issued: "18 Jun 2026", due: "25 Jun 2026", amount: 675_000, status: "paid", method: "Wallet", items: 1, summary: "Residential Proxy Pool 25 IPs" },
  { id: "INV-2026-05-0298", period: "May 2026", issued: "1 May 2026", due: "8 May 2026", amount: 3_890_000, status: "paid", method: "VA Mandiri", items: 3, summary: "Bundle VPS + Object Storage" },
  { id: "INV-2026-05-0271", period: "May 2026", issued: "12 May 2026", due: "19 May 2026", amount: 245_000, status: "overdue", method: "VA BCA", items: 1, summary: "Object Storage 500GB" },
  { id: "INV-2026-04-0217", period: "Apr 2026", issued: "1 Apr 2026", due: "8 Apr 2026", amount: 5_890_000, status: "paid", method: "Card", items: 2, summary: "GPU RTX A5000 · setup fee" },
  { id: "INV-2026-04-0198", period: "Apr 2026", issued: "22 Apr 2026", due: "29 Apr 2026", amount: 890_000, status: "refunded", method: "QRIS", items: 1, summary: "Datacenter Proxy 100 IPs" },
  { id: "INV-2026-07-DRAFT", period: "Jul 2026", issued: "—", due: "—", amount: 1_180_000, status: "draft", method: "QRIS", items: 2, summary: "Add-on backup & snapshot" },
];

const STATUS_FILTERS: { key: InvoiceStatus | "all"; label: string }[] = [
  { key: "all", label: "Semua" },
  { key: "unpaid", label: "Belum dibayar" },
  { key: "overdue", label: "Jatuh tempo" },
  { key: "paid", label: "Lunas" },
  { key: "refunded", label: "Refund" },
  { key: "draft", label: "Draft" },
];

function InvoicesPage() {
  const [status, setStatus] = useState<InvoiceStatus | "all">("all");
  const [method, setMethod] = useState<PayMethod | "all">("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(
    () =>
      INVOICES.filter((i) => {
        if (status !== "all" && i.status !== status) return false;
        if (method !== "all" && i.method !== method) return false;
        if (q && !`${i.id} ${i.summary} ${i.period}`.toLowerCase().includes(q.toLowerCase())) return false;
        return true;
      }),
    [status, method, q],
  );

  const totals = useMemo(() => {
    const outstanding = INVOICES.filter((i) => i.status === "unpaid" || i.status === "overdue").reduce((n, i) => n + i.amount, 0);
    const paidYtd = INVOICES.filter((i) => i.status === "paid").reduce((n, i) => n + i.amount, 0);
    const overdue = INVOICES.filter((i) => i.status === "overdue").length;
    const nextDue = INVOICES.find((i) => i.status === "unpaid");
    return { outstanding, paidYtd, overdue, nextDue };
  }, []);

  return (
    <div className="theme-light min-h-screen bg-background text-foreground">
      <div className="constellation pointer-events-none fixed inset-0 opacity-40" aria-hidden />
      <div className="radial-glow pointer-events-none fixed left-1/3 top-0 h-[600px] w-[900px] -translate-x-1/2" aria-hidden />

      <div className="relative flex">
        <Sidebar activeLabel="Billing & Invoices" />
        <main className="min-w-0 flex-1">
          <Topbar />
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
            <PageHeader count={INVOICES.length} />
            <StatsRow {...totals} />
            <NextDueBanner invoice={totals.nextDue} />
            <FilterBar
              status={status}
              setStatus={setStatus}
              method={method}
              setMethod={setMethod}
              q={q}
              setQ={setQ}
              resultCount={filtered.length}
            />
            <InvoicesTable invoices={filtered} />
            <InvoicesMobile invoices={filtered} />
            <EmptyOrFooter count={filtered.length} />
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
          <Receipt className="h-3 w-3" strokeWidth={2} /> Billing & Invoices
        </div>
        <h1 className="mt-4 text-2xl font-bold leading-[1.1] tracking-tight sm:text-3xl md:text-4xl">
          Tagihan & invoice Anda
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
          Pantau {count} invoice dari seluruh layanan NodeKPT, unduh PDF, dan bayar tepat waktu tanpa telat.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent">
          <Printer className="h-4 w-4" /> Cetak
        </button>
        <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent">
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>
    </div>
  );
}

/* ---------------- STATS ---------------- */
function StatsRow({
  outstanding,
  paidYtd,
  overdue,
  nextDue,
}: {
  outstanding: number;
  paidYtd: number;
  overdue: number;
  nextDue?: Invoice;
}) {
  const items = [
    { icon: Wallet, label: "Total tagihan aktif", value: rupiah(outstanding), tint: "#f59e0b", chip: "Harus dibayar" },
    { icon: CheckCircle2, label: "Sudah dibayar (YTD)", value: rupiah(paidYtd), tint: "#10b981", chip: "Tahun 2026" },
    { icon: AlertTriangle, label: "Jatuh tempo", value: String(overdue), tint: "#ef4444", chip: overdue ? "Segera bayar" : "Aman" },
    { icon: CalendarDays, label: "Tagihan berikutnya", value: nextDue ? nextDue.due : "—", tint: "var(--accent)", chip: nextDue ? rupiah(nextDue.amount) : "Tidak ada" },
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

/* ---------------- NEXT DUE BANNER ---------------- */
function NextDueBanner({ invoice }: { invoice?: Invoice }) {
  if (!invoice) return null;
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-[color:var(--accent)]/25 bg-gradient-to-br from-[color:var(--accent-tint)] via-card to-card p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[color:var(--accent)] text-white shadow-md">
            <Sparkles className="h-6 w-6" strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-strong)]">Tagihan aktif</div>
            <div className="mt-1 text-lg font-bold text-foreground sm:text-xl">{rupiah(invoice.amount)} · jatuh tempo {invoice.due}</div>
            <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{invoice.id} · {invoice.summary}</div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-background">
            <QrCode className="h-4 w-4" /> QRIS
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-background">
            <Landmark className="h-4 w-4" /> Virtual Account
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-[color:var(--accent)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90">
            <Banknote className="h-4 w-4" /> Bayar sekarang
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- FILTER BAR ---------------- */
const METHOD_FILTERS: (PayMethod | "all")[] = ["all", "QRIS", "VA BCA", "VA Mandiri", "Wallet", "Card"];

function FilterBar({
  status, setStatus, method, setMethod, q, setQ, resultCount,
}: {
  status: InvoiceStatus | "all";
  setStatus: (s: InvoiceStatus | "all") => void;
  method: PayMethod | "all";
  setMethod: (m: PayMethod | "all") => void;
  q: string;
  setQ: (v: string) => void;
  resultCount: number;
}) {
  return (
    <div className="mt-6 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {STATUS_FILTERS.map((f) => {
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
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari nomor invoice atau periode"
            className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-[color:var(--accent)]/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]/20 sm:w-72"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            <Filter className="h-3.5 w-3.5" /> Metode
          </span>
          {METHOD_FILTERS.map((m) => {
            const active = method === m;
            return (
              <button
                key={m}
                onClick={() => setMethod(m)}
                className={`whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "border-[color:var(--accent)]/40 bg-[color:var(--accent-tint)] text-[color:var(--accent-strong)]"
                    : "border-border bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                {m === "all" ? "Semua metode" : m}
              </button>
            );
          })}
        </div>
        <div className="text-xs text-muted-foreground">
          Menampilkan <span className="font-semibold text-foreground">{resultCount}</span> invoice
        </div>
      </div>
    </div>
  );
}

/* ---------------- DESKTOP TABLE ---------------- */
function InvoicesTable({ invoices }: { invoices: Invoice[] }) {
  return (
    <div className="mt-6 hidden overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:block">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-background/60">
            <tr className="border-b border-border text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-3">Invoice</th>
              <th className="px-5 py-3">Periode</th>
              <th className="px-5 py-3">Jatuh tempo</th>
              <th className="px-5 py-3">Metode</th>
              <th className="px-5 py-3 text-right">Total</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((i) => (
              <tr key={i.id} className="group border-b border-border/60 transition-colors last:border-0 hover:bg-[color:var(--accent-tint)]/40">
                <td className="px-5 py-4">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[color:var(--accent-tint)] text-[color:var(--accent-strong)]">
                      <FileText className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-[11px] font-semibold text-[color:var(--accent-strong)]">{i.id}</div>
                      <div className="mt-0.5 truncate text-sm font-medium text-foreground">{i.summary}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground">{i.items} item · terbit {i.issued}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-foreground whitespace-nowrap">{i.period}</td>
                <td className="px-5 py-4 text-sm text-muted-foreground whitespace-nowrap">{i.due}</td>
                <td className="px-5 py-4"><MethodPill method={i.method} /></td>
                <td className="px-5 py-4 text-right font-semibold text-foreground whitespace-nowrap">{rupiah(i.amount)}</td>
                <td className="px-5 py-4"><StatusBadge status={i.status} /></td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <IconAction label="Unduh PDF"><Download className="h-4 w-4" /></IconAction>
                    <IconAction label="Kirim ke email"><Send className="h-4 w-4" /></IconAction>
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
function InvoicesMobile({ invoices }: { invoices: Invoice[] }) {
  return (
    <div className="mt-6 grid gap-3 md:hidden">
      {invoices.map((i) => (
        <div key={i.id} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[color:var(--accent-tint)] text-[color:var(--accent-strong)]">
              <FileText className="h-5 w-5" strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] font-semibold text-[color:var(--accent-strong)]">{i.id}</span>
                <StatusBadge status={i.status} />
              </div>
              <div className="mt-1 truncate text-sm font-semibold text-foreground">{i.summary}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">Periode {i.period} · {i.items} item</div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 border-t border-border pt-3">
            <div>
              <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Jatuh tempo</div>
              <div className="mt-0.5 text-sm font-semibold text-foreground">{i.due}</div>
              <div className="mt-0.5"><MethodPill method={i.method} /></div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Total</div>
              <div className="mt-0.5 text-base font-bold text-foreground">{rupiah(i.amount)}</div>
              <button className="mt-1 inline-flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent">
                <Download className="h-3.5 w-3.5" /> PDF
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- EMPTY / FOOTER ---------------- */
function EmptyOrFooter({ count }: { count: number }) {
  if (count === 0) {
    return (
      <div className="mt-6 grid place-items-center rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[color:var(--accent-tint)] text-[color:var(--accent-strong)]">
          <Receipt className="h-7 w-7" strokeWidth={1.8} />
        </div>
        <h3 className="mt-4 text-lg font-bold text-foreground">Tidak ada invoice yang cocok</h3>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">Coba ganti filter status atau metode pembayaran. Semua invoice Anda tetap aman tersimpan.</p>
        <Link to="/orders" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[color:var(--accent)] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90">
          Lihat pesanan <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }
  return (
    <div className="mt-6 flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3 text-xs text-muted-foreground shadow-sm">
      <div className="inline-flex items-center gap-2"><RefreshCw className="h-3.5 w-3.5" /> Sinkron otomatis dari sistem billing</div>
      <button className="inline-flex items-center gap-1 font-semibold text-[color:var(--accent-strong)] hover:opacity-80">
        Lihat arsip invoice lama <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

/* ---------------- HELPERS ---------------- */
function MethodPill({ method }: { method: PayMethod }) {
  const map: Record<PayMethod, { icon: typeof QrCode; color: string }> = {
    QRIS: { icon: QrCode, color: "#8b5cf6" },
    "VA BCA": { icon: Landmark, color: "#0ea5e9" },
    "VA Mandiri": { icon: Landmark, color: "#f59e0b" },
    Wallet: { icon: Wallet, color: "#10b981" },
    Card: { icon: CreditCard, color: "var(--accent)" },
  };
  const { icon: Icon, color } = map[method];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-0.5 text-xs font-medium text-foreground">
      <Icon className="h-3.5 w-3.5" style={{ color }} strokeWidth={2} />
      {method}
    </span>
  );
}

function StatusBadge({ status }: { status: InvoiceStatus }) {
  const map: Record<InvoiceStatus, { label: string; color: string; bg: string; icon: typeof CheckCircle2 }> = {
    paid: { label: "Lunas", color: "#059669", bg: "#10b98118", icon: CheckCircle2 },
    unpaid: { label: "Belum dibayar", color: "#b45309", bg: "#f59e0b22", icon: Clock },
    overdue: { label: "Jatuh tempo", color: "#b91c1c", bg: "#ef444418", icon: AlertTriangle },
    draft: { label: "Draft", color: "#475569", bg: "#94a3b822", icon: FileText },
    refunded: { label: "Refund", color: "#7c3aed", bg: "#8b5cf618", icon: TrendingUp },
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
