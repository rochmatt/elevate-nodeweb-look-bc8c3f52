import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Search,
  ShoppingCart,
  Globe,
  ShieldCheck,
  MonitorSmartphone,
  Server,
  CreditCard,
  Activity,
  Layers,
  Terminal,
  Cpu,
  HardDrive,
  MemoryStick,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NodeKPT — Buy & Sell Cloud, Bare Metal & Proxy" },
      {
        name: "description",
        content:
          "The first marketplace where anyone can sell VPSes and buyers get direct server control via an integrated panel. Deploy in minutes, pay in IDR.",
      },
      { property: "og:title", content: "NodeKPT — VPS Marketplace" },
      {
        property: "og:description",
        content:
          "Buy & sell Cloud, Bare Metal, and Proxy with full control. Trusted sellers, integrated control panel, local payments.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="theme-light min-h-screen overflow-x-hidden">
      <Nav />
      <Hero />
      <Locations />
      <MarketplacePreview />
      <Features />
      <HowItWorks />
      <SellerCTA />
      <Footer />
    </div>
  );
}

/* ----------------------------- NAV ----------------------------- */
function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-subtle)] bg-[color:var(--bg)]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 sm:gap-4 sm:px-6 sm:py-3.5">
        <a href="/" className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--accent)] text-white shadow-[0_6px_18px_-6px_var(--accent-ring)]">
            <Layers className="h-4.5 w-4.5" strokeWidth={2.4} />
          </div>
          <div className="leading-tight">
            <div className="text-[15px] font-bold tracking-tight text-[var(--text)] sm:text-[17px]">
              Node<span className="text-[var(--accent)]">KPT</span>
            </div>
            <div className="hidden text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--text-faint)] sm:block">
              Find the right VPS
            </div>
          </div>
        </a>

        <div className="ml-2 hidden min-w-0 flex-1 md:block">
          <div className="relative max-w-xl">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-faint)]" />
            <input
              type="text"
              placeholder="Search VPS, location, or seller..."
              className="h-11 w-full rounded-full border border-[var(--border-subtle)] bg-white pl-10 pr-4 text-sm text-[var(--text)] outline-none transition-colors placeholder:text-[var(--text-faint)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-ring)]"
            />
          </div>
        </div>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {["Marketplace", "Tools", "Features", "Become a Seller"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-[var(--text-muted)] transition-colors hover:bg-[var(--accent-tint)] hover:text-[var(--accent-strong)]"
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1 md:ml-0 md:gap-1.5">
          <button
            aria-label="Search"
            className="grid h-10 w-10 place-items-center rounded-full text-[var(--text-muted)] hover:bg-[var(--accent-tint)] hover:text-[var(--accent-strong)] md:hidden"
          >
            <Search className="h-4.5 w-4.5" />
          </button>
          <button
            aria-label="Cart"
            className="grid h-10 w-10 place-items-center rounded-full text-[var(--text-muted)] hover:bg-[var(--accent-tint)] hover:text-[var(--accent-strong)]"
          >
            <ShoppingCart className="h-4.5 w-4.5" />
          </button>
          <button className="btn-ghost hidden sm:inline-flex">Log in</button>
          <button className="btn-primary h-9 px-3 text-xs sm:h-10 sm:px-4 sm:text-sm">
            <span className="hidden xs:inline sm:inline">Sign up</span>
            <span className="xs:hidden sm:hidden">Sign up</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}


/* ----------------------------- HERO ----------------------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <GridBackdrop />
      <div className="radial-glow pointer-events-none absolute left-1/2 top-1/3 h-[560px] w-[900px] -translate-x-1/2 -translate-y-1/2" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-10 sm:px-6 sm:pt-14 lg:grid-cols-[1.15fr_1fr] lg:gap-14 lg:pb-32 lg:pt-24">
        <div className="min-w-0">
          <h1 className="text-[clamp(2rem,8vw,4.5rem)] font-black leading-[1.05] tracking-tight text-[var(--text)]">
            Buy &amp; Sell{" "}
            <span className="text-[var(--accent)]">Cloud,</span>{" "}
            <span className="text-[var(--accent)]">Bare Metal &amp;</span>{" "}
            <span className="text-[var(--accent)]">Proxy</span>{" "}
            with{" "}
            <span className="bg-gradient-to-r from-[var(--accent-soft)] via-[var(--accent)] to-sky-500 bg-clip-text text-transparent">
              Full Control
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-[var(--text-muted)] sm:mt-7 sm:text-lg">
            The first marketplace where anyone can sell VPSes and buyers get
            direct server control via an integrated panel.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:gap-3">
            <button className="btn-primary h-12 w-full justify-center px-6 text-[15px] sm:w-auto">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="#marketplace"
              className="btn-secondary h-12 w-full justify-center px-6 text-[15px] sm:w-auto"
            >
              Browse VPS
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2.5 text-sm text-[var(--text-muted)]">
            {[
              "No long contracts",
              "Pay in IDR (QRIS, VA)",
              "Full root access",
            ].map((p) => (
              <li key={p} className="inline-flex items-center gap-2">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--accent-tint)]">
                  <Check className="h-3 w-3 text-[var(--accent-strong)]" />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <TerminalCard />
        </div>
      </div>

    </section>
  );
}

function GridBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.35]"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.06) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        maskImage:
          "radial-gradient(ellipse at center, black 40%, transparent 78%)",
      }}
    />
  );
}

function TerminalCard() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[var(--accent-tint)] via-transparent to-sky-100/40 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl bg-[#0b1220] shadow-[0_30px_70px_-30px_rgba(15,23,42,0.35)] ring-1 ring-black/5">
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <div className="text-xs text-slate-400">nodekpt — deploy.sh</div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
            v2.4
          </div>
        </div>

        <div className="space-y-1.5 overflow-x-auto p-4 font-mono text-[12px] leading-relaxed text-slate-300 sm:p-6 sm:text-[13px]">
          <p>
            <span className="text-[var(--accent-soft)]">$</span> curl -s
            install.nodekpt.com | bash
          </p>
          <p className="text-slate-400">→ Resolving nearest node: Jakarta-1</p>
          <p className="text-slate-400">
            → Provisioning{" "}
            <span className="text-slate-100">4 vCPU · 8 GB RAM · 160 GB NVMe</span>
          </p>
          <p className="text-slate-400">
            → Hardening firewall · enabling SSH keys
          </p>
          <p className="pt-2">
            <span className="text-emerald-400">[ ok ]</span>{" "}
            <span className="text-slate-100">VPS ready in 42s</span>{" "}
            <span className="text-slate-500">· uptime 99.97%</span>
          </p>
          <p>
            <span className="text-emerald-400">[ ok ]</span>{" "}
            <span className="text-slate-100">Endpoint:</span>{" "}
            <span className="text-[var(--accent-soft)]">203.0.113.18</span>
          </p>
        </div>
      </div>

      <div className="absolute -bottom-5 -left-2 rounded-2xl border border-[var(--border-subtle)] bg-white px-4 py-3 shadow-[0_18px_40px_-18px_rgba(15,23,42,0.25)] sm:-bottom-6 sm:-left-4 sm:px-5 sm:py-3.5">
        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-faint)]">
          Latency
        </div>
        <div className="text-2xl font-black leading-none tracking-tight text-[var(--text)] sm:text-3xl">
          12<span className="ml-1 text-base font-bold text-[var(--text-muted)] sm:text-lg">ms</span>
        </div>
        <div className="mt-1 text-[10px] text-[var(--text-faint)]">
          Asia · rata-rata
        </div>
      </div>

    </div>
  );
}

/* ----------------------------- LOCATIONS ----------------------------- */
function Locations() {
  const cities = ["Jakarta", "Singapore", "Tokyo", "Frankfurt", "New York", "London"];
  return (
    <section className="border-y border-[var(--border-subtle)] bg-white/60">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="text-center text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--text-faint)]">
          Available in premier locations
        </div>
        <div className="-mx-4 mt-5 flex snap-x snap-mandatory items-center gap-x-8 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:mt-6 sm:flex-wrap sm:justify-center sm:gap-x-10 sm:gap-y-3 sm:overflow-visible sm:px-0 md:gap-x-14">
          {cities.map((c) => (
            <div
              key={c}
              className="shrink-0 snap-start text-base font-semibold text-[var(--text-muted)] transition-colors hover:text-[var(--accent-strong)] sm:shrink sm:text-lg md:text-xl"
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ----------------------------- MARKETPLACE PREVIEW ----------------------------- */
type Pkg = {
  name: string;
  cpu: string;
  cores: string;
  ram: string;
  storage: string;
  type: "VPS" | "Bare Metal";
  chips: string[];
  price: string;
  suffix?: string;
  variant?: string;
};

const packages: Pkg[] = [
  {
    name: "Intel Core i7-6700",
    cpu: "Intel Core i7-6700",
    cores: "4 Core · 8 Thread",
    ram: "32 GB RAM",
    storage: "2× 4096 GB HDD",
    type: "Bare Metal",
    chips: ["Dedicated", "Delivery ≤ 1h"],
    price: "Rp 2rb",
    suffix: "/hour · max Rp 1,3jt/mo",
  },
  {
    name: "AMD Ryzen 5 3600X",
    cpu: "AMD Ryzen 5 3600X",
    cores: "6 Core · 12 Thread",
    ram: "32 GB RAM",
    storage: "2× 512 GB NVMe",
    type: "Bare Metal",
    chips: ["Dedicated", "Premium hardware"],
    price: "Rp 1,2jt",
    suffix: "/month",
  },
  {
    name: "VPS Ryzen 9 5950X Super Fast",
    cpu: "AMD Ryzen 9 5950X",
    cores: "4 vCPU",
    ram: "8 GB RAM",
    storage: "160 GB NVMe",
    type: "VPS",
    chips: ["KVM", "NVMe", "Anti-DDoS"],
    price: "Mulai Rp 50rb",
    suffix: "/month",
    variant: "3 variants",
  },
  {
    name: "Intel Xeon-D 2141I",
    cpu: "Intel Xeon-D 2141I",
    cores: "8 Core · 16 Thread",
    ram: "32 GB RAM",
    storage: "2× 512 GB NVMe",
    type: "Bare Metal",
    chips: ["Dedicated", "Enterprise"],
    price: "Rp 901rb",
    suffix: "/month",
  },
];

const tabs = ["All", "Germany", "Canada", "Australia", "Poland", "Singapore"];

function MarketplacePreview() {
  return (
    <section id="marketplace" className="relative">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4 sm:gap-6">
          <div className="min-w-0">
            <div className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--accent)]">
              Marketplace
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[var(--text)] sm:text-4xl md:text-5xl">
              Choose the Best VPS for{" "}
              <span className="text-[var(--accent)]">Your Needs</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm text-[var(--text-muted)] sm:mt-4 sm:text-base">
              Compare prices and specs from trusted sellers.
            </p>
          </div>

          <Link
            to="/marketplace"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] transition-all hover:gap-2.5"
          >
            Browse all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="-mx-5 mt-7 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0">
          <div className="inline-flex gap-1.5 rounded-full border border-[var(--border-subtle)] bg-white p-1 shadow-[var(--card-shadow)]">
            {tabs.map((t, i) => (
              <button
                key={t}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors sm:px-4 ${
                  i === 0
                    ? "bg-[var(--accent)] text-white shadow-[0_4px_10px_-4px_var(--accent-ring)]"
                    : "text-[var(--text-muted)] hover:text-[var(--accent-strong)]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {packages.map((p) => (

            <PackageCard key={p.name} pkg={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PackageCard({ pkg }: { pkg: Pkg }) {
  return (
    <article className="card-interactive group flex flex-col overflow-hidden">
      {/* Header: dark strip with CPU highlight */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0b1220] to-[#111a2e] p-4 text-white">
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(20,184,166,0.35), transparent 45%), radial-gradient(circle at 90% 80%, rgba(56,189,248,0.25), transparent 45%)",
          }}
        />
        <div className="relative flex items-center justify-between">
          <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/60">
            NODEKPT.COM
          </div>
          <span
            className={`rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${
              pkg.type === "VPS"
                ? "bg-[var(--accent)]/20 text-[var(--accent-soft)]"
                : "bg-sky-500/20 text-sky-300"
            }`}
          >
            {pkg.type}
          </span>
        </div>
        <div className="relative mt-3">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
            CPU
          </div>
          <div className="mt-0.5 text-[15px] font-bold leading-tight">
            {pkg.cpu}
          </div>
        </div>
        <div className="relative mt-3 grid grid-cols-2 gap-2 text-[11px]">
          <SpecMini icon={Cpu} label={pkg.cores} />
          <SpecMini icon={MemoryStick} label={pkg.ram} />
          <SpecMini icon={HardDrive} label={pkg.storage} full />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[15px] font-bold leading-snug text-[var(--text)]">
          {pkg.name}
        </h3>
        <p className="mt-1 text-xs text-[var(--text-muted)]">
          {pkg.cores} · {pkg.ram} · {pkg.storage}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {pkg.chips.map((c) => (
            <span
              key={c}
              className="rounded-full bg-[var(--accent-tint)] px-2 py-0.5 text-[10px] font-semibold text-[var(--accent-strong)]"
            >
              {c}
            </span>
          ))}
          {pkg.variant && (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
              {pkg.variant}
            </span>
          )}
        </div>

        <div className="mt-5 flex items-end justify-between gap-2 border-t border-[var(--border-subtle)] pt-4">
          <div>
            <div className="text-lg font-black leading-none text-[var(--text)]">
              {pkg.price}
            </div>
            {pkg.suffix && (
              <div className="mt-1 text-[10px] text-[var(--text-faint)]">
                {pkg.suffix}
              </div>
            )}
          </div>
          <button className="btn-primary h-9 px-3.5 text-xs">
            Deploy
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </article>
  );
}

function SpecMini({
  icon: Icon,
  label,
  full,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  full?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-1.5 rounded-md bg-white/5 px-2 py-1 text-white/80 ${
        full ? "col-span-2" : ""
      }`}
    >
      <Icon className="h-3 w-3 text-[var(--accent-soft)]" />
      <span className="truncate text-[10.5px]">{label}</span>
    </div>
  );
}

/* ----------------------------- FEATURES ----------------------------- */
function Features() {
  const items = [
    {
      icon: Globe,
      title: "Multi-Vendor Marketplace",
      desc: "Anyone can become a seller and list VPSes. Compare prices across providers in a single platform.",
    },
    {
      icon: MonitorSmartphone,
      title: "Integrated Control Panel",
      desc: "Start, Stop, Restart, Reinstall OS, and access Console from the dashboard. No node root access.",
    },
    {
      icon: Server,
      title: "Proxmox & VMware Integration",
      desc: "Sellers plug in their Proxmox VE or VMware vSphere node. The platform handles provisioning.",
    },
    {
      icon: CreditCard,
      title: "Local Payments",
      desc: "QRIS, Bank Transfer, E-Wallet (GoPay, OVO, DANA), or Credit Card. Powered by Midtrans & Xendit.",
    },
    {
      icon: ShieldCheck,
      title: "Layered Security",
      desc: "Mandatory seller KYC, escrow payment, 2FA, isolated VM access, and full audit log.",
    },
    {
      icon: Activity,
      title: "Real-time Monitoring",
      desc: "Monitor CPU, RAM, Disk, Network in real-time via WebSocket. Get alerts when something goes wrong.",
    },
  ];

  return (
    <section id="features" className="relative border-t border-[var(--border-subtle)] bg-white/60">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--accent)]">
            Features
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[var(--text)] sm:text-4xl md:text-5xl">
            Everything You <span className="text-[var(--accent)]">Need</span>
          </h2>
          <p className="mt-3 text-sm text-[var(--text-muted)] sm:mt-4 sm:text-base">
            A complete platform with powerful tools for buyers and sellers.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">

          {items.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="card-feature group p-6 transition-all hover:-translate-y-1"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--accent-tint)] text-[var(--accent-strong)] transition-colors group-hover:bg-[var(--accent)] group-hover:text-white">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-[var(--text)]">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- HOW IT WORKS ----------------------------- */
function HowItWorks() {
  const buyer = [
    { t: "Choose a VPS", d: "Browse the marketplace; compare prices and specs." },
    { t: "Pay", d: "Pay via QRIS, bank transfer, or e-wallet. Funds stay in escrow." },
    { t: "Wait for Approval", d: "Seller reviews and approves. VPS is provisioned automatically." },
    { t: "Control your VPS", d: "Access the panel. Start, stop, reinstall, and use the console." },
  ];
  const seller = [
    { t: "Register & Verify", d: "Create a seller account and complete KYC." },
    { t: "Connect a Node", d: "Connect your Proxmox / VMware server to the platform." },
    { t: "Create Packages", d: "Set spec, price, and OS templates." },
    { t: "Receive Orders", d: "Approve the order — platform provisions the VM. Get paid." },
  ];

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--accent)]">
            How it works
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[var(--text)] sm:text-4xl md:text-5xl">
            Simple for <span className="text-[var(--accent)]">Everyone</span>
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:mt-14 sm:gap-8 lg:grid-cols-2">
          <StepColumn title="For Buyers" steps={buyer} />
          <StepColumn title="For Sellers" steps={seller} />
        </div>
      </div>

    </section>
  );
}

function StepColumn({
  title,
  steps,
}: {
  title: string;
  steps: { t: string; d: string }[];
}) {
  return (
    <div className="card-surface p-6 sm:p-8">
      <div className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-[var(--accent)]">
        {title}
      </div>
      <ol className="space-y-5">
        {steps.map((s, i) => (
          <li key={s.t} className="flex gap-4">
            <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-[var(--accent-tint)] text-sm font-black text-[var(--accent-strong)]">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div>
              <h4 className="text-base font-bold text-[var(--text)]">{s.t}</h4>
              <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">
                {s.d}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ----------------------------- SELLER CTA ----------------------------- */
function SellerCTA() {
  return (
    <section
      id="become-a-seller"
      className="relative overflow-hidden border-t border-[var(--border-subtle)] bg-gradient-to-br from-[#0b1220] via-[#0f1a30] to-[#0b1220] text-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 30%, rgba(20,184,166,0.28), transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(56,189,248,0.22), transparent 55%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-6 md:py-28 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <div className="min-w-0">
          <div className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--accent-soft)]">
            For Sellers
          </div>
          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Got an Idle Server?{" "}
            <span className="bg-gradient-to-r from-[var(--accent-soft)] to-sky-400 bg-clip-text text-transparent">
              Sell VPS on NodeKPT!
            </span>
          </h2>
          <p className="mt-4 max-w-lg text-sm text-white/70 sm:mt-5 sm:text-base">
            Monetize your infrastructure. Connect a Proxmox / VMware node, build
            VPS plans, and start receiving orders. The platform handles payment
            and the buyer's control panel.
          </p>

          <ul className="mt-7 grid gap-3 sm:mt-8 sm:grid-cols-2">
            {[
              "Auto-install via SSH",
              "Set your own packages",
              "Payment & billing handled",
              "Full OS library",
              "Support handled",
              "Live in ~30 minutes",
            ].map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-sm text-white/85">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--accent)]/25 text-[var(--accent-soft)]">
                  <Check className="h-3 w-3" />
                </span>
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-9 sm:flex sm:flex-wrap">
            <button className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-6 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_var(--accent-ring)] transition-transform hover:-translate-y-0.5 sm:w-auto">
              Register as Seller
              <ArrowRight className="h-4 w-4" />
            </button>
            <button className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10 sm:w-auto">
              Learn More
            </button>
          </div>
        </div>


        <div className="relative">
          <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-[var(--accent)]/15 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#070d1a] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-2 border-b border-white/5 px-5 py-3 text-xs text-slate-400">
              <Terminal className="h-3.5 w-3.5 text-[var(--accent-soft)]" />
              seller@nodekpt ~
            </div>
            <div className="space-y-2 overflow-x-auto p-4 font-mono text-[12px] leading-relaxed text-slate-300 sm:p-6 sm:text-[13px]">
              <p>
                <span className="text-[var(--accent-soft)]">$</span> nodekpt node
                add --type proxmox
              </p>
              <p className="text-emerald-400">✓ Node JKT-01 connected successfully</p>
              <p className="pt-2">
                <span className="text-[var(--accent-soft)]">$</span> nodekpt
                package create --vcpu 4 --ram 8G
              </p>
              <p className="text-emerald-400">
                ✓ Package "Enterprise VPS" created
              </p>
              <p className="pt-2">
                <span className="text-[var(--accent-soft)]">$</span> nodekpt
                orders list
              </p>
              <p className="text-slate-100">3 new orders pending approval</p>
              <p className="pt-1">
                <span className="text-[var(--accent-soft)]">$</span>
                <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-[var(--accent-soft)]" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- FOOTER ----------------------------- */
function Footer() {
  const cols = [
    {
      title: "Marketplace",
      links: ["VPS", "Bare Metal", "Proxy", "GPU Servers"],
    },
    {
      title: "For Sellers",
      links: ["Become a Seller", "Install Proxmox", "Docs", "Pricing"],
    },
    {
      title: "Company",
      links: ["About", "Blog", "Contact", "Status"],
    },
    {
      title: "Legal",
      links: ["Terms", "Privacy", "Refund Policy", "AUP"],
    },
  ];
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-14">
        <div className="grid gap-8 grid-cols-2 sm:gap-10 md:grid-cols-4 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--accent)] text-white">
                <Layers className="h-4.5 w-4.5" strokeWidth={2.4} />
              </div>
              <div className="text-lg font-bold text-[var(--text)]">
                Node<span className="text-[var(--accent)]">KPT</span>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm text-[var(--text-muted)]">
              The marketplace for Cloud, Bare Metal, and Proxy — with full
              control panel included.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--text-faint)]">
                {c.title}
              </div>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--accent-strong)]"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[var(--border-subtle)] pt-6 text-xs text-[var(--text-faint)] sm:flex-row sm:items-center">
          <div>© 2026 NodeKPT. All rights reserved.</div>
          <div>Pay in IDR · QRIS · VA · E-Wallet</div>
        </div>
      </div>
    </footer>
  );
}
