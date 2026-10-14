"use client";

import { Progress } from "@base-ui/react/progress";
import type { ReactNode } from "react";

import { uiColorStyle } from "../lib/process-color";
import { cn } from "../lib/utils";

const heights = { sm: "h-1", md: "h-1.5", lg: "h-2.5" } as const;

export interface ProgressBarProps {
  value: number | null;
  max?: number | undefined;
  label?: ReactNode;
  valueLabel?: ReactNode;
  "aria-label"?: string | undefined;
  color?: string | undefined;
  size?: keyof typeof heights | undefined;
  className?: string | undefined;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  valueLabel,
  "aria-label": ariaLabel,
  color,
  size = "md",
  className,
}: ProgressBarProps) {
  return (
    <Progress.Root
      data-slot="progress-bar"
      value={value === null ? null : Math.min(max, Math.max(0, value))}
      max={max}
      aria-label={label ? undefined : ariaLabel}
      style={uiColorStyle(color)}
      className={cn("grid gap-1.5", className)}
    >
      {label || valueLabel ? (
        <div className="flex items-baseline justify-between gap-3 text-[13px]">
          {label ? (
            <Progress.Label className="min-w-0 truncate">{label}</Progress.Label>
          ) : (
            <span />
          )}
          {valueLabel ? (
            <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
              {valueLabel}
            </span>
          ) : null}
        </div>
      ) : null}
      <Progress.Track
        data-slot="progress-track"
        className={cn("bg-foreground/10 overflow-hidden rounded-full", heights[size])}
      >
        <Progress.Indicator className="h-full rounded-full bg-[var(--ui-color,var(--primary))] transition-[width] duration-500 ease-(--ease-out) data-indeterminate:animate-progress-indeterminate data-indeterminate:w-1/3 motion-reduce:transition-none motion-reduce:data-indeterminate:w-full motion-reduce:data-indeterminate:animate-none motion-reduce:data-indeterminate:opacity-40" />
      </Progress.Track>
    </Progress.Root>
  );
}
