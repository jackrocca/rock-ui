"use client";

import type { ReactFC, Size } from "../lib/types";
import { cn } from "../lib/utils";

const sizes: Record<Size, string> = {
  lg: "size-6",
  md: "size-5",
  sm: "size-4",
  xl: "size-8",
  xs: "size-3",
};

const RING_RADIUS = 10;
const RING_STROKE = 2;
const RESTING_DASH = "44 150";

export interface SpinnerProps {
  size?: Size | undefined;

  label?: string | undefined;

  className?: string | undefined;
}

export const Spinner: ReactFC<SpinnerProps> = ({ size = "md", label, className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    role={label ? "status" : undefined}
    aria-label={label}
    aria-hidden={label ? undefined : "true"}
    focusable="false"
    data-slot="spinner"
    className={cn(
      "text-foreground/50 animate-spinner-rotate motion-reduce:animate-none",
      sizes[size] ?? sizes.md,
      className,
    )}
  >
    <circle
      cx="12"
      cy="12"
      r={RING_RADIUS}
      stroke="currentColor"
      strokeWidth={RING_STROKE}
      strokeLinecap="round"
      strokeDasharray={RESTING_DASH}
      className="animate-spinner-arc motion-reduce:animate-none"
    />
  </svg>
);
