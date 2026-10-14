"use client";

import type { ReactNode } from "react";

import { cn } from "../lib/utils";

export interface GradientTextProps {
  children: ReactNode;
  size?: string;
  weight?: string;
  duration?: number;
  className?: string;
}
export const GradientText = ({
  children,
  size = "text-2xl",
  weight = "font-bold",
  duration = 6,
  className,
}: GradientTextProps) => {
  const hasCustomDuration = duration !== 6;
  return (
    <span
      className={cn(
        size,
        weight,
        "bg-clip-text text-transparent",
        "bg-300%",
        !hasCustomDuration && "animate-gradient",
        className,
      )}
      style={
        hasCustomDuration
          ? {
              animation: `animatedgradient ${duration}s ease infinite alternate`,
            }
          : undefined
      }
    >
      {children}
    </span>
  );
};
