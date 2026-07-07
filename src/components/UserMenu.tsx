import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  LogOut,
  Receipt,
  Settings,
  ShoppingBag,
  UserRound,
  Wallet,
  ChevronDown,
} from "lucide-react";
import { initialsFor, useAuth } from "@/hooks/useAuth";

export function UserMenu() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!user) return null;

  const items = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/orders", label: "Orders", icon: ShoppingBag },
    { to: "/invoices", label: "Invoices", icon: Receipt },
    { to: "/wallet", label: "Wallet", icon: Wallet },
    { to: "/profile", label: "Profile", icon: UserRound },
    { to: "/manage-packages", label: "Manage packages", icon: Settings },
  ] as const;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="group inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-white/80 py-1 pl-1 pr-2.5 shadow-sm transition-all hover:border-[var(--accent)]/40 hover:shadow-md sm:pr-3"
      >
        <span
          className="grid h-8 w-8 place-items-center rounded-full text-[12px] font-semibold text-white"
          style={{ backgroundColor: user.avatarColor }}
          aria-hidden
        >
          {initialsFor(user.name) || "U"}
        </span>
        <span className="hidden max-w-[7rem] truncate text-sm font-semibold text-[var(--text)] sm:inline">
          {user.name}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-[var(--text-faint)] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-64 origin-top-right overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white shadow-[0_20px_60px_-15px_rgba(15,23,42,0.25)]"
        >
          <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] px-4 py-3.5">
            <span
              className="grid h-10 w-10 place-items-center rounded-full text-sm font-semibold text-white"
              style={{ backgroundColor: user.avatarColor }}
              aria-hidden
            >
              {initialsFor(user.name) || "U"}
            </span>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-[var(--text)]">
                {user.name}
              </div>
              <div className="truncate text-xs text-[var(--text-faint)]">
                {user.email}
              </div>
            </div>
          </div>

          <ul className="py-1.5">
            {items.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--text-muted)] transition-colors hover:bg-[var(--accent-tint)] hover:text-[var(--accent-strong)]"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="border-t border-[var(--border-subtle)] p-1.5">
            <button
              role="menuitem"
              onClick={() => {
                signOut();
                setOpen(false);
                navigate({ to: "/" });
              }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function AuthActions() {
  const { isAuthenticated, ready } = useAuth();

  if (!ready) {
    return <div className="h-10 w-24 animate-pulse rounded-full bg-[var(--accent-tint)]" />;
  }

  if (isAuthenticated) return <UserMenu />;

  return (
    <div className="flex items-center gap-1.5">
      <Link
        to="/login"
        className="hidden h-10 items-center rounded-full px-4 text-sm font-semibold text-[var(--text-muted)] transition-colors hover:bg-[var(--accent-tint)] hover:text-[var(--accent-strong)] sm:inline-flex"
      >
        Log in
      </Link>
      <Link
        to="/signup"
        className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[var(--accent)] px-4 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_var(--accent-ring)] transition-all hover:brightness-110"
      >
        Sign up
      </Link>
    </div>
  );
}
