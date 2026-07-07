import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowRight, Eye, EyeOff, Lock, Mail, UserRound } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { AuthShell, Field } from "./login";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create account — NodeKPT" },
      { name: "description", content: "Create your NodeKPT account to buy VPS, Bare Metal, and Proxy from trusted sellers." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (name.trim().length < 2) return setError("Please enter your full name.");
    if (!email.includes("@")) return setError("Enter a valid email.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");

    setBusy(true);
    try {
      await signUp(name, email, password);
      navigate({ to: "/dashboard" });
    } catch {
      setError("Could not create account. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthShell mode="signup">
      <form onSubmit={onSubmit} className="space-y-4">
        <Field
          label="Full name"
          icon={<UserRound className="h-4 w-4" />}
          value={name}
          onChange={setName}
          autoComplete="name"
          placeholder="Jane Doe"
        />
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
          autoComplete="new-password"
          value={password}
          onChange={setPassword}
          placeholder="At least 6 characters"
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
          {busy ? "Creating account…" : (<>Create account <ArrowRight className="h-4 w-4" /></>)}
        </button>

        <p className="pt-1 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-teal-700 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
