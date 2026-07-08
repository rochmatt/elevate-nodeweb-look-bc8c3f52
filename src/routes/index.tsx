import { useState, useRef, useCallback, useEffect, type ReactNode } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useCart } from "@/hooks/useCart";
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
  Database,
  Cloud,
  Zap,
  Waypoints,
  ShieldAlert,
  HardDriveDownload,
  Sparkles,
  X,
  MessageCircle,
  Menu,
  Store,
  Wrench,
  Handshake,
} from "lucide-react";
import thumbBareMetal from "@/assets/thumb-baremetal.jpg";
import thumbVps from "@/assets/thumb-vps.jpg";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";
import { AuthActions } from "@/components/UserMenu";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

const SITE_URL = "https://elevate-nodeweb-look.lovable.app";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
const PAGE_TITLE = "NodeKPT — Marketplace VPS, Bare Metal & Proxy";
const PAGE_DESC =
  "Marketplace VPS, Bare Metal, dan Proxy dari seller terpercaya. Deploy dalam menit, bayar Rupiah (QRIS/VA), kontrol penuh via panel terintegrasi.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      {
        name: "keywords",
        content:
          "VPS marketplace, sewa VPS, jual VPS, bare metal Indonesia, cloud server, proxy server, hosting Indonesia, deploy VPS, NodeKPT",
      },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { name: "author", content: "NodeKPT" },
      { name: "theme-color", content: "#0d9488" },

      // Open Graph
      { property: "og:site_name", content: "NodeKPT" },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:locale", content: "id_ID" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "NodeKPT — Marketplace VPS, Bare Metal & Proxy" },

      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESC },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "twitter:image:alt", content: "NodeKPT — Marketplace VPS, Bare Metal & Proxy" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `${SITE_URL}/#webpage`,
              url: `${SITE_URL}/`,
              name: PAGE_TITLE,
              description: PAGE_DESC,
              isPartOf: { "@id": `${SITE_URL}/#website` },
              about: { "@id": `${SITE_URL}/#organization` },
              primaryImageOfPage: OG_IMAGE,
              inLanguage: "id-ID",
            },
            {
              "@type": "Service",
              name: "NodeKPT Marketplace",
              provider: { "@id": `${SITE_URL}/#organization` },
              serviceType: "VPS, Bare Metal & Proxy Marketplace",
              areaServed: "ID",
              offers: {
                "@type": "AggregateOffer",
                priceCurrency: "IDR",
                lowPrice: "15000",
                offerCount: "120",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="theme-light min-h-screen overflow-x-hidden">
      <Nav />
      <InfoTicker />
      <QuickMenu />
      <Hero />

      <Locations />
      <MarketplacePreview />
      <AddOns />
      <Features />
      <HowItWorks />
      <SellerCTA />
      <Footer />
      <MobileBottomNav />
      <WelcomeModal />
    </div>
  );
}

/* ----------------------------- WELCOME MODAL ----------------------------- */
const WELCOME_MODAL_KEY = "nodekpt-welcome-shown";

function TickerItem({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
      {icon}
      {label}
    </span>
  );
}

function WelcomeModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const alreadyShown = localStorage.getItem(WELCOME_MODAL_KEY);
      if (alreadyShown !== "true") {
        const timer = setTimeout(() => setOpen(true), 600);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage unavailable (e.g. private mode); show once per session
      const timer = setTimeout(() => setOpen(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    try {
      localStorage.setItem(WELCOME_MODAL_KEY, "true");
    } catch {
      // ignore
    }
  };

  if (!mounted) return null;

  return (
    <Dialog open={open} onOpenChange={(next) => {
      if (!next) handleClose();
      setOpen(next);
    }}>
      <DialogContent
        className="theme-light fixed left-1/2 top-1/2 max-h-[75dvh] w-[84vw] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-[var(--border-subtle)] bg-white p-0 shadow-[0_24px_70px_-24px_rgba(15,23,42,0.25)] !duration-0 data-[state=open]:!animate-none data-[state=closed]:!animate-none sm:max-h-[85dvh] sm:w-[92vw] [&>button]:!hidden"
      >
        <div className="relative overflow-hidden">
          <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--accent-tint)] blur-2xl sm:h-32 sm:w-32" />
          <div className="absolute -left-10 -bottom-10 h-24 w-24 rounded-full bg-[var(--accent-tint)] blur-2xl sm:h-28 sm:w-28" />
          <button
            onClick={handleClose}
            aria-label="Tutup popup selamat datang"
            className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full text-[var(--text-muted)] transition-colors hover:bg-[var(--accent-tint)] hover:text-[var(--accent-strong)]"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="relative px-5 pb-5 pt-8 text-center sm:px-8 sm:pb-8 sm:pt-12">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[var(--accent-soft)] to-[var(--accent)] text-white shadow-[0_12px_32px_-12px_var(--accent-ring)] sm:h-16 sm:w-16">
              <Sparkles className="h-5 w-5 sm:h-7 sm:w-7" />
            </div>

            <DialogHeader className="mt-4 space-y-2 sm:mt-5 sm:space-y-3">
              <DialogTitle className="text-lg font-bold tracking-tight text-[var(--text)] sm:text-2xl">
                Selamat Datang di NodeKPT!
              </DialogTitle>
              <DialogDescription className="text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
                Kami hadir untuk memberikan solusi performa terbaik bagi kebutuhan digital Anda. Jelajahi layanan unggulan kami dan temukan infrastruktur yang andal di sini.
              </DialogDescription>
            </DialogHeader>


            <div className="mt-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--card-muted)] p-3 text-left sm:mt-6 sm:p-4">
              <div className="flex items-start gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[var(--accent-tint)] text-[var(--accent-strong)]">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--text)]">Butuh bantuan?</p>
                  <p className="text-xs leading-relaxed text-[var(--text-muted)] sm:text-sm">
                    Tim support kami siap membantu Anda kapan saja. Jangan ragu untuk menghubungi kami.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:justify-center">
              <a
                href="#marketplace"
                onClick={handleClose}
                className="btn-primary h-12 w-full justify-center px-5 text-base sm:h-11 sm:w-auto sm:text-sm"
              >
                Jelajahi Layanan
                <ArrowRight className="h-5 w-5 sm:h-4 sm:w-4" />
              </a>
              <button
                onClick={handleClose}
                className="btn-secondary h-12 w-full justify-center px-5 text-base sm:h-11 sm:w-auto sm:text-sm"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ----------------------------- INFO TICKER ----------------------------- */
