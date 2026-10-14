import type { ReactNode } from "react";

import { cn } from "../lib/utils";

export interface MacWindowProps {
  children: ReactNode;
  title?: string;
  dark?: boolean;
  className?: string;
  showTrafficLightBorders?: boolean;
}

export const MacWindow = ({
  children,
  title,
  dark = true,
  className,
  showTrafficLightBorders = true,
}: MacWindowProps) => (
  <div
    className={cn(
      "relative overflow-hidden rounded-xl border shadow-2xl",
      dark
        ? "border-white/10 bg-[#1c1c1e] shadow-black/50"
        : "border-black/10 bg-white shadow-black/20",
      className,
    )}
  >
    <div
      className={cn(
        "relative flex h-10 items-center border-b px-4",
        dark ? "border-white/5 bg-[#2c2c2e]" : "border-black/5 bg-[#f5f5f7]",
      )}
    >
      <div className="z-10 flex items-center gap-2">
        <div
          className={cn(
            "h-3 w-3 rounded-full bg-[#ff5f57]",
            showTrafficLightBorders && "border border-[#e0443e]",
          )}
        />
        <div
          className={cn(
            "h-3 w-3 rounded-full bg-[#febc2e]",
            showTrafficLightBorders && "border border-[#d89e24]",
          )}
        />
        <div
          className={cn(
            "h-3 w-3 rounded-full bg-[#28c840]",
            showTrafficLightBorders && "border border-[#1aab29]",
          )}
        />
      </div>

      {title && (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 flex items-center justify-center text-xs font-medium opacity-60",
            dark ? "text-white" : "text-black",
          )}
        >
          {title}
        </div>
      )}
    </div>

    <div className="relative h-full w-full">{children}</div>
  </div>
);
