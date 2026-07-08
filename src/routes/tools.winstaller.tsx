import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, ArrowLeft, Monitor, CheckCircle2, Copy, Terminal } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/tools/winstaller")({
  head: () => ({
    meta: [
      { title: "Winstaller — NodeKPT" },
      {
        name: "description",
        content:
          "Download NodeKPT Winstaller to provision Windows VPS and bare-metal nodes with one click.",
      },
      { property: "og:title", content: "Winstaller — NodeKPT" },
      {
        property: "og:description",
        content:
          "Download NodeKPT Winstaller to provision Windows VPS and bare-metal nodes with one click.",
      },
      { property: "og:url", content: "https://elevate-nodeweb-look.lovable.app/tools/winstaller" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://elevate-nodeweb-look.lovable.app/tools/winstaller" }],
  }),
  component: WinstallerPage,
});

const DOWNLOADS = [
  { label: "Windows x64 Installer", size: "24 MB", url: "#download-win-x64" },
  { label: "Windows ARM64 Installer", size: "22 MB", url: "#download-win-arm64" },
  { label: "Portable ZIP", size: "31 MB", url: "#download-portable" },
];

const STEPS = [
  "Download the installer for your architecture.",
  "Run the executable as Administrator.",
  "Paste your NodeKPT API key or scan the QR code from your dashboard.",
  "Select the node template and region, then click Deploy.",
];

function WinstallerPage() {
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText("irm https://elevate-nodeweb-look.lovable.app/get-winstaller | iex");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="theme-light min-h-screen bg-background text-foreground">
      <div className="constellation pointer-events-none fixed inset-0 opacity-40" aria-hidden />
      <div
        className="radial-glow pointer-events-none fixed left-1/3 top-0 h-[600px] w-[900px] -translate-x-1/2"
        aria-hidden
      />

      <main className="relative mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="card-surface overflow-hidden">
          <div className="flex flex-col items-start gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[color:var(--accent-soft)] to-[color:var(--accent)] text-white shadow-lg">
              <Download className="h-8 w-8" strokeWidth={1.8} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Winstaller</h1>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                One-click Windows provisioning for every NodeKPT node. Pick your architecture,
                install, and deploy in minutes.
              </p>
            </div>
          </div>

          <div className="border-t px-6 py-6 sm:px-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Download
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {DOWNLOADS.map((dl) => (
                <a
                  key={dl.label}
                  href={dl.url}
                  className="group flex flex-col gap-2 rounded-2xl border border-[color:var(--border-subtle)] bg-white/70 p-4 transition-all hover:border-[color:var(--accent)]/35 hover:bg-white hover:shadow-lg"
                >
                  <Monitor className="h-6 w-6 text-[color:var(--accent-strong)]" strokeWidth={1.8} />
                  <span className="text-sm font-semibold">{dl.label}</span>
                  <span className="text-xs text-muted-foreground">{dl.size}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="border-t px-6 py-6 sm:px-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Quick install via PowerShell
            </h2>
            <div className="mt-4 flex items-center gap-2 rounded-2xl border border-[color:var(--border-subtle)] bg-black/5 p-3 font-mono text-xs sm:text-sm">
              <Terminal className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="min-w-0 flex-1 truncate">
                irm https://elevate-nodeweb-look.lovable.app/get-winstaller | iex
              </span>
              <button
                type="button"
                onClick={copyCommand}
                className="shrink-0 rounded-lg p-2 transition-colors hover:bg-black/5"
                aria-label="Copy command"
              >
                {copied ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>

          <div className="border-t px-6 py-6 sm:px-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              How it works
            </h2>
            <ol className="mt-4 space-y-3">
              {STEPS.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color:var(--accent-tint)] text-xs font-bold text-[color:var(--accent-strong)]">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}