function InfoTicker() {
  return (
    <div className="relative z-40 overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--accent-tint)] py-2.5">
      <div className="top-ticker-track flex w-max items-center gap-6 px-4 text-xs font-medium text-[var(--accent-strong)] sm:text-sm">
        <TickerItem icon={<Zap className="h-3.5 w-3.5" />} label="Promo spesial VPS & Bare Metal" />
        <TickerItem icon={<ShieldCheck className="h-3.5 w-3.5" />} label="Support 24/7" />
        <TickerItem icon={<Cloud className="h-3.5 w-3.5" />} label="Deploy dalam menit" />
        <TickerItem icon={<CreditCard className="h-3.5 w-3.5" />} label="Pembayaran QRIS / Virtual Account" />
        <TickerItem icon={<Activity className="h-3.5 w-3.5" />} label="Garansi uptime tinggi" />
        <TickerItem icon={<Zap className="h-3.5 w-3.5" />} label="Promo spesial VPS & Bare Metal" />
        <TickerItem icon={<ShieldCheck className="h-3.5 w-3.5" />} label="Support 24/7" />
        <TickerItem icon={<Cloud className="h-3.5 w-3.5" />} label="Deploy dalam menit" />
        <TickerItem icon={<CreditCard className="h-3.5 w-3.5" />} label="Pembayaran QRIS / Virtual Account" />
        <TickerItem icon={<Activity className="h-3.5 w-3.5" />} label="Garansi uptime tinggi" />
      </div>
      <style>{`
        @keyframes top-ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .top-ticker-track {
          animation: top-ticker 22s linear infinite;
        }
        .top-ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

/* ----------------------------- NAV ----------------------------- */

const NAV_LINKS = ["Marketplace", "Tools", "Features", "Become a Seller"];

function useHash() {
  const [hash, setHash] = useState("");

  useEffect(() => {
    const update = () => setHash(window.location.hash);
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  return hash;
}

function Nav() {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const hash = useHash();

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
              type="search"
              aria-label="Search VPS, location, or seller"
              placeholder="Search VPS, location, or seller..."
              className="h-11 w-full rounded-full border border-[var(--border-subtle)] bg-white pl-10 pr-4 text-sm text-[var(--text)] outline-none transition-colors placeholder:text-[var(--text-faint)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-ring)]"
            />
          </div>
        </div>

        <DesktopNavLinks activeHash={hash} />

        <div className="ml-auto flex shrink-0 items-center gap-1 md:ml-0 md:gap-1.5">
          <button
            type="button"
            aria-label={mobileSearchOpen ? "Close search" : "Open search"}
            aria-expanded={mobileSearchOpen}
            aria-controls="mobile-search"
            onClick={() => setMobileSearchOpen((v) => !v)}
            className={`grid h-10 w-10 place-items-center rounded-full transition-colors md:hidden ${
              mobileSearchOpen
                ? "bg-[var(--accent-tint)] text-[var(--accent-strong)]"
                : "text-[var(--text-muted)] hover:bg-[var(--accent-tint)] hover:text-[var(--accent-strong)]"
            }`}
          >
            {mobileSearchOpen ? (
              <X className="h-4.5 w-4.5" />
            ) : (
              <Search className="h-4.5 w-4.5" />
            )}
          </button>
          <button
            aria-label="Cart"
            className="grid h-10 w-10 place-items-center rounded-full text-[var(--text-muted)] hover:bg-[var(--accent-tint)] hover:text-[var(--accent-strong)]"
          >
            <ShoppingCart className="h-4.5 w-4.5" />
          </button>
          <div className="hidden lg:block">
            <AuthActions />
          </div>
        </div>
      </div>

      <div
        id="mobile-search"
        className={`md:hidden overflow-hidden border-t border-[var(--border-subtle)] transition-[max-height,opacity] duration-300 ease-out ${
          mobileSearchOpen ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-faint)]" />
            <input
              type="search"
              autoFocus={mobileSearchOpen}
              aria-label="Search VPS, location, or seller"
              placeholder="Search VPS, location, or seller..."
              className="h-11 w-full rounded-full border border-[var(--border-subtle)] bg-white pl-10 pr-4 text-sm text-[var(--text)] outline-none transition-colors placeholder:text-[var(--text-faint)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-ring)]"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

/* --------------------------- QUICK MENU --------------------------- */
const QUICK_MENU: { label: string; href: string; icon: typeof Store }[] = [
  { label: "Marketplace", href: "#marketplace", icon: Store },
  { label: "Tools", href: "#tools", icon: Wrench },
  { label: "Features", href: "#features", icon: Sparkles },
  { label: "Become a Seller", href: "#become-a-seller", icon: Handshake },
];

function QuickMenu() {
  const hash = useHash();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      aria-label="Quick menu"
      className="relative z-30 border-b border-[var(--border-subtle)] bg-[var(--bg)]"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-40 w-[80%] -translate-x-1/2 bg-gradient-to-b from-[var(--accent-tint)] to-transparent opacity-70 blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-3.5 sm:px-6 sm:py-4 lg:py-5">
        <div className="grid grid-cols-4 gap-2 sm:gap-3 lg:grid-cols-4 lg:gap-4">
          {QUICK_MENU.map(({ label, href, icon: Icon }, index) => {
            const active = hash === href;
            return (
              <a
                key={label}
                href={href}
                aria-current={active ? "page" : undefined}
                style={mounted ? { animationDelay: `${index * 70}ms` } : undefined}
                className={`group relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border px-2 py-3.5 text-center transition-all duration-300 ease-out active:scale-[0.97] sm:rounded-3xl sm:py-4 lg:gap-2.5 lg:py-5 ${
                  mounted ? "menu-enter" : "opacity-0"
                } ${
                  active
                    ? "border-[var(--accent)]/50 bg-white shadow-[0_8px_28px_-14px_var(--accent-ring)]"
                    : "border-[var(--border-subtle)] bg-white/90 shadow-[0_2px_10px_-4px_rgba(15,23,42,0.06)] hover:border-[var(--accent)]/35 hover:bg-white hover:shadow-[0_14px_36px_-18px_var(--accent-ring)] hover:-translate-y-0.5"
                }`}
              >
                <span
                  className={`grid h-10 w-10 place-items-center rounded-[13px] transition-all duration-300 ease-out sm:h-11 sm:w-11 sm:rounded-2xl lg:h-12 lg:w-12 ${
                    active
                      ? "bg-gradient-to-br from-[var(--accent-soft)] to-[var(--accent)] text-white shadow-[0_8px_22px_-10px_var(--accent-ring)]"
                      : "bg-[var(--accent-tint)] text-[var(--accent-strong)] group-hover:bg-gradient-to-br group-hover:from-[var(--accent-soft)] group-hover:to-[var(--accent)] group-hover:text-white group-hover:shadow-[0_8px_22px_-10px_var(--accent-ring)]"
                  } ${active ? "menu-icon-pop" : ""}`}
                >
                  <Icon className="h-5 w-5 sm:h-[22px] sm:w-[22px] lg:h-6 lg:w-6" strokeWidth={1.9} />
                </span>
                <span className="text-[11px] font-semibold leading-tight tracking-tight text-[var(--text)] transition-colors duration-300 sm:text-xs lg:text-[13px]">
                  {label}
                </span>

                {active && (
                  <span className="menu-dot-enter absolute bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_6px_var(--accent)] sm:bottom-2.5 lg:bottom-3" />
                )}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}


function DesktopNavLinks({ activeHash }: { activeHash: string }) {
  return (
    <nav className="ml-auto hidden items-center gap-1 lg:flex">
      {NAV_LINKS.map((l, index) => {
        const href = `#${l.toLowerCase().replace(/\s/g, "-")}`;
        const active = activeHash === href;
        return (
          <a
            key={l}
            href={href}
            aria-current={active ? "page" : undefined}
            style={{ animationDelay: `${index * 60}ms` }}
            className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-300 ease-out hover:-translate-y-px ${
              active
                ? "bg-[var(--accent-tint)] text-[var(--accent-strong)]"
                : "text-[var(--text-muted)] hover:bg-[var(--accent-tint)] hover:text-[var(--accent-strong)]"
            }`}
          >
            {l}
            {active && (
              <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_6px_var(--accent)] menu-dot-enter" />
            )}
          </a>
        );
      })}
    </nav>
  );
}

function MobileNavLinks({ activeHash, onNavigate }: { activeHash: string; onNavigate: () => void }) {
  return (
    <nav aria-label="Mobile" className="flex flex-col p-2">
      {NAV_LINKS.map((l) => {
        const href = `#${l.toLowerCase().replace(/\s/g, "-")}`;
        const active = activeHash === href;
        return (
          <SheetClose asChild key={l}>
            <a
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                active
                  ? "bg-[var(--accent-tint)] text-[var(--accent-strong)]"
                  : "text-[var(--text-muted)] hover:bg-[var(--accent-tint)] hover:text-[var(--accent-strong)]"
              }`}
            >
              {l}
              {active && <span className="h-2 w-2 rounded-full bg-[var(--accent)]" aria-hidden="true" />}
            </a>
          </SheetClose>
        );
      })}
    </nav>
  );
}


/* ----------------------------- HERO ----------------------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <GridBackdrop />
      <div className="radial-glow pointer-events-none absolute left-1/2 top-1/3 h-[560px] w-[900px] -translate-x-1/2 -translate-y-1/2" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-4 pt-10 sm:px-6 sm:pt-14 lg:grid-cols-[1.15fr_1fr] lg:gap-14 lg:pb-32 lg:pt-24">
        {/* Mobile: image slider replaces headline copy */}
        <div className="min-w-0 lg:hidden">
          <MobileHeroSlider />
        </div>

        {/* Desktop: original headline copy */}
        <div className="hidden min-w-0 lg:block">
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

        <div className="hidden min-w-0 lg:block">
          <TerminalCard />
        </div>
      </div>

    </section>
  );
}

const HERO_SLIDES = [
  {
    src: heroSlide1,
    title: "Cloud VPS",
    subtitle: "Deploy instantly, scale anytime",
    href: "#marketplace",
  },
  {
    src: heroSlide2,
    title: "Bare Metal",
    subtitle: "Raw power, dedicated hardware",
    href: "/bare-metal",
  },
  {
    src: heroSlide3,
    title: "Global Proxy",
    subtitle: "Worldwide network, low latency",
    href: "#marketplace",
  },
];

function MobileHeroSlider() {
  const [index, setIndex] = useState(0);
  const count = HERO_SLIDES.length;
  const touchStartX = useRef<number | null>(null);
  const paused = useRef(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (!paused.current) setIndex((i) => (i + 1) % count);
    }, 4500);
    return () => window.clearInterval(id);
  }, [count]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    paused.current = true;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    paused.current = false;
    if (start == null) return;
    const dx = e.changedTouches[0].clientX - start;
    if (Math.abs(dx) < 40) return;
    if (dx < 0) setIndex((i) => (i + 1) % count);
    else setIndex((i) => (i - 1 + count) % count);
  };

  return (
    <div className="relative">
      <div
        className="relative overflow-hidden rounded-2xl bg-[var(--surface-2)] shadow-[0_20px_50px_-25px_rgba(15,23,42,0.35)] ring-1 ring-black/5"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {HERO_SLIDES.map((s, i) => (
            <a
              key={s.title}
              href={s.href}
              className="relative block aspect-[4/3] w-full shrink-0"
              aria-label={`${s.title} — ${s.subtitle}`}
            >
              <img
                src={s.src}
                alt={s.title}
                width={1200}
                height={900}
                loading={i === 0 ? "eager" : "lazy"}
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                  {s.subtitle}
                </p>
                <h2 className="mt-1 text-2xl font-black leading-tight text-white">
                  {s.title}
                </h2>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.title}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index
                ? "w-6 bg-[var(--accent)]"
                : "w-1.5 bg-[var(--border)]"
            }`}
          />
        ))}
      </div>
    </div>
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
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-10">
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

function LocationTabs({ activeTab, onChange }: { activeTab: string; onChange: (tab: string) => void }) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const didMountRef = useRef(false);

  const scrollTabIntoView = useCallback((el: HTMLElement) => {
    // Horizontal-only scroll: adjust the parent scroll container instead of
    // scrollIntoView (which also scrolls the page vertically on mount).
    const container = el.parentElement;
    if (!container) return;
    const target =
      el.offsetLeft - container.clientWidth / 2 + el.clientWidth / 2;
    container.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, []);

  const focusTab = useCallback((index: number) => {
    const el = tabRefs.current[index];
    if (el) {
      el.focus({ preventScroll: true });
      scrollTabIntoView(el);
    }
  }, [scrollTabIntoView]);

  // Scroll active tab into view when it changes — skip on first mount to
  // avoid the page auto-scrolling down to reveal the tab bar.
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    const index = tabs.indexOf(activeTab);
    const el = tabRefs.current[index];
    if (el) scrollTabIntoView(el);
  }, [activeTab, scrollTabIntoView]);


  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = tabs.indexOf(activeTab);
    let nextIndex = currentIndex;

    switch (e.key) {
      case "ArrowRight":
        nextIndex = currentIndex + 1 >= tabs.length ? 0 : currentIndex + 1;
        e.preventDefault();
        break;
      case "ArrowLeft":
        nextIndex = currentIndex - 1 < 0 ? tabs.length - 1 : currentIndex - 1;
        e.preventDefault();
        break;
      case "Home":
        nextIndex = 0;
        e.preventDefault();
        break;
      case "End":
        nextIndex = tabs.length - 1;
        e.preventDefault();
        break;
      default:
        return;
    }

    onChange(tabs[nextIndex]);
    focusTab(nextIndex);
  }, [activeTab, onChange, focusTab]);

  return (
    <div className="relative">
      <div
        role="tablist"
        aria-label="Filter lokasi server"
        aria-orientation="horizontal"
        onKeyDown={handleKeyDown}
        className="overflow-x-auto rounded-full border border-[var(--border-subtle)] bg-white p-1 shadow-[var(--card-shadow)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden touch-pan-x snap-x snap-mandatory scroll-smooth sm:p-1.5"
      >
        <div className="flex items-center gap-1 px-1 pr-12 sm:gap-1.5 sm:pr-1">
          {tabs.map((t, i) => {
            const isActive = activeTab === t;
            return (
              <button
                key={t}
                ref={(el) => { tabRefs.current[i] = el; }}
                type="button"
                role="tab"
                id={`tab-${t}`}
                aria-selected={isActive}
                aria-controls="marketplace-packages"
                tabIndex={isActive ? 0 : -1}
                onClick={() => onChange(t)}
                className={`snap-start shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 sm:px-4 sm:py-2 sm:text-sm lg:px-5 lg:py-2.5 ${
                  isActive
                    ? "bg-[var(--accent)] text-white shadow-[0_4px_12px_-4px_var(--accent-ring)]"
                    : "text-[var(--text-muted)] hover:bg-[var(--card-muted)] hover:text-[var(--accent-strong)]"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>
      {/* Fade hint for mobile scroll */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-full w-8 rounded-r-full bg-gradient-to-l from-white via-white/80 to-transparent sm:hidden"
      />
    </div>
  );
}

function MarketplacePreview() {
  const [activeTab, setActiveTab] = useState("All");
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

        <div className="-mx-5 mt-7 px-5 sm:mx-0 sm:px-0">
          <LocationTabs activeTab={activeTab} onChange={setActiveTab} />
        </div>

        <div
          role="tabpanel"
          id="marketplace-packages"
          aria-labelledby={`tab-${activeTab}`}
          className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
        >
          {packages.map((p) => (

            <PackageCard key={p.name} pkg={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PackageCard({ pkg }: { pkg: Pkg }) {
  const thumb = pkg.type === "VPS" ? thumbVps : thumbBareMetal;
  const [imgError, setImgError] = useState(false);
  const altText = `${pkg.name} — ${pkg.type} dengan ${pkg.cores}, ${pkg.ram}, ${pkg.storage} di NodeKPT`;
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [adding, setAdding] = useState(false);

  const handleDeploy = useCallback(() => {
    setAdding(true);
    const saved = addItem({
      id: `package:${pkg.name}`,
      name: pkg.name,
      price: pkg.price,
      suffix: pkg.suffix,
      kind: "package",
    });
    toast.success(`${pkg.name} ditambahkan ke cart`, {
      description: `${pkg.price} ${pkg.suffix ?? ""} · total ${saved.qty} di cart`,
      action: {
        label: "Lihat cart",
        onClick: () => navigate({ to: "/wallet" }),
      },
    });
    window.setTimeout(() => setAdding(false), 450);
  }, [addItem, pkg.name, pkg.price, pkg.suffix, navigate]);

  return (
    <article className="card-interactive group flex flex-col overflow-hidden">
      {/* Thumbnail */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[16/10] overflow-hidden bg-[#0b1220]">
        {!imgError ? (
          <img
            src={thumb}
            alt={altText}
            loading="lazy"
            decoding="async"
            width={1024}
            height={640}
            sizes="(min-width: 1280px) 320px, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="absolute inset-0 block h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            role="img"
            aria-label={altText}
            tabIndex={0}
            className="absolute inset-0 flex flex-col items-center justify-center bg-[#0b1220] text-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--accent)]"
          >
            <Server className="h-10 w-10 text-white/30" aria-hidden="true" />
            <span className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-white/50">
              {pkg.type}
            </span>
          </div>
        )}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-[#05070d]/70 to-transparent"
        />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
          <span className="rounded-full bg-black/40 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.22em] text-white/80 backdrop-blur">
            NODEKPT
          </span>
          <span
            className={`rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider backdrop-blur ${
              pkg.type === "VPS"
                ? "bg-[var(--accent)]/25 text-white"
                : "bg-sky-500/30 text-white"
            }`}
          >
            {pkg.type}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-white/60">
            CPU
          </div>
          <div className="mt-0.5 text-[14px] font-bold leading-tight line-clamp-1">
            {pkg.cpu}
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
            <SpecMini icon={Cpu} label={pkg.cores} />
            <SpecMini icon={MemoryStick} label={pkg.ram} />
            <SpecMini icon={HardDrive} label={pkg.storage} full />
          </div>
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
          <button
            type="button"
            onClick={handleDeploy}
            disabled={adding}
            className="btn-primary h-9 px-3.5 text-xs disabled:opacity-70"
            aria-label={`Tambahkan ${pkg.name} ke cart`}
          >
            {adding ? "Added" : "Deploy"}
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

/* ----------------------------- ADD-ONS & MANAGED SERVICES ----------------------------- */
type AddOn = {
  icon: React.ComponentType<{ className?: string }>;
  tag: "Storage" | "Network" | "Security" | "Managed";
  name: string;
  desc: string;
  chips: string[];
  price: string;
  suffix: string;
  accent: "teal" | "sky" | "violet" | "amber";
};

const addOns: AddOn[] = [
  {
    icon: Cloud,
    tag: "Storage",
    name: "Object Storage S3",
    desc: "S3-compatible storage. Serve assets, backup, or media from Jakarta & Singapore.",
    chips: ["S3 API", "Egress murah", "99.9% SLA"],
    price: "Rp 250/GB",
    suffix: "/bulan · billed per jam",
    accent: "teal",
  },
  {
    icon: HardDriveDownload,
    tag: "Managed",
    name: "Managed Backup",
    desc: "Auto snapshot harian dengan retensi 7–30 hari. Restore satu klik dari panel.",
    chips: ["Daily snapshot", "Off-site", "1-click restore"],
    price: "Rp 15rb",
    suffix: "/instance · /bulan",
    accent: "sky",
  },
  {
    icon: ShieldAlert,
    tag: "Security",
    name: "DDoS Shield Pro",
    desc: "Proteksi L3/L4 hingga 500 Gbps + rules L7 kustom. Aktifkan langsung tanpa reconfig.",
    chips: ["L3–L7", "500 Gbps", "Always-on"],
    price: "Rp 99rb",
    suffix: "/domain · /bulan",
    accent: "violet",
  },
  {
    icon: Zap,
    tag: "Network",
    name: "CDN Global Edge",
    desc: "Cache di 30+ PoP. Origin shielding, image optimization, dan HTTP/3 out-of-the-box.",
    chips: ["30+ PoP", "HTTP/3", "Image opt"],
    price: "Rp 120/GB",
    suffix: "traffic · pay as you go",
    accent: "amber",
  },
  {
    icon: Waypoints,
    tag: "Network",
    name: "Load Balancer",
    desc: "L4/L7 balancer dengan health check, sticky session, dan TLS termination gratis.",
    chips: ["L4 & L7", "Health check", "Free TLS"],
    price: "Rp 45rb",
    suffix: "/LB · /bulan",
    accent: "teal",
  },
  {
    icon: Database,
    tag: "Managed",
    name: "Managed Database",
    desc: "PostgreSQL & MySQL fully managed. Auto backup, replikasi, dan monitoring built-in.",
    chips: ["PostgreSQL", "MySQL", "Auto backup"],
    price: "Mulai Rp 85rb",
    suffix: "/bulan · 2 vCPU / 4 GB",
    accent: "sky",
  },
];

const accentMap: Record<AddOn["accent"], { bg: string; text: string; ring: string }> = {
  teal:   { bg: "bg-[var(--accent-tint)]",       text: "text-[var(--accent-strong)]", ring: "ring-[var(--accent)]/15" },
  sky:    { bg: "bg-sky-100",                    text: "text-sky-700",                ring: "ring-sky-500/15" },
  violet: { bg: "bg-violet-100",                 text: "text-violet-700",             ring: "ring-violet-500/15" },
  amber:  { bg: "bg-amber-100",                  text: "text-amber-700",              ring: "ring-amber-500/15" },
};

function AddOns() {
  return (
    <section
      id="add-ons"
      aria-labelledby="add-ons-heading"
      className="relative border-t border-[var(--border-subtle)] bg-[color:var(--bg)]"
    >
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4 sm:gap-6">
          <div className="min-w-0">
            <div className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--accent)]">
              Add-ons & Managed Services
            </div>
            <h2
              id="add-ons-heading"
              className="mt-3 text-3xl font-black tracking-tight text-[var(--text)] sm:text-4xl md:text-5xl"
            >
              Perkuat VPS-mu dengan{" "}
              <span className="text-[var(--accent)]">Layanan Tambahan</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm text-[var(--text-muted)] sm:mt-4 sm:text-base">
              Storage, network, dan security siap-pakai — bisa dipasang ke package
              apa pun, dari seller mana pun. Bayar per pemakaian.
            </p>
          </div>

          <Link
            to="/marketplace"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] transition-all hover:gap-2.5"
          >
            Lihat semua add-ons <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {addOns.map((a) => (
            <AddOnCard key={a.name} addOn={a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AddOnCard({ addOn }: { addOn: AddOn }) {
  const { icon: Icon, tag, name, desc, chips, price, suffix, accent } = addOn;
  const c = accentMap[accent];
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [adding, setAdding] = useState(false);

  const handleAdd = useCallback(() => {
    setAdding(true);
    const saved = addItem({
      id: `addon:${name}`,
      name,
      price,
      suffix,
      kind: "addon",
    });
    toast.success(`${name} ditambahkan ke cart`, {
      description: `${price} ${suffix ?? ""} · total ${saved.qty} di cart`,
      action: {
        label: "Lihat cart",
        onClick: () => navigate({ to: "/wallet" }),
      },
    });
    window.setTimeout(() => setAdding(false), 450);
  }, [addItem, name, price, suffix, navigate]);

  return (
    <article className="card-interactive group relative flex flex-col overflow-hidden p-6 sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <div
          className={`grid h-12 w-12 place-items-center rounded-2xl ring-1 ${c.bg} ${c.text} ${c.ring} transition-transform group-hover:-rotate-6`}
        >
          <Icon className="h-5.5 w-5.5" />
        </div>
        <span className="rounded-full border border-[var(--border-subtle)] bg-white px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-faint)]">
          {tag}
        </span>
      </div>

      <h3 className="mt-5 text-[17px] font-bold leading-snug text-[var(--text)]">
        {name}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-muted)]">
        {desc}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {chips.map((chip) => (
          <span
            key={chip}
            className="rounded-full bg-[var(--card-muted)] px-2 py-0.5 text-[10px] font-semibold text-[var(--text-muted)]"
          >
            {chip}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-end justify-between gap-2 border-t border-[var(--border-subtle)] pt-4">
        <div className="min-w-0">
          <div className="text-lg font-black leading-none text-[var(--text)]">
            {price}
          </div>
          <div className="mt-1 truncate text-[10px] text-[var(--text-faint)]">
            {suffix}
          </div>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={adding}
          className="btn-primary h-9 px-3.5 text-xs disabled:opacity-70"
          aria-label={`Tambahkan ${name} ke cart`}
        >
          {adding ? "Added" : "Add"}
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </article>
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
          <div className="col-span-2 md:col-span-4 lg:col-span-1">

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
