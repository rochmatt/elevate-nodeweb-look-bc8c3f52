import { createFileRoute } from "@tanstack/react-router";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Flame,
  Gauge,
  HardDrive,
  Layers,
  MapPin,
  MemoryStick,
  Network,
  Plug,
  Radio,
  RotateCcw,
  Search,
  Server,
  Shield,
  ShieldCheck,
  Sliders,
  Sparkles,
  
  Thermometer,
  Timer,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import { Sidebar, Topbar } from "./dashboard";

const CPU_FILTERS = ["All", "Intel", "AMD", "GPU", "Unmetered"] as const;
const REGION_FILTERS = ["All", "FRA-3", "AMS-2", "SIN-1", "TYO-1", "NYC-1", "SFO-1"] as const;
const RAM_FILTERS = ["All", "64", "128", "256", "512"] as const;
const PAGE_SIZE = 4;

const filterSchema = z.object({
  cpu: fallback(z.enum(CPU_FILTERS), "All").default("All"),
  region: fallback(z.enum(REGION_FILTERS), "All").default("All"),
  ram: fallback(z.enum(RAM_FILTERS), "All").default("All"),
  q: fallback(z.string(), "").default(""),
  page: fallback(z.number().int().min(1), 1).default(1),
});

export const Route = createFileRoute("/bare-metal")({
  validateSearch: zodValidator(filterSchema),
  head: () => ({
    meta: [
      { title: "Bare Metal — NodeKPT · Dedicated Hardware, Hourly or Monthly" },
      {
        name: "description",
        content:
          "Realtime dedicated servers in 12 datacenters. Configure your rig, deploy in ~90s, pay in IDR per hour or per month. Full root, IPMI, unmetered traffic.",
      },
    ],
  }),
  component: BareMetalPage,
});

function BareMetalPage() {
  return (
    <div className="theme-light min-h-screen bg-background text-foreground">
      <div className="constellation pointer-events-none fixed inset-0 opacity-40" aria-hidden />
      <div className="radial-glow pointer-events-none fixed left-1/3 top-0 h-[600px] w-[900px] -translate-x-1/2" aria-hidden />

      <div className="relative flex">
        <Sidebar activeLabel="Bare Metal Servers" />
        <main className="min-w-0 flex-1">
          <Topbar />
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
            <Hero />
            <LiveTicker />
            <Configurator />
            <FeaturedRigs />
            <DatacenterStrip />
            <InventoryHeader />
            <ServerTable />
            <ComparisonStrip />
            <FooterCTA />
          </div>
        </main>
      </div>
    </div>
  );
}

