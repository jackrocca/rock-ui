"use client";

import { Progress } from "@base-ui/react/progress";
import type { ReactNode } from "react";

import { uiColorStyle } from "../lib/process-color";
import { cn } from "../lib/utils";

export interface ProgressRingProps {
  value: number;
  max?: number | undefined;
  "aria-label": string;
  size?: number | undefined;
  thickness?: number | undefined;
  color?: string | undefined;
  children?: ReactNode;
  className?: string | undefined;
}

export function ProgressRing({
  value,
  max = 100,
  "aria-label": ariaLabel,
  size = 32,
  thickness = size / 12,
  color,
  children,
  className,
}: ProgressRingProps) {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(max, Math.max(0, value));
  const fraction = max > 0 ? clamped / max : 0;
  return (
    <Progress.Root
      data-slot="progress-ring"
      value={clamped}
      max={max}
      aria-label={ariaLabel}
      style={{ ...uiColorStyle(color), width: size, height: size }}
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center",
        className,
      )}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
        className="absolute inset-0 -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={thickness}
          className="stroke-foreground/10"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - fraction)}
          strokeOpacity={fraction > 0 ? 1 : 0}
          className="stroke-[var(--ui-color,var(--primary))] transition-[stroke-dashoffset] duration-300 ease-(--ease-out) motion-reduce:transition-none"
        />
      </svg>
      {children != null ? (
        <span
          aria-hidden="true"
          className="relative leading-none font-semibold tabular-nums"
          style={{ fontSize: Math.round(size * 0.32) }}
        >
          {children}
        </span>
      ) : null}
    </Progress.Root>
  );
}
