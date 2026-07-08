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
import { HoverPopover } from "@/components/HoverPopover";

export function UserMenu() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const items = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/orders", label: "Orders", icon: ShoppingBag },
    { to: "/invoices", label: "Invoices", icon: Receipt },
    { to: "/wallet", label: "Wallet", icon: Wallet },
    { to: "/profile", label: "Profile", icon: UserRound },
    { to: "/manage-packages", label: "Manage packages", icon: Settings },
  ] as const;

  const displayName = user.name || "Account";
  const initial = initialsFor(displayName) || "U";

  return (
    <HoverPopover
      align="end"
      contentClassName="w-64"
      trigger={
        <button
          type="button"
          aria-label={`Account menu for ${displayName}`}
          className="group inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-white/80 py-1 pl-1 pr-2.5 shadow-sm outline-none transition-all hover:border-[var(--accent)]/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)] data-[state=open]:border-[var(--accent)]/40 data-[state=open]:shadow-md sm:pr-3"
        >
          <span
            className="grid h-8 w-8 place-items-center rounded-full text-[12px] font-semibold text-white"
            style={{ backgroundColor: user.avatarColor }}
            aria-hidden="true"
          >
            {initial}
          </span>
          <span className="hidden max-w-[7rem] truncate text-sm font-semibold text-[var(--text)] sm:inline">
            {displayName}
          </span>
          <ChevronDown
            aria-hidden="true"
            className="h-3.5 w-3.5 text-[var(--text-faint)] transition-transform group-data-[state=open]:rotate-180"
          />
        </button>
      }
    >
      <div className="border-b border-[var(--border-subtle)] px-4 py-3.5">
        <div className="flex items-center gap-3">
          <span
            className="grid h-10 w-10 place-items-center rounded-full text-sm font-semibold text-white"
            style={{ backgroundColor: user.avatarColor }}
            aria-hidden="true"
          >
            {initial}
          </span>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-[var(--text)]">
              {displayName}
            </div>
            <div className="truncate text-xs text-[var(--text-faint)]">
              {user.email}
            </div>
          </div>
        </div>
      </div>

      <div className="py-1.5">
        {items.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex cursor-pointer items-center gap-3 px-4 py-2 text-sm text-[var(--text-muted)] transition-colors hover:bg-[var(--accent-tint)] hover:text-[var(--accent-strong)]"
          >
            <Icon aria-hidden="true" className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </div>

      <div className="border-t border-[var(--border-subtle)] p-1.5">
        <button
          type="button"
          onClick={() => {
            signOut();
            navigate({ to: "/" });
          }}
          className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
        >
          <LogOut aria-hidden="true" className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </HoverPopover>
  );
}

export function AuthActions() {
  const { isAuthenticated, ready } = useAuth();

  if (ready && isAuthenticated) return <UserMenu />;

  return (
    <div className="flex items-center gap-1.5">
      <Link
        to="/login"
        className="hidden h-10 items-center rounded-full px-4 text-sm font-semibold text-[var(--text-muted)] transition-colors hover:bg-[var(--accent-tint)] hover:text-[var(--accent-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)] sm:inline-flex"
      >
        Log in
      </Link>
      <Link
        to="/signup"
        className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[var(--accent)] px-4 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_var(--accent-ring)] transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent-ring)]"
      >
        Sign up
      </Link>
    </div>
  );
}
