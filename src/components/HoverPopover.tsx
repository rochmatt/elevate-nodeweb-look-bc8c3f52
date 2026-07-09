import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type HoverPopoverProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "start" | "center" | "end";
  sideOffset?: number;
  contentClassName?: string;
  openDelay?: number;
  closeDelay?: number;
};

/**
 * Popover that opens on hover (desktop) and tap (mobile).
 * Stays open while the pointer is over the trigger OR the content.
 */
export function HoverPopover({
  trigger,
  children,
  align = "end",
  sideOffset = 10,
  contentClassName,
  openDelay = 80,
  closeDelay = 140,
}: HoverPopoverProps) {
  const [open, setOpen] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  const scheduleOpen = () => {
    clearTimer();
    timer.current = setTimeout(() => setOpen(true), openDelay);
  };
  const scheduleClose = () => {
    clearTimer();
    timer.current = setTimeout(() => setOpen(false), closeDelay);
  };

  React.useEffect(() => () => clearTimer(), []);

  const isMouse = (e: React.PointerEvent) => e.pointerType === "mouse";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        onPointerEnter={(e) => {
          if (isMouse(e)) scheduleOpen();
        }}
        onPointerLeave={(e) => {
          if (isMouse(e)) scheduleClose();
        }}
        onClick={() => {
          clearTimer();
          setOpen((prev) => !prev);
        }}
      >
        {trigger}
      </PopoverTrigger>
      <PopoverContent
        align={align}
        sideOffset={sideOffset}
        collisionPadding={12}
        onPointerEnter={(e) => {
          if (isMouse(e)) {
            clearTimer();
            setOpen(true);
          }
        }}
        onPointerLeave={(e) => {
          if (isMouse(e)) scheduleClose();
        }}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className={cn(
          "theme-light z-50 w-[min(20rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-0 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.25)]",
          contentClassName,
        )}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}

