import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Check,
  ChevronRight,
  Clock,
  Copy,
  CreditCard,
  Download,
  Gift,
  Landmark,
  Package as PackageIcon,
  Plus,
  QrCode,
  Receipt,
  RefreshCw,
  Shield,
  ShoppingCart,
  Sparkles,
  Sparkle,
  Trash2,
  TrendingUp,
  Wallet as WalletIcon,
  Wallet2,
  Zap,
} from "lucide-react";
import { Sidebar, Topbar } from "./dashboard";
import { useCart, type CartItem } from "@/hooks/useCart";


export const Route = createFileRoute("/wallet")({
  head: () => ({
    meta: [
      { title: "Wallet & Balance — NodeKPT" },
      {
        name: "description",
        content:
          "Top up your NodeKPT balance, view spending analytics, transaction history, and manage payment methods. Pay in IDR via QRIS, VA, and iPaymu.",
      },
    ],
  }),
  component: WalletPage,
});

function WalletPage() {
  return (
    <div className="theme-light min-h-screen bg-background text-foreground">
      <div className="constellation pointer-events-none fixed inset-0 opacity-40" aria-hidden />
      <div className="radial-glow pointer-events-none fixed left-1/3 top-0 h-[600px] w-[900px] -translate-x-1/2" aria-hidden />

      <div className="relative flex">
        <Sidebar activeLabel="Wallet & Balance" />
        <main className="min-w-0 flex-1">
          <Topbar />
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
            <PageHeader />
            <BalanceHero />
            <StatsRow />
            <div className="mt-6 grid gap-6 lg:grid-cols-5">
              <TopUpCard />
              <SpendingBreakdown />
            </div>
            <TransactionHistory />
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <PaymentMethods />
              <RewardsCard />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ---------------- PAGE HEADER ---------------- */
function PageHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--accent)]/25 bg-[color:var(--accent-tint)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-strong)]">
          <WalletIcon className="h-3 w-3" strokeWidth={2} /> Wallet & Balance
        </div>
        <h1 className="mt-4 text-2xl font-bold leading-[1.1] tracking-tight sm:text-3xl md:text-4xl">
          Balance &{" "}
          <span className="italic text-[color:var(--accent-strong)]">Wallet</span>
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Top up your balance, review spending stats, and manage every payment method — all in one clean, secure hub.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button className="btn-secondary text-xs">
          <Download className="h-3.5 w-3.5" strokeWidth={2} /> Export CSV
        </button>
        <button className="btn-secondary text-xs">
          <Receipt className="h-3.5 w-3.5" strokeWidth={2} /> View invoices
        </button>
        <button className="btn-primary text-xs">
          <Plus className="h-3.5 w-3.5" strokeWidth={2.5} /> Top-up now
        </button>
      </div>
    </div>
  );
}

