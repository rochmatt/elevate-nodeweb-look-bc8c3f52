import { Link, useLocation } from "@tanstack/react-router";
import { Bell, Home, MessageCircle, ShoppingCart, Store, UserRound } from "lucide-react";
import { initialsFor, useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";

type Item = {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
};

const ITEMS: Item[] = [
  { to: "/", label: "Home", icon: Home },
  { to: "/marketplace", label: "Market", icon: Store },
  { to: "/orders", label: "Chat", icon: MessageCircle, badge: "3" },
  { to: "/wallet", label: "Cart", icon: ShoppingCart, badge: "2" },
];

export function MobileBottomNav() {
  const { pathname } = useLocation();
  const { user, isAuthenticated } = useAuth();

  return (
    <>
      {/* spacer so page content isn't hidden behind the fixed bar */}
      <div aria-hidden className="h-20 lg:hidden" />

      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-40 lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="pointer-events-none absolute inset-x-0 -top-6 h-6 bg-gradient-to-t from-black/5 to-transparent" />
        <div className="mx-auto max-w-md px-3 pb-2 pt-2">
          <ul className="relative flex items-stretch justify-between rounded-2xl border border-[var(--border-subtle)] bg-white/95 px-1.5 py-1.5 shadow-[0_10px_30px_-12px_rgba(15,23,42,0.25)] backdrop-blur-xl">
            {ITEMS.map((item) => {
              const active =
                item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              return (
                <li key={item.to} className="flex-1">
                  <NavTile item={item} active={active} />
                </li>
              );
            })}

            {/* Account / notifications tile — swaps between avatar and login */}
            <li className="flex-1">
              {isAuthenticated && user ? (
                <Link
                  to="/profile"
                  aria-label="Profile"
                  className={tileClass(pathname.startsWith("/profile"))}
                >
                  <span className="relative grid h-6 w-6 place-items-center">
                    <span
                      className="grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold text-white"
                      style={{ backgroundColor: user.avatarColor }}
                    >
                      {initialsFor(user.name).slice(0, 1) || "U"}
                    </span>
                  </span>
                  <span className="mt-1 text-[10px] font-semibold">Me</span>
                </Link>
              ) : (
                <Link to="/login" aria-label="Log in" className={tileClass(pathname === "/login")}>
                  <IconWithBadge Icon={UserRound} active={pathname === "/login"} />
                  <span className="mt-1 text-[10px] font-semibold">Log in</span>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

function NavTile({ item, active }: { item: Item; active: boolean }) {
  const { icon: Icon, label, badge, to } = item;
  return (
    <Link to={to} aria-label={label} aria-current={active ? "page" : undefined} className={tileClass(active)}>
      <IconWithBadge Icon={Icon} active={active} badge={badge} />
      <span className="mt-1 text-[10px] font-semibold">{label}</span>
    </Link>
  );
}

function IconWithBadge({
  Icon,
  active,
  badge,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  badge?: string;
}) {
  return (
    <span className="relative grid h-6 w-6 place-items-center">
      <Icon
        className={`h-[18px] w-[18px] transition-colors ${
          active ? "text-[var(--accent-strong)]" : "text-[var(--text-muted)]"
        }`}
      />
      {badge && (
        <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-[var(--accent)] px-1 text-[9px] font-bold leading-none text-white ring-2 ring-white">
          {badge}
        </span>
      )}
    </span>
  );
}

function tileClass(active: boolean) {
  return [
    "group flex flex-col items-center justify-center rounded-xl px-2 py-1.5 transition-all",
    active
      ? "bg-[var(--accent-tint)] text-[var(--accent-strong)]"
      : "text-[var(--text-muted)] hover:bg-slate-50 hover:text-[var(--text)]",
  ].join(" ");
}

/* fallback icon reused if Bell needed elsewhere */
export { Bell };
