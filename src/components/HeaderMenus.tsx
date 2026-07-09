import { Link } from "@tanstack/react-router";
import { Bell, Check, Globe, MessageSquare, ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";
import { HoverPopover } from "@/components/HoverPopover";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/hooks/useCart";
import { useLanguage } from "@/hooks/useLanguage";

function IconButton({
  label,
  count,
  children,
}: {
  label: string;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <span className="relative grid h-10 w-10 place-items-center rounded-full text-[var(--text-muted)] transition-colors hover:bg-[var(--accent-tint)] hover:text-[var(--accent-strong)]">
      {children}
      {count && count > 0 ? (
        <span
          aria-label={`${count} ${label}`}
          className="absolute -right-0.5 -top-0.5 grid h-4 min-w-[1rem] place-items-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-bold leading-none text-white shadow-sm"
        >
          {count > 9 ? "9+" : count}
        </span>
      ) : null}
    </span>
  );
}

function PopoverShell({
  title,
  action,
  children,
  empty,
}: {
  title: string;
  action?: React.ReactNode;
  empty?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-4 py-3">
        <div className="text-sm font-semibold text-[var(--text)]">{title}</div>
        {action}
      </div>
      <div className="max-h-80 overflow-y-auto">
        {empty ?? children}
      </div>
    </>
  );
}

export function CartMenu() {
  const { items, count, removeItem } = useCart();

  return (
    <HoverPopover
      contentClassName="w-80"
      trigger={
        <button type="button" aria-label="Cart">
          <IconButton label="items in cart" count={count}>
            <ShoppingCart className="h-4.5 w-4.5" />
          </IconButton>
        </button>
      }
    >
      <PopoverShell
        title="Your cart"
        action={
          items.length ? (
            <Link
              to="/orders"
              className="text-xs font-semibold text-[var(--accent-strong)] hover:underline"
            >
              Checkout
            </Link>
          ) : null
        }
        empty={
          items.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <ShoppingCart
                aria-hidden="true"
                className="mx-auto h-8 w-8 text-[var(--text-faint)]"
              />
              <div className="mt-2 text-sm text-[var(--text-muted)]">
                Your cart is empty
              </div>
              <Link
                to="/marketplace"
                className="mt-3 inline-block text-xs font-semibold text-[var(--accent-strong)] hover:underline"
              >
                Browse marketplace →
              </Link>
            </div>
          ) : undefined
        }
      >
        <ul className="divide-y divide-[var(--border-subtle)]">
          {items.map((it) => (
            <li key={it.id} className="flex items-start gap-3 px-4 py-3">
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-[var(--text)]">
                  {it.name}
                </div>
                <div className="text-xs text-[var(--text-faint)]">
                  {it.qty} × {it.price}
                  {it.suffix ?? ""}
                </div>
              </div>
              <button
                type="button"
                aria-label={`Remove ${it.name}`}
                onClick={() => removeItem(it.id)}
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[var(--text-faint)] transition-colors hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      </PopoverShell>
    </HoverPopover>
  );
}

const NOTIFICATIONS = [
  {
    id: "n1",
    title: "Order #INV-2087 paid",
    body: "Your VPS is being provisioned in Singapore.",
    time: "2m ago",
    unread: true,
  },
  {
    id: "n2",
    title: "New promo: 20% off Bare Metal",
    body: "Limited seats for July. Use code METAL20.",
    time: "1h ago",
    unread: true,
  },
  {
    id: "n3",
    title: "Wallet top-up successful",
    body: "IDR 500,000 added to your balance.",
    time: "Yesterday",
    unread: false,
  },
];

export function NotificationsMenu() {
  const unread = NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <HoverPopover
      contentClassName="w-80"
      trigger={
        <button type="button" aria-label="Notifications">
          <IconButton label="unread notifications" count={unread}>
            <Bell className="h-4.5 w-4.5" />
          </IconButton>
        </button>
      }
    >
      <PopoverShell
        title="Notifications"
        action={
          <button
            type="button"
            className="text-xs font-semibold text-[var(--accent-strong)] hover:underline"
          >
            Mark all read
          </button>
        }
      >
        <ul className="divide-y divide-[var(--border-subtle)]">
          {NOTIFICATIONS.map((n) => (
            <li
              key={n.id}
              className="flex gap-3 px-4 py-3 transition-colors hover:bg-[var(--accent-tint)]/50"
            >
              <span
                aria-hidden="true"
                className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                  n.unread ? "bg-[var(--accent)]" : "bg-transparent"
                }`}
              />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-[var(--text)]">
                  {n.title}
                </div>
                <div className="line-clamp-2 text-xs text-[var(--text-muted)]">
                  {n.body}
                </div>
                <div className="mt-0.5 text-[10px] uppercase tracking-wide text-[var(--text-faint)]">
                  {n.time}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </PopoverShell>
    </HoverPopover>
  );
}

const MESSAGES = [
  {
    id: "m1",
    from: "Support · Ayu",
    body: "Hi! Your ticket #4821 has been updated with a new reply.",
    time: "5m ago",
    unread: true,
    color: "#0ea5a4",
  },
  {
    id: "m2",
    from: "Seller · CloudMax",
    body: "Thanks for your order! Setup instructions are attached.",
    time: "3h ago",
    unread: true,
    color: "#7c3aed",
  },
  {
    id: "m3",
    from: "NodeKPT Team",
    body: "Weekly digest: 3 new locations available this week.",
    time: "2d ago",
    unread: false,
    color: "#f59e0b",
  },
];

export function MessagesMenu() {
  const unread = MESSAGES.filter((m) => m.unread).length;

  return (
    <HoverPopover
      contentClassName="w-80"
      trigger={
        <button type="button" aria-label="Messages">
          <IconButton label="unread messages" count={unread}>
            <MessageSquare className="h-4.5 w-4.5" />
          </IconButton>
        </button>
      }
    >
      <PopoverShell
        title="Messages"
        action={
          <button
            type="button"
            className="text-xs font-semibold text-[var(--accent-strong)] hover:underline"
          >
            Open inbox
          </button>
        }
      >
        <ul className="divide-y divide-[var(--border-subtle)]">
          {MESSAGES.map((m) => (
            <li
              key={m.id}
              className="flex gap-3 px-4 py-3 transition-colors hover:bg-[var(--accent-tint)]/50"
            >
              <span
                className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full text-[11px] font-semibold text-white"
                style={{ backgroundColor: m.color }}
                aria-hidden="true"
              >
                {m.from
                  .replace(/^[^·]+·\s*/, "")
                  .slice(0, 1)
                  .toUpperCase()}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="truncate text-sm font-semibold text-[var(--text)]">
                    {m.from}
                  </div>
                  {m.unread ? (
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]"
                    />
                  ) : null}
                </div>
                <div className="line-clamp-2 text-xs text-[var(--text-muted)]">
                  {m.body}
                </div>
                <div className="mt-0.5 text-[10px] uppercase tracking-wide text-[var(--text-faint)]">
                  {m.time}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </PopoverShell>
    </HoverPopover>
  );
}