/* ============== HERO ============== */
function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-foreground/[0.04] via-card to-[color:var(--accent-tint)]/40 p-6 sm:p-8 lg:p-10">
      {/* decorative grid */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full text-[color:var(--accent)]/10"
      >
        <defs>
          <pattern id="bmgrid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0V32" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bmgrid)" />
      </svg>

      <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-deep">
            <Sparkles className="h-3 w-3" /> Realtime Dedicated Hardware
          </div>
          <h1 className="mt-4 text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
            Your own <span className="text-gold-gradient">bare metal</span>,
            <br className="hidden sm:block" /> billed by the hour.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
            No virtualization layer, no noisy neighbours. Pick a CPU, ship workloads in ~90 seconds,
            and pay in Rupiah straight from your wallet. Cancel any hour.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="#configure" className="btn-primary">
              <Sliders className="h-4 w-4" /> Configure your rig
            </a>
            <a href="#inventory" className="btn-ghost">
              <Server className="h-4 w-4 text-[color:var(--accent-strong)]" />
              Browse 218 servers
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-medium text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Full root + IPMI</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Unmetered traffic</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> DDoS protected</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> 99.95% SLA</span>
          </div>
        </div>

        {/* Mini rack visualization */}
        <div className="relative">
          <div className="rounded-2xl border border-border bg-card/80 p-4 shadow-sm backdrop-blur">
            <div className="mb-3 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                <Radio className="h-3.5 w-3.5 text-emerald-500" /> Live rack · FRA-3
              </div>
              <span className="text-[10px] text-muted-foreground">U24</span>
            </div>
            <div className="space-y-1.5">
              {RACK.map((r, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between rounded-md border px-2.5 py-1.5 text-[11px] ${
                    r.state === "you"
                      ? "border-[color:var(--accent)]/50 bg-[color:var(--accent-tint)] text-[color:var(--accent-strong)] font-semibold"
                      : r.state === "free"
                        ? "border-dashed border-emerald-500/40 bg-emerald-500/5 text-emerald-700"
                        : "border-border bg-foreground/[0.02] text-foreground/70"
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    <span className="font-mono text-[10px] text-muted-foreground">U{24 - i}</span>
                    {r.label}
                  </span>
                  <span className="font-mono text-[10px] opacity-80">{r.tag}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Thermometer className="h-3 w-3" /> 22.4°C</span>
              <span className="inline-flex items-center gap-1.5"><Zap className="h-3 w-3" /> 7.2 kW</span>
              <span className="inline-flex items-center gap-1.5"><Gauge className="h-3 w-3" /> 41% load</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const RACK = [
  { label: "EPYC 7402P · 256GB", tag: "rented", state: "rented" },
  { label: "Xeon E5-2680 · 128GB", tag: "rented", state: "rented" },
  { label: "Your reserved node", tag: "you", state: "you" },
  { label: "Ryzen 9 5950X · 128GB", tag: "free", state: "free" },
  { label: "i7-7700 · 64GB", tag: "rented", state: "rented" },
  { label: "i7-6700 · 64GB", tag: "free", state: "free" },
] as const;

/* ============== LIVE TICKER ============== */
function LiveTicker() {
  const events = [
    "FRA-3 · Ryzen 9 5950X deployed in 87s",
    "SIN-1 · 4× EPYC 7402P reserved",
    "AMS-2 · NVMe pool expanded +12TB",
    "NYC-1 · i7-7700 freed up",
    "TYO-1 · Xeon E5-2680 deployed in 92s",
    "FRA-3 · DDoS mitigated 184Gbps",
  ];
  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card/60">
      <div className="flex items-center">
        <div className="flex shrink-0 items-center gap-2 border-r border-border bg-foreground/[0.03] px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Live feed
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className="animate-[ticker_40s_linear_infinite] flex shrink-0 gap-8 whitespace-nowrap py-2 text-[11px] text-foreground/80">
            {[...events, ...events].map((e, i) => (
              <span key={i} className="inline-flex items-center gap-2">
                <ChevronRight className="h-3 w-3 text-[color:var(--accent-strong)]" />
                {e}
              </span>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

/* ============== FILTER PANEL (replaces old static configurator) ============== */
function Configurator() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const filtered = useFilteredRows();
  const isDirty =
    search.cpu !== "All" ||
    search.region !== "All" ||
    search.ram !== "All" ||
    search.q !== "" ||
    search.page !== 1;

  const cheapest = filtered.reduce<number | null>(
    (min, r) => (min === null || r.hour < min ? r.hour : min),
    null,
  );
  const anyGpu = filtered.some((r) => r.gpu);

  const set = <K extends keyof z.infer<typeof filterSchema>>(
    key: K,
    value: z.infer<typeof filterSchema>[K],
  ) =>
    navigate({
      search: (p: z.infer<typeof filterSchema>) => ({ ...p, [key]: value, page: 1 }),
      replace: true,
    });

  return (
    <section id="configure" className="mt-10">
      <SectionHeader
        eyebrow="Step 1 · Filter"
        title="Find your bare metal"
        subtitle="Dial in CPU, memory and region — inventory updates live and filters stay in your URL."
      />
      <div className="card-surface mt-5 grid gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-5">
          {/* Search */}
          <div>
            <div className="mb-2 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <Search className="h-3.5 w-3.5 text-[color:var(--accent-strong)]" strokeWidth={1.75} />
              Search
            </div>
            <div className="relative">
              <input
                value={search.q}
                onChange={(e) => set("q", e.target.value)}
                placeholder="Try “Ryzen 128 GB” or “SIN-1”…"
                className="h-11 w-full rounded-xl border border-border bg-card/70 pl-4 pr-10 text-sm outline-none transition-colors focus:border-[color:var(--accent)]/40 focus:bg-card"
              />
              {search.q && (
                <button
                  type="button"
                  onClick={() => set("q", "")}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-foreground/5"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          <FilterRow
            icon={Cpu}
            label="CPU class"
            options={CPU_FILTERS}
            value={search.cpu}
            onChange={(v) => set("cpu", v)}
          />
          <FilterRow
            icon={MemoryStick}
            label="Memory (min)"
            options={RAM_FILTERS}
            value={search.ram}
            onChange={(v) => set("ram", v)}
            render={(o) => (o === "All" ? "Any" : `${o} GB`)}
          />
          <FilterRow
            icon={MapPin}
            label="Region"
            options={REGION_FILTERS}
            value={search.region}
            onChange={(v) => set("region", v)}
          />
        </div>

        {/* Live summary */}
        <div className="relative overflow-hidden rounded-2xl border border-[color:var(--accent)]/25 bg-gradient-to-b from-[color:var(--accent-tint)]/70 to-card p-5">
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[color:var(--accent)]/15 blur-2xl" />
          <div className="relative">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-strong)]">
              Live matches
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-bold leading-none tracking-tight">{filtered.length}</span>
              <span className="text-xs text-muted-foreground">of {ROWS.length} servers</span>
            </div>

            <div className="mt-4 space-y-2 text-[12px]">
              <SummaryLine
                label="Starting from"
                value={cheapest ? `Rp ${cheapest.toLocaleString("id-ID")}/hr` : "—"}
                tone="accent"
              />
              <SummaryLine label="GPU available" value={anyGpu ? "Yes" : "No"} />
              <SummaryLine
                label="Region"
                value={search.region === "All" ? "Any" : search.region}
              />
              <SummaryLine label="Provision ETA" value="~90s" />
            </div>

            <div className="mt-5 flex flex-col gap-2">
              <a href="#inventory" className="btn-primary w-full">
                <Zap className="h-4 w-4" /> Browse {filtered.length} result{filtered.length === 1 ? "" : "s"}
              </a>
              <button
                type="button"
                onClick={() =>
                  navigate({
                    search: { cpu: "All", region: "All", ram: "All", q: "", page: 1 },
                  })
                }
                disabled={!isDirty}
                className="btn-ghost w-full justify-center disabled:opacity-40"
              >
                <RotateCcw className="h-4 w-4 text-[color:var(--accent-strong)]" /> Reset filters
              </button>
            </div>

            <div className="mt-4 inline-flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <Shield className="h-3 w-3" /> Filters saved in URL · shareable
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterRow<T extends string>({
  icon: Icon,
  label,
  options,
  value,
  onChange,
  render,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  render?: (o: T) => string;
}) {
  return (
    <div>
      <div className="mb-2 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-[color:var(--accent-strong)]" strokeWidth={1.75} />
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = o === value;
          return (
            <button
              key={o}
              type="button"
              onClick={() => onChange(o)}
              className={`h-9 rounded-lg border px-3 text-[12px] font-semibold transition-all ${
                active
                  ? "border-[color:var(--accent)]/50 bg-[color:var(--accent-tint)] text-[color:var(--accent-strong)] shadow-sm"
                  : "border-border bg-card/60 text-foreground/75 hover:border-[color:var(--accent)]/30 hover:text-foreground"
              }`}
            >
              {render ? render(o) : o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SummaryLine({ label, value, tone }: { label: string; value: string; tone?: "accent" }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-1.5 last:border-b-0">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-bold tracking-tight ${tone === "accent" ? "text-[color:var(--accent-strong)]" : "text-foreground"}`}>{value}</span>
    </div>
  );
}


/* ============== FEATURED RIGS ============== */
function FeaturedRigs() {
  const rigs = [
    {
      tag: "Most popular",
      tone: "from-emerald-500/15 to-emerald-500/5 text-emerald-700 border-emerald-500/30",
      icon: Flame,
      name: "Compute Starter",
      cpu: "Intel Core i7-6700 · 4C/8T",
      ram: "64 GB DDR4",
      disk: "2× 250 GB SSD",
      hour: 1909,
      month: 1191801,
      perks: ["Free /29 IPv4", "1 Gbps uplink", "Frankfurt"],
    },
    {
      tag: "Best value",
      tone: "from-gold-soft to-gold-deep text-white border-transparent",
      icon: Sparkles,
      name: "Ryzen Workstation",
      cpu: "AMD Ryzen 9 5950X · 16C/32T",
      ram: "128 GB DDR4",
      disk: "2× 1 TB NVMe",
      hour: 4250,
      month: 2650000,
      perks: ["10 Gbps uplink", "Singapore", "Free migration"],
    },
    {
      tag: "GPU ready",
      tone: "from-violet-500/15 to-violet-500/5 text-violet-700 border-violet-500/30",
      icon: Layers,
      name: "EPYC GPU Node",
      cpu: "AMD EPYC 7402P · 24C/48T",
      ram: "256 GB DDR4 ECC",
      disk: "2× 3.84 TB NVMe",
      gpu: "NVIDIA RTX A4000",
      hour: 8990,
      month: 5390000,
      perks: ["Unmetered", "United States", "IPMI included"],
    },
  ];
  return (
    <section className="mt-10">
      <SectionHeader
        eyebrow="Step 2 · Or pick a preset"
        title="Featured rigs, ready to ship"
        subtitle="Hand-curated configurations our customers deploy the most this week."
      />
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {rigs.map((r) => (
          <div key={r.name} className="card-interactive group relative overflow-hidden p-5">
            <div className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b opacity-60 ${r.tone.includes("from-gold") ? "from-gold-soft/15" : r.tone.split(" ")[0]} to-transparent`} />
            <div className="relative">
              <div className="flex items-start justify-between gap-2">
                <div className={`inline-flex items-center gap-1.5 rounded-full border bg-gradient-to-r px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${r.tone}`}>
                  <r.icon className="h-3 w-3" /> {r.tag}
                </div>
                <span className="text-[10px] font-medium text-muted-foreground">In stock</span>
              </div>
              <h3 className="mt-4 text-lg font-bold tracking-tight">{r.name}</h3>
              <div className="mt-1 text-[12px] text-muted-foreground">{r.cpu}</div>

              <div className="mt-4 space-y-1.5 rounded-xl border border-border/60 bg-foreground/[0.02] p-3 text-[12px]">
                <Spec icon={MemoryStick} label={r.ram} />
                <Spec icon={HardDrive} label={r.disk} />
                {r.gpu && <Spec icon={Layers} label={r.gpu} />}
              </div>

              <ul className="mt-3 space-y-1 text-[11px] text-foreground/75">
                {r.perks.map((p) => (
                  <li key={p} className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-600" /> {p}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-end justify-between border-t border-border/60 pt-4">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">From</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[11px] font-semibold text-muted-foreground">Rp</span>
                    <span className="text-xl font-bold leading-none tracking-tight">{r.hour.toLocaleString("id-ID")}</span>
                    <span className="text-[11px] text-muted-foreground">/hr</span>
                  </div>
                </div>
                <button className="btn-primary !h-9 !px-3.5 !text-[12px]">
                  Deploy <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Spec({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; label: string }) {
  return (
    <div className="flex items-center gap-2 text-foreground/80">
      <Icon className="h-3.5 w-3.5 text-[color:var(--accent-strong)]" strokeWidth={1.75} />
      <span className="truncate font-medium">{label}</span>
    </div>
  );
}

/* ============== DATACENTER STRIP ============== */
function DatacenterStrip() {
  const dcs = [
    { code: "FRA-3", city: "Frankfurt", flag: "🇩🇪", latency: "12ms", load: 41 },
    { code: "AMS-2", city: "Amsterdam", flag: "🇳🇱", latency: "18ms", load: 58 },
    { code: "SIN-1", city: "Singapore", flag: "🇸🇬", latency: "8ms", load: 72 },
    { code: "TYO-1", city: "Tokyo", flag: "🇯🇵", latency: "22ms", load: 34 },
    { code: "NYC-1", city: "New York", flag: "🇺🇸", latency: "182ms", load: 49 },
    { code: "SFO-1", city: "San Francisco", flag: "🇺🇸", latency: "210ms", load: 28 },
  ];
  return (
    <section className="mt-10">
      <SectionHeader
        eyebrow="Network"
        title="12 verified datacenters"
        subtitle="Live latency from your current IP. Pick the closest region for the best experience."
      />
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {dcs.map((d) => {
          const tone = d.load > 70 ? "bg-rose-500" : d.load > 50 ? "bg-amber-500" : "bg-emerald-500";
          return (
            <div key={d.code} className="card-surface flex items-center gap-3 p-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-foreground/[0.03] text-xl">
                {d.flag}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-bold tracking-tight">{d.city}</span>
                  <span className="rounded-md bg-foreground/5 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">{d.code}</span>
                </div>
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-foreground/10">
                    <div className={`h-full ${tone}`} style={{ width: `${d.load}%` }} />
                  </div>
                  <span className="shrink-0 text-[10px] font-medium text-muted-foreground">{d.load}% used</span>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Ping</div>
                <div className="font-mono text-xs font-bold text-foreground">{d.latency}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ============== INVENTORY TABLE ============== */
function matchesCpu(r: Row, f: (typeof CPU_FILTERS)[number]) {
  if (f === "All") return true;
  if (f === "Intel") return r.cpu.includes("Intel");
  if (f === "AMD") return r.cpu.includes("AMD");
  if (f === "GPU") return Boolean(r.gpu);
  if (f === "Unmetered") return r.net.toLowerCase().includes("unmetered") || r.net.includes("25");
  return true;
}

function useFilteredRows() {
  const { cpu, region, ram, q } = Route.useSearch();
  const needle = q.trim().toLowerCase();
  return ROWS.filter((r) => {
    if (!matchesCpu(r, cpu)) return false;
    if (region !== "All" && r.region !== region) return false;
    if (ram !== "All" && !r.ram.startsWith(ram)) return false;
    if (needle) {
      const hay = `${r.cpu} ${r.ram} ${r.disk} ${r.region} ${r.net} ${r.gpu ?? ""}`.toLowerCase();
      if (!hay.includes(needle)) return false;
    }
    return true;
  });
}

function InventoryHeader() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const filtered = useFilteredRows();
  const isDirty =
    search.cpu !== "All" ||
    search.region !== "All" ||
    search.ram !== "All" ||
    search.q !== "" ||
    search.page !== 1;

  const activeChips: { key: string; label: string; onClear: () => void }[] = [];
  if (search.cpu !== "All")
    activeChips.push({
      key: "cpu",
      label: `CPU: ${search.cpu}`,
      onClear: () =>
        navigate({ search: (p: z.infer<typeof filterSchema>) => ({ ...p, cpu: "All", page: 1 }) }),
    });
  if (search.ram !== "All")
    activeChips.push({
      key: "ram",
      label: `RAM ≥ ${search.ram} GB`,
      onClear: () =>
        navigate({ search: (p: z.infer<typeof filterSchema>) => ({ ...p, ram: "All", page: 1 }) }),
    });
  if (search.region !== "All")
    activeChips.push({
      key: "region",
      label: `Region: ${search.region}`,
      onClear: () =>
        navigate({ search: (p: z.infer<typeof filterSchema>) => ({ ...p, region: "All", page: 1 }) }),
    });
  if (search.q)
    activeChips.push({
      key: "q",
      label: `“${search.q}”`,
      onClear: () =>
        navigate({ search: (p: z.infer<typeof filterSchema>) => ({ ...p, q: "", page: 1 }) }),
    });

  return (
    <section id="inventory" className="mt-12">
      <SectionHeader
        eyebrow="Step 2 · Browse inventory"
        title="Live bare metal inventory"
        subtitle={`${filtered.length} of ${ROWS.length} servers match your filters above.`}
      />
      {(activeChips.length > 0 || isDirty) && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Active
          </span>
          {activeChips.map((c) => (
            <span
              key={c.key}
              className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--accent)]/30 bg-[color:var(--accent-tint)] px-2.5 py-1 text-[11px] font-semibold text-[color:var(--accent-strong)]"
            >
              {c.label}
              <button
                type="button"
                onClick={c.onClear}
                aria-label={`Clear ${c.label}`}
                className="rounded-full p-0.5 hover:bg-[color:var(--accent)]/15"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          {isDirty && (
            <button
              type="button"
              onClick={() =>
                navigate({
                  search: { cpu: "All", region: "All", ram: "All", q: "", page: 1 },
                })
              }
              className="inline-flex h-7 items-center gap-1.5 rounded-full border border-border bg-card/60 px-2.5 text-[11px] font-semibold text-foreground/70 hover:border-[color:var(--accent)]/30 hover:text-foreground"
            >
              <RotateCcw className="h-3 w-3" /> Reset all
            </button>
          )}
        </div>
      )}
    </section>
  );
}


type Row = {
  cpu: string;
  cores: string;
  ram: string;
  disk: string;
  gpu?: string;
  net: string;
  flag: string;
  region: string;
  hour: number;
  month: number;
  status: "ready" | "low" | "hot";
};

const ROWS: Row[] = [
  { cpu: "Intel Core i7-6700", cores: "4C/8T", ram: "64 GB DDR4", disk: "2× 250 GB SSD", net: "1 Gbps", flag: "🇩🇪", region: "FRA-3", hour: 1909, month: 1191801, status: "ready" },
  { cpu: "Intel Core i7-7700", cores: "4C/8T", ram: "64 GB DDR4", disk: "2× 256 GB NVMe", net: "1 Gbps", flag: "🇩🇪", region: "FRA-3", hour: 1909, month: 1191801, status: "hot" },
  { cpu: "AMD Ryzen 9 5950X", cores: "16C/32T", ram: "128 GB DDR4", disk: "2× 1 TB NVMe", net: "10 Gbps", flag: "🇸🇬", region: "SIN-1", hour: 4250, month: 2650000, status: "ready" },
  { cpu: "Intel Xeon E5-2680", cores: "12C/24T", ram: "256 GB ECC", disk: "4× 2 TB SSD", net: "10 Gbps", flag: "🇳🇱", region: "AMS-2", hour: 5499, month: 3299000, status: "low" },
  { cpu: "AMD EPYC 7402P", cores: "24C/48T", ram: "256 GB ECC", disk: "2× 3.84 TB NVMe", gpu: "RTX A4000", net: "10 Gbps", flag: "🇺🇸", region: "NYC-1", hour: 8990, month: 5390000, status: "ready" },
  { cpu: "AMD EPYC 7763", cores: "64C/128T", ram: "512 GB ECC", disk: "4× 3.84 TB NVMe", net: "25 Gbps", flag: "🇯🇵", region: "TYO-1", hour: 14500, month: 8900000, status: "low" },
];

function ServerTable() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const filtered = useFilteredRows();
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(search.page, totalPages);
  const start = (page - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  return (
    <div className="card-surface mt-5 overflow-hidden p-0">
      {/* Desktop table */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-[1.6fr_0.9fr_1.1fr_1.3fr_0.9fr_0.9fr_1fr_auto] gap-3 border-b border-border bg-foreground/[0.03] px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          <span>CPU</span>
          <span>Cores</span>
          <span>Memory</span>
          <span>Storage / GPU</span>
          <span>Network</span>
          <span>Region</span>
          <span className="text-right">Price</span>
          <span />
        </div>
        {visible.length === 0 && (
          <div className="px-5 py-10 text-center text-sm text-muted-foreground">
            No servers match the current filters.
          </div>
        )}
        {visible.map((r, i) => (
          <div
            key={i}
            className="group grid grid-cols-[1.6fr_0.9fr_1.1fr_1.3fr_0.9fr_0.9fr_1fr_auto] items-center gap-3 border-b border-border/60 px-5 py-3.5 text-[13px] transition-colors last:border-b-0 hover:bg-[color:var(--accent-tint)]/40"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <StatusDot s={r.status} />
                <span className="truncate font-semibold text-foreground">{r.cpu}</span>
              </div>
            </div>
            <span className="font-mono text-xs text-foreground/80">{r.cores}</span>
            <span className="truncate text-foreground/80">{r.ram}</span>
            <div className="min-w-0">
              <div className="truncate text-foreground/80">{r.disk}</div>
              {r.gpu && <div className="truncate text-[11px] text-[color:var(--accent-strong)]">+ {r.gpu}</div>}
            </div>
            <span className="text-foreground/80">{r.net}</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="text-base leading-none">{r.flag}</span>
              <span className="font-mono text-[11px] text-muted-foreground">{r.region}</span>
            </span>
            <div className="text-right">
              <div className="font-bold tracking-tight text-foreground">Rp {r.hour.toLocaleString("id-ID")}<span className="text-[10px] font-normal text-muted-foreground">/hr</span></div>
              <div className="text-[10px] text-muted-foreground">≤ Rp {r.month.toLocaleString("id-ID")}/mo</div>
            </div>
            <button className="btn-primary !h-8 !px-3 !text-[11px] opacity-90 group-hover:opacity-100">
              Deploy
            </button>
          </div>
        ))}
      </div>

      {/* Mobile cards */}
      <div className="divide-y divide-border/60 lg:hidden">
        {visible.length === 0 && (
          <div className="p-6 text-center text-sm text-muted-foreground">
            No servers match the current filters.
          </div>
        )}
        {visible.map((r, i) => (
          <div key={i} className="p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <StatusDot s={r.status} />
                  <span className="truncate text-sm font-bold">{r.cpu}</span>
                </div>
                <div className="mt-1 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <span className="text-base leading-none">{r.flag}</span>
                  <span className="font-mono">{r.region}</span>
                  <span>·</span>
                  <span>{r.cores}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold tracking-tight">Rp {r.hour.toLocaleString("id-ID")}</div>
                <div className="text-[10px] text-muted-foreground">/hour</div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-1.5 text-[11px] text-foreground/80">
              <span className="inline-flex items-center gap-1.5"><MemoryStick className="h-3 w-3 text-[color:var(--accent-strong)]" />{r.ram}</span>
              <span className="inline-flex items-center gap-1.5"><HardDrive className="h-3 w-3 text-[color:var(--accent-strong)]" />{r.disk}</span>
              <span className="inline-flex items-center gap-1.5"><Network className="h-3 w-3 text-[color:var(--accent-strong)]" />{r.net}</span>
              {r.gpu && <span className="inline-flex items-center gap-1.5"><Layers className="h-3 w-3 text-[color:var(--accent-strong)]" />{r.gpu}</span>}
            </div>
            <button className="btn-primary mt-3 w-full !h-9 !text-[12px]">Deploy now</button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border bg-foreground/[0.02] px-5 py-3">
        <span className="text-[11px] text-muted-foreground">
          {filtered.length === 0
            ? "No results"
            : `Showing ${start + 1}–${Math.min(start + PAGE_SIZE, filtered.length)} of ${filtered.length}`}
        </span>
        <div className="flex items-center gap-1.5">
          <button
            disabled={page <= 1}
            onClick={() => navigate({ search: (p: z.infer<typeof filterSchema>) => ({ ...p, page: Math.max(1, p.page - 1) }) })}
            className="inline-flex h-8 items-center gap-1 rounded-md border border-border bg-card/60 px-2.5 text-[11px] font-semibold text-foreground/75 transition-colors hover:border-[color:var(--accent)]/30 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft className="h-3 w-3" /> Prev
          </button>
          <span className="px-1 font-mono text-[11px] text-muted-foreground">
            {page} / {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => navigate({ search: (p: z.infer<typeof filterSchema>) => ({ ...p, page: Math.min(totalPages, p.page + 1) }) })}
            className="inline-flex h-8 items-center gap-1 rounded-md border border-border bg-card/60 px-2.5 text-[11px] font-semibold text-foreground/75 transition-colors hover:border-[color:var(--accent)]/30 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

function StatusDot({ s }: { s: Row["status"] }) {
  const map = {
    ready: { color: "bg-emerald-500", label: "Ready" },
    low: { color: "bg-amber-500", label: "Low stock" },
    hot: { color: "bg-rose-500", label: "Hot" },
  } as const;
  const m = map[s];
  return (
    <span title={m.label} className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${m.color}`} />
  );
}

/* ============== COMPARISON STRIP ============== */
function ComparisonStrip() {
  const items = [
    { icon: Server, title: "Bare Metal", sub: "Dedicated hardware, no neighbours", a: true },
    { icon: Cpu, title: "VPS", sub: "Shared hypervisor, fast to spin up", a: false },
    { icon: Plug, title: "Cloud Instance", sub: "Burstable, pay per minute", a: false },
  ];
  return (
    <section className="mt-12">
      <SectionHeader eyebrow="Why bare metal" title="When you want the whole machine" />
      <div className="card-surface mt-5 grid divide-y divide-border/60 p-0 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {items.map((it) => (
          <div key={it.title} className={`relative flex items-start gap-3 p-5 ${it.a ? "bg-[color:var(--accent-tint)]/40" : ""}`}>
            <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${it.a ? "border border-[color:var(--accent)]/30 bg-card text-[color:var(--accent-strong)]" : "border border-border bg-foreground/[0.03] text-foreground/70"}`}>
              <it.icon className="h-4 w-4" strokeWidth={1.75} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <div className="text-sm font-bold tracking-tight">{it.title}</div>
                {it.a && <span className="rounded-full bg-[color:var(--accent)] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">You're here</span>}
              </div>
              <div className="mt-1 text-[12px] text-muted-foreground">{it.sub}</div>
              <ul className="mt-3 space-y-1 text-[11px] text-foreground/75">
                <li className="inline-flex items-center gap-1.5"><Timer className="h-3 w-3 text-[color:var(--accent-strong)]" /> {it.a ? "Deploy ~90s" : it.title === "VPS" ? "Deploy ~30s" : "Deploy ~10s"}</li>
                <li className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3 w-3 text-[color:var(--accent-strong)]" /> {it.a ? "Full root + IPMI" : "Root in container"}</li>
                <li className="inline-flex items-center gap-1.5"><Wifi className="h-3 w-3 text-[color:var(--accent-strong)]" /> {it.a ? "Unmetered uplink" : "Metered uplink"}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============== FOOTER CTA ============== */
function FooterCTA() {
  return (
    <section className="mt-12 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-[color:var(--accent-tint)] via-card to-gold/10 p-6 sm:p-10">
      <div className="grid items-center gap-6 sm:grid-cols-[1.4fr_auto]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
            <Activity className="h-3 w-3" /> 218 servers online · 99.95% SLA
          </div>
          <h3 className="mt-3 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
            Ready to claim your <span className="text-gold-gradient">first hour?</span>
          </h3>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Spin up dedicated hardware in seconds. No contracts, no surprises — just raw performance billed in Rupiah.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 sm:flex-nowrap">
          <a href="#configure" className="btn-primary">
            <Sliders className="h-4 w-4" /> Build a rig
          </a>
          <a href="#inventory" className="btn-ghost">
            <Server className="h-4 w-4 text-[color:var(--accent-strong)]" /> Browse inventory
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============== SHARED ============== */
function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <header>
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-strong)]">{eyebrow}</div>
      <h2 className="mt-1.5 text-xl font-bold tracking-tight sm:text-2xl">{title}</h2>
      {subtitle && <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">{subtitle}</p>}
    </header>
  );
}
