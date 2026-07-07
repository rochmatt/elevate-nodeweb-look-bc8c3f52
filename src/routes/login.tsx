import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowRight, Eye, EyeOff, Layers, Lock, Mail, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — NodeKPT" },
      { name: "description", content: "Log in to your NodeKPT account to manage VPS, orders, wallet, and packages." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { signIn, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (isAuthenticated) {
    if (typeof window !== "undefined") router.navigate({ to: "/dashboard" });
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email.includes("@") || password.length < 4) {
      setError("Enter a valid email and password (min 4 chars).");
      return;
    }
    setBusy(true);
    try {
      await signIn(email, password);
      navigate({ to: "/dashboard" });
    } catch {
      setError("Could not sign in. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return <AuthShell mode="login">
    <form onSubmit={onSubmit} className="space-y-4">
      <Field
        label="Email"
        icon={<Mail className="h-4 w-4" />}
        type="email"
        autoComplete="email"
        value={email}
        onChange={setEmail}
        placeholder="you@company.com"
      />
      <Field
        label="Password"
        icon={<Lock className="h-4 w-4" />}
        type={showPass ? "text" : "password"}
        autoComplete="current-password"
        value={password}
        onChange={setPassword}
        placeholder="••••••••"
        rightSlot={
          <button
            type="button"
            aria-label={showPass ? "Hide password" : "Show password"}
            onClick={() => setShowPass((v) => !v)}
            className="grid h-8 w-8 place-items-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
      />

      <div className="flex items-center justify-between text-xs">
        <label className="inline-flex cursor-pointer items-center gap-2 text-slate-500">
          <input type="checkbox" className="h-3.5 w-3.5 rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
          Remember me
        </label>
        <a href="#" className="font-medium text-teal-700 hover:underline">Forgot password?</a>
      </div>

      {error && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={busy}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-teal-600 text-sm font-semibold text-white shadow-[0_10px_25px_-10px_rgba(13,148,136,0.7)] transition-all hover:brightness-110 disabled:opacity-70"
      >
        {busy ? "Signing in…" : (<>Sign in <ArrowRight className="h-4 w-4" /></>)}
      </button>

      <p className="pt-1 text-center text-sm text-slate-500">
        New to NodeKPT?{" "}
        <Link to="/signup" className="font-semibold text-teal-700 hover:underline">
          Create an account
        </Link>
      </p>
    </form>
  </AuthShell>;
}

/* --------------------------- shared shell --------------------------- */

export function AuthShell({ children, mode }: { children: React.ReactNode; mode: "login" | "signup" }) {
  const isLogin = mode === "login";
  return (
    <div className="theme-light min-h-screen bg-[var(--bg)]">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-2">
        {/* form side */}
        <div className="flex items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            <Link to="/" className="mb-8 inline-flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--accent)] text-white shadow-[0_6px_18px_-6px_var(--accent-ring)]">
                <Layers className="h-4 w-4" strokeWidth={2.4} />
              </div>
              <span className="text-[17px] font-bold tracking-tight text-[var(--text)]">
                Node<span className="text-[var(--accent)]">KPT</span>
              </span>
            </Link>

            <h1 className="text-3xl font-black tracking-tight text-[var(--text)] sm:text-4xl">
              {isLogin ? "Welcome back" : "Create your account"}
            </h1>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              {isLogin
                ? "Sign in to manage your VPS, orders, and wallet."
                : "Start deploying VPS, Bare Metal & Proxy in minutes."}
            </p>

            <div className="mt-7">{children}</div>

            <p className="mt-8 text-center text-[11px] text-[var(--text-faint)]">
              By continuing you agree to NodeKPT's Terms & Privacy Policy.
            </p>
          </div>
        </div>

        {/* brand side */}
        <aside className="relative hidden overflow-hidden bg-gradient-to-br from-teal-600 via-teal-500 to-sky-500 lg:block">
          <div
            aria-hidden
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4) 0, transparent 40%), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.3) 0, transparent 45%)",
            }}
          />
          <div className="relative flex h-full flex-col justify-between p-12 text-white">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest ring-1 ring-inset ring-white/30">
                <Sparkles className="h-3 w-3" /> NodeKPT Cloud
              </div>
              <h2 className="mt-6 text-4xl font-black leading-tight">
                Buy & Sell VPS,<br /> Bare Metal & Proxy
              </h2>
              <p className="mt-4 max-w-sm text-white/85">
                A marketplace built for full control — deploy in minutes and pay in Rupiah.
              </p>
            </div>

            <ul className="space-y-4">
              {[
                { icon: Zap, title: "Deploy in minutes", desc: "Provision servers instantly from trusted sellers." },
                { icon: ShieldCheck, title: "Buyer protection", desc: "Escrow-backed payments with dispute support." },
                { icon: Sparkles, title: "One integrated panel", desc: "Manage every server without leaving NodeKPT." },
              ].map(({ icon: Icon, title, desc }) => (
                <li key={title} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/15 ring-1 ring-inset ring-white/25">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold">{title}</div>
                    <div className="text-xs text-white/80">{desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function Field({
  label,
  icon,
  rightSlot,
  value,
  onChange,
  ...rest
}: {
  label: string;
  icon?: React.ReactNode;
  rightSlot?: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </span>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}
        <input
          {...rest}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`h-12 w-full rounded-xl border border-slate-200 bg-white text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 ${icon ? "pl-10" : "pl-4"} ${rightSlot ? "pr-12" : "pr-4"}`}
        />
        {rightSlot && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2">{rightSlot}</span>
        )}
      </div>
    </label>
  );
}