/* ---------------- BALANCE HERO ---------------- */
function BalanceHero() {
  return (
    <div className="mt-6 grid gap-4 lg:grid-cols-3">
      {/* Main balance card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[color:var(--accent-strong)] via-[color:var(--accent)] to-[color:var(--accent-soft)] p-6 text-white shadow-[0_20px_60px_-20px_rgba(13,148,136,0.55)] sm:p-8 lg:col-span-2">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-black/10 blur-3xl"
          aria-hidden
        />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/25 bg-white/15 backdrop-blur">
              <Wallet2 className="h-5 w-5" strokeWidth={2} />
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/75">
                Available Balance
              </div>
              <div className="mt-0.5 text-xs text-white/70">NodeKPT Wallet · IDR</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur">
              <Shield className="h-3 w-3" strokeWidth={2.25} /> Verified
            </span>
            <button className="grid h-8 w-8 place-items-center rounded-lg border border-white/25 bg-white/10 backdrop-blur transition-colors hover:bg-white/20">
              <RefreshCw className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          </div>
        </div>

        <div className="relative mt-8">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-semibold text-white/80">Rp</span>
            <span className="font-serif text-6xl leading-none tracking-tight sm:text-7xl">
              1.284.500
            </span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-white/80">
            <span className="inline-flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5" strokeWidth={2} />
              +12,4% vs. bulan lalu
            </span>
            <span className="text-white/50">•</span>
            <span>Diperbarui 2 menit lalu</span>
          </div>
        </div>

        <div className="relative mt-8 flex flex-wrap gap-2">
          <button className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[color:var(--accent-strong)] shadow-lg shadow-black/10 transition-transform hover:-translate-y-0.5">
            <Plus className="h-4 w-4" strokeWidth={2.5} /> Top-up
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20">
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} /> Withdraw
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20">
            <ArrowDownLeft className="h-4 w-4" strokeWidth={2} /> Transfer
          </button>
        </div>
      </div>

      {/* Side quick actions */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
        <QuickStat
          icon={Gift}
          label="Bonus & Refund"
          value="Rp 45.000"
          hint="Aktif hingga 31 Des"
          tone="soft"
        />
        <QuickStat
          icon={Clock}
          label="Pending Top-up"
          value="Rp 250.000"
          hint="1 transaksi menunggu"
          tone="warn"
        />
      </div>
    </div>
  );
}

function QuickStat({
  icon: Icon,
  label,
  value,
  hint,
  tone = "soft",
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  hint: string;
  tone?: "soft" | "warn";
}) {
  const dot =
    tone === "warn"
      ? "bg-amber-500"
      : "bg-[color:var(--accent)]";
  return (
    <div className="card-surface flex flex-col justify-between gap-3 p-5">
      <div className="flex items-center justify-between">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-[color:var(--accent-tint)] text-[color:var(--accent-strong)]">
          <Icon className="h-4 w-4" strokeWidth={2} />
        </div>
        <span className={`h-2 w-2 rounded-full ${dot}`} />
      </div>
      <div>
        <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </div>
        <div className="mt-1 font-serif text-2xl leading-none tracking-tight text-foreground">
          {value}
        </div>
        <div className="mt-1.5 text-[11px] text-muted-foreground">{hint}</div>
      </div>
    </div>
  );
}

/* ---------------- STATS ROW ---------------- */
function StatsRow() {
  const stats = [
    { label: "Total Top-up", value: "Rp 4.850.000", delta: "+18%", icon: ArrowDownLeft, tone: "up" },
    { label: "Total Spent", value: "Rp 3.565.500", delta: "+7%", icon: ShoppingCart, tone: "down" },
    { label: "Rata-rata / bulan", value: "Rp 620.000", delta: "-3%", icon: TrendingUp, tone: "flat" },
    { label: "Transaksi", value: "37", delta: "+4 minggu ini", icon: Receipt, tone: "up" },
  ];
  return (
    <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="card-interactive p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-[color:var(--accent-tint)] text-[color:var(--accent-strong)]">
              <s.icon className="h-4 w-4" strokeWidth={2} />
            </div>
            <span
              className={`text-[10px] font-semibold uppercase tracking-wide ${
                s.tone === "up"
                  ? "text-emerald-600"
                  : s.tone === "down"
                    ? "text-rose-500"
                    : "text-muted-foreground"
              }`}
            >
              {s.delta}
            </span>
          </div>
          <div className="mt-3 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {s.label}
          </div>
          <div className="mt-1 font-serif text-2xl leading-none tracking-tight text-foreground sm:text-[26px]">
            {s.value}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- TOP UP CARD ---------------- */
const PRESETS = [20000, 50000, 100000, 250000, 500000, 1000000];
const METHODS = [
  { id: "ipaymu", label: "iPaymu", desc: "QRIS, VA, e-Wallet", icon: QrCode, badge: "Recommended" },
  { id: "va", label: "Virtual Account", desc: "BCA, Mandiri, BNI", icon: Landmark },
  { id: "card", label: "Kartu Kredit", desc: "Visa, Mastercard", icon: CreditCard },
];

function TopUpCard() {
  const [amount, setAmount] = useState<number>(50000);
  const [method, setMethod] = useState("ipaymu");

  const format = (n: number) => "Rp " + n.toLocaleString("id-ID");
  const fee = Math.round(amount * 0.005);
  const total = amount + fee;

  return (
    <section className="card-surface p-6 lg:col-span-3">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--accent-tint)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[color:var(--accent-strong)]">
            <Zap className="h-3 w-3" strokeWidth={2.5} /> Top-up instan
          </div>
          <h2 className="mt-3 text-xl font-bold tracking-tight">Top-up Balance</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Isi saldo untuk beli lebih cepat tanpa biaya gateway di tiap transaksi.
          </p>
        </div>
        <div className="hidden text-right sm:block">
          <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Estimasi total</div>
          <div className="font-serif text-2xl leading-none text-[color:var(--accent-strong)]">
            {format(total)}
          </div>
          <div className="mt-1 text-[10px] text-muted-foreground">termasuk fee 0,5%</div>
        </div>
      </div>

      {/* Amount input */}
      <div className="mt-6">
        <label className="text-xs font-semibold text-foreground">Jumlah (Rp)</label>
        <div className="mt-2 flex items-center rounded-xl border border-border bg-card px-4 py-3 focus-within:border-[color:var(--accent)] focus-within:ring-2 focus-within:ring-[color:var(--accent-ring)]">
          <span className="mr-2 text-sm font-semibold text-muted-foreground">Rp</span>
          <input
            type="number"
            value={amount}
            min={10000}
            onChange={(e) => setAmount(Math.max(0, Number(e.target.value) || 0))}
            className="w-full bg-transparent text-lg font-semibold tracking-tight text-foreground outline-none placeholder:text-muted-foreground/50"
          />
          <button
            onClick={() => setAmount(0)}
            className="ml-2 text-[11px] font-medium text-muted-foreground hover:text-foreground"
          >
            Clear
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {PRESETS.map((p) => {
            const active = amount === p;
            return (
              <button
                key={p}
                onClick={() => setAmount(p)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  active
                    ? "border-[color:var(--accent)] bg-[color:var(--accent-tint)] text-[color:var(--accent-strong)]"
                    : "border-border bg-card text-foreground hover:border-[color:var(--accent)]/40 hover:bg-[color:var(--accent-tint)]/60"
                }`}
              >
                {format(p)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Payment method */}
      <div className="mt-6">
        <label className="text-xs font-semibold text-foreground">Metode pembayaran</label>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {METHODS.map((m) => {
            const active = method === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`relative rounded-xl border p-3 text-left transition-colors ${
                  active
                    ? "border-[color:var(--accent)] bg-[color:var(--accent-tint)]"
                    : "border-border bg-card hover:border-[color:var(--accent)]/40"
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
                      active
                        ? "bg-[color:var(--accent)] text-white"
                        : "bg-[color:var(--accent-tint)] text-[color:var(--accent-strong)]"
                    }`}
                  >
                    <m.icon className="h-4 w-4" strokeWidth={2} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold text-foreground">{m.label}</span>
                      {m.badge && (
                        <span className="rounded-full bg-[color:var(--accent)]/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[color:var(--accent-strong)]">
                          {m.badge}
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">{m.desc}</div>
                  </div>
                  {active && (
                    <Check className="h-4 w-4 text-[color:var(--accent-strong)]" strokeWidth={2.5} />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 rounded-xl border border-dashed border-border bg-[color:var(--card-muted)] p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Nominal</span>
          <span className="font-semibold text-foreground">{format(amount)}</span>
        </div>
        <div className="mt-1.5 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Biaya gateway (0,5%)</span>
          <span className="font-semibold text-foreground">{format(fee)}</span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm">
          <span className="font-semibold text-foreground">Total bayar</span>
          <span className="font-serif text-xl text-[color:var(--accent-strong)]">
            {format(total)}
          </span>
        </div>
      </div>

      <button className="btn-primary mt-5 w-full text-sm">
        <Plus className="h-4 w-4" strokeWidth={2.5} /> Top-up Sekarang
      </button>
      <p className="mt-3 text-center text-[11px] text-muted-foreground">
        Anda akan diarahkan ke halaman pembayaran. Saldo bertambah otomatis setelah pembayaran dikonfirmasi.
      </p>
    </section>
  );
}

/* ---------------- SPENDING BREAKDOWN ---------------- */
function SpendingBreakdown() {
  const items = [
    { label: "VPS & Compute", value: 1650000, color: "bg-[color:var(--accent)]" },
    { label: "Bare Metal", value: 920000, color: "bg-emerald-500" },
    { label: "Object Storage", value: 385000, color: "bg-sky-500" },
    { label: "Bandwidth & IP", value: 210000, color: "bg-violet-500" },
    { label: "Lainnya", value: 400500, color: "bg-amber-500" },
  ];
  const total = items.reduce((s, i) => s + i.value, 0);
  const format = (n: number) => "Rp " + n.toLocaleString("id-ID");

  return (
    <section className="card-surface p-6 lg:col-span-2">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight">Spending Breakdown</h2>
          <p className="mt-1 text-xs text-muted-foreground">30 hari terakhir</p>
        </div>
        <button className="btn-ghost text-xs">
          <RefreshCw className="h-3.5 w-3.5" strokeWidth={2} /> Refresh
        </button>
      </div>

      {/* Stacked bar */}
      <div className="mt-5 flex h-3 w-full overflow-hidden rounded-full bg-[color:var(--card-muted)]">
        {items.map((i) => (
          <div
            key={i.label}
            className={i.color}
            style={{ width: `${(i.value / total) * 100}%` }}
            title={i.label}
          />
        ))}
      </div>
      <div className="mt-2 flex items-baseline justify-between">
        <span className="text-[11px] text-muted-foreground">Total pengeluaran</span>
        <span className="font-serif text-xl text-foreground">{format(total)}</span>
      </div>

      {/* Legend */}
      <ul className="mt-5 space-y-3">
        {items.map((i) => {
          const pct = ((i.value / total) * 100).toFixed(1);
          return (
            <li key={i.label} className="flex items-center gap-3">
              <span className={`h-2.5 w-2.5 shrink-0 rounded-sm ${i.color}`} />
              <span className="flex-1 truncate text-sm text-foreground">{i.label}</span>
              <span className="text-xs text-muted-foreground">{pct}%</span>
              <span className="w-28 text-right text-sm font-semibold text-foreground">
                {format(i.value)}
              </span>
            </li>
          );
        })}
      </ul>

      <button className="mt-6 flex w-full items-center justify-center gap-1 rounded-lg border border-border bg-card py-2 text-xs font-semibold text-foreground transition-colors hover:border-[color:var(--accent)]/40 hover:bg-[color:var(--accent-tint)]/50">
        Lihat laporan lengkap <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
      </button>
    </section>
  );
}

/* ---------------- TRANSACTIONS ---------------- */
type Tx = {
  id: string;
  type: "topup" | "spend" | "refund";
  title: string;
  method: string;
  amount: number;
  status: "success" | "pending" | "failed";
  date: string;
};
const TX: Tx[] = [
  { id: "TRX-0921", type: "topup", title: "Top-up saldo via iPaymu", method: "QRIS", amount: 500000, status: "success", date: "2 Jul 2026, 10:24" },
  { id: "TRX-0920", type: "spend", title: "VPS · Node-4 (Singapore)", method: "Wallet", amount: -185000, status: "success", date: "1 Jul 2026, 22:10" },
  { id: "TRX-0919", type: "refund", title: "Refund order #4821", method: "Wallet", amount: 45000, status: "success", date: "30 Jun 2026, 09:48" },
  { id: "TRX-0918", type: "topup", title: "Top-up saldo via VA BCA", method: "VA BCA", amount: 250000, status: "pending", date: "30 Jun 2026, 08:15" },
  { id: "TRX-0917", type: "spend", title: "Bare Metal · Ryzen 9 Rig", method: "Wallet", amount: -1250000, status: "success", date: "28 Jun 2026, 14:02" },
  { id: "TRX-0916", type: "spend", title: "Bandwidth top-up 500GB", method: "Wallet", amount: -75000, status: "failed", date: "27 Jun 2026, 19:31" },
];

function TransactionHistory() {
  const [filter, setFilter] = useState<"all" | Tx["type"]>("all");
  const rows = filter === "all" ? TX : TX.filter((t) => t.type === filter);
  const format = (n: number) =>
    (n < 0 ? "- Rp " : "Rp ") + Math.abs(n).toLocaleString("id-ID");
  const filters: { id: typeof filter; label: string }[] = [
    { id: "all", label: "Semua" },
    { id: "topup", label: "Top-up" },
    { id: "spend", label: "Pengeluaran" },
    { id: "refund", label: "Refund" },
  ];

  return (
    <section className="card-surface mt-6 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-5">
        <div>
          <h2 className="text-lg font-bold tracking-tight">Transaction History</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Semua aktivitas top-up, pembelian, dan refund pada wallet Anda.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1 rounded-lg border border-border bg-[color:var(--card-muted)] p-1">
          {filters.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors ${
                  active
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-[color:var(--card-muted)] text-[11px] uppercase tracking-wide text-muted-foreground">
              <th className="px-5 py-3 text-left font-semibold">Transaksi</th>
              <th className="px-5 py-3 text-left font-semibold">Metode</th>
              <th className="px-5 py-3 text-left font-semibold">Tanggal</th>
              <th className="px-5 py-3 text-left font-semibold">Status</th>
              <th className="px-5 py-3 text-right font-semibold">Nominal</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => (
              <tr key={t.id} className="border-b border-border last:border-0 transition-colors hover:bg-[color:var(--accent-tint)]/40">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <TypeIcon type={t.type} />
                    <div>
                      <div className="font-semibold text-foreground">{t.title}</div>
                      <div className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                        <span>{t.id}</span>
                        <button className="grid h-4 w-4 place-items-center rounded hover:bg-foreground/5">
                          <Copy className="h-2.5 w-2.5" strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-muted-foreground">{t.method}</td>
                <td className="px-5 py-4 text-muted-foreground">{t.date}</td>
                <td className="px-5 py-4">
                  <StatusPill status={t.status} />
                </td>
                <td
                  className={`px-5 py-4 text-right font-serif text-base ${
                    t.amount < 0 ? "text-foreground" : "text-emerald-600"
                  }`}
                >
                  {format(t.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile list */}
      <ul className="divide-y divide-border md:hidden">
        {rows.map((t) => (
          <li key={t.id} className="flex items-center gap-3 p-4">
            <TypeIcon type={t.type} />
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-foreground">{t.title}</div>
              <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                <span>{t.date}</span>
                <StatusPill status={t.status} compact />
              </div>
            </div>
            <div
              className={`shrink-0 font-serif text-sm ${
                t.amount < 0 ? "text-foreground" : "text-emerald-600"
              }`}
            >
              {format(t.amount)}
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between border-t border-border p-4 text-xs text-muted-foreground">
        <span>
          Menampilkan {rows.length} dari {TX.length} transaksi
        </span>
        <button className="btn-ghost text-xs">
          Lihat semua <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}

function TypeIcon({ type }: { type: Tx["type"] }) {
  const map = {
    topup: { icon: ArrowDownLeft, cls: "bg-emerald-500/10 text-emerald-600" },
    spend: { icon: ShoppingCart, cls: "bg-rose-500/10 text-rose-500" },
    refund: { icon: Gift, cls: "bg-[color:var(--accent-tint)] text-[color:var(--accent-strong)]" },
  } as const;
  const { icon: Icon, cls } = map[type];
  return (
    <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${cls}`}>
      <Icon className="h-4 w-4" strokeWidth={2} />
    </div>
  );
}

function StatusPill({
  status,
  compact,
}: {
  status: Tx["status"];
  compact?: boolean;
}) {
  const map = {
    success: { label: "Berhasil", cls: "bg-emerald-500/10 text-emerald-600 border-emerald-500/25" },
    pending: { label: "Menunggu", cls: "bg-amber-500/10 text-amber-600 border-amber-500/30" },
    failed: { label: "Gagal", cls: "bg-rose-500/10 text-rose-500 border-rose-500/25" },
  };
  const s = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${s.cls} ${
        compact ? "" : ""
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {s.label}
    </span>
  );
}

/* ---------------- PAYMENT METHODS ---------------- */
function PaymentMethods() {
  const methods = [
    { id: 1, brand: "iPaymu", desc: "QRIS · VA · e-Wallet", primary: true, icon: QrCode },
    { id: 2, brand: "BCA Virtual Account", desc: "•••• 8231", primary: false, icon: Landmark },
    { id: 3, brand: "Visa •••• 4429", desc: "Exp 08/28", primary: false, icon: CreditCard },
  ];
  return (
    <section className="card-surface p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight">Metode Pembayaran</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Kelola metode pembayaran yang terhubung ke wallet Anda.
          </p>
        </div>
        <button className="btn-secondary text-xs">
          <Plus className="h-3.5 w-3.5" strokeWidth={2.5} /> Tambah
        </button>
      </div>

      <ul className="mt-5 space-y-2.5">
        {methods.map((m) => (
          <li
            key={m.id}
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:border-[color:var(--accent)]/40"
          >
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-[color:var(--accent-tint)] text-[color:var(--accent-strong)]">
              <m.icon className="h-4 w-4" strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate text-sm font-semibold text-foreground">{m.brand}</span>
                {m.primary && (
                  <span className="rounded-full bg-[color:var(--accent)]/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[color:var(--accent-strong)]">
                    Primary
                  </span>
                )}
              </div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">{m.desc}</div>
            </div>
            <button className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground">
              Kelola
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-5 rounded-xl border border-[color:var(--accent)]/20 bg-[color:var(--accent-tint)]/60 p-4">
        <div className="flex items-start gap-3">
          <Shield className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--accent-strong)]" strokeWidth={2} />
          <div>
            <div className="text-xs font-semibold text-foreground">
              Semua pembayaran dienkripsi & PCI-DSS compliant
            </div>
            <div className="mt-0.5 text-[11px] text-muted-foreground">
              NodeKPT tidak menyimpan data kartu Anda. Semua diproses lewat gateway tersertifikasi.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- REWARDS ---------------- */
function RewardsCard() {
  return (
    <section className="card-feature relative overflow-hidden p-6">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[color:var(--accent)]/10 blur-3xl"
        aria-hidden
      />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--accent-tint)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[color:var(--accent-strong)]">
            <Sparkles className="h-3 w-3" strokeWidth={2.5} /> Rewards
          </div>
          <h2 className="mt-3 text-lg font-bold tracking-tight">
            Kumpulkan bonus, hemat lebih banyak
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Setiap top-up ≥ Rp 500.000 dapat cashback 2% ke saldo bonus Anda.
          </p>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-[color:var(--accent-soft)] to-[color:var(--accent-strong)] text-white shadow-lg">
          <Gift className="h-5 w-5" strokeWidth={2} />
        </div>
      </div>

      <div className="relative mt-5 rounded-xl border border-border bg-card p-4">
        <div className="flex items-baseline justify-between">
          <span className="text-[11px] uppercase tracking-wide text-muted-foreground">Progress ke reward berikutnya</span>
          <span className="font-serif text-lg text-[color:var(--accent-strong)]">72%</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[color:var(--card-muted)]">
          <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-[color:var(--accent-soft)] to-[color:var(--accent-strong)]" />
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Rp 3.6jt terkumpul</span>
          <span>Target Rp 5jt</span>
        </div>
      </div>

      <div className="relative mt-4 grid grid-cols-2 gap-3">
        <button className="btn-primary text-xs">
          <Gift className="h-3.5 w-3.5" strokeWidth={2.5} /> Klaim bonus
        </button>
        <button className="btn-secondary text-xs">
          <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} /> Program referral
        </button>
      </div>
    </section>
  );
}
