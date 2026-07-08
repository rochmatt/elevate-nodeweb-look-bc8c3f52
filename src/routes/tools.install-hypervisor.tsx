import { createFileRoute, Link } from "@tanstack/react-router";
import { Monitor, ArrowLeft, Server, CheckCircle2, Copy, Terminal } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/tools/install-hypervisor")({
  head: () => ({
    meta: [
      { title: "Install Hypervisor — NodeKPT" },
      {
        name: "description",
        content:
          "Install and configure Proxmox, VMware, or Hyper-V hypervisors on your NodeKPT bare-metal nodes.",
      },
      { property: "og:title", content: "Install Hypervisor — NodeKPT" },
      {
        property: "og:description",
        content:
          "Install and configure Proxmox, VMware, or Hyper-V hypervisors on your NodeKPT bare-metal nodes.",
      },
      {
        property: "og:url",
        content: "https://elevate-nodeweb-look.lovable.app/tools/install-hypervisor",
      },
      { property: "og:type", content: "website" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://elevate-nodeweb-look.lovable.app/tools/install-hypervisor",
      },
    ],
  }),
  component: InstallHypervisorPage,
});

const HYPERVISORS = [
  {
    key: "proxmox",
    name: "Proxmox VE",
    description: "Open-source virtualization platform with LXC and KVM support.",
    icon: Server,
  },
  {
    key: "vmware",
    name: "VMware ESXi",
    description: "Enterprise bare-metal hypervisor for production workloads.",
    icon: Server,
  },
  {
    key: "hyperv",
    name: "Microsoft Hyper-V",
    description: "Native Windows Server virtualization with live migration.",
    icon: Monitor,
  },
];

function InstallHypervisorPage() {
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText(
      "curl -fsSL https://elevate-nodeweb-look.lovable.app/install-hv | bash",
    );
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
              <Monitor className="h-8 w-8" strokeWidth={1.8} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Install Hypervisor</h1>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Choose a hypervisor and flash it to your NodeKPT bare-metal node. Automated scripts
                handle networking, storage, and first-boot configuration.
              </p>
            </div>
          </div>

          <div className="border-t px-6 py-6 sm:px-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Supported hypervisors
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {HYPERVISORS.map((hv) => (
                <button
                  key={hv.key}
                  type="button"
                  className="group flex flex-col gap-2 rounded-2xl border border-[color:var(--border-subtle)] bg-white/70 p-4 text-left transition-all hover:border-[color:var(--accent)]/35 hover:bg-white hover:shadow-lg"
                >
                  <hv.icon
                    className="h-6 w-6 text-[color:var(--accent-strong)]"
                    strokeWidth={1.8}
                  />
                  <span className="text-sm font-semibold">{hv.name}</span>
                  <span className="text-xs text-muted-foreground">{hv.description}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t px-6 py-6 sm:px-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              One-line installer
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Run this on a fresh bare-metal node. The script detects hardware and installs the best
              matching hypervisor.
            </p>
            <div className="mt-4 flex items-center gap-2 rounded-2xl border border-[color:var(--border-subtle)] bg-black/5 p-3 font-mono text-xs sm:text-sm">
              <Terminal className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="min-w-0 flex-1 truncate">
                curl -fsSL https://elevate-nodeweb-look.lovable.app/install-hv | bash
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
        </div>
      </main>
    </div>
  );
}
