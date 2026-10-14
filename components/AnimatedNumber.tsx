"use client";

import NumberFlow, { type Format } from "@number-flow/react";

import { cn } from "../lib/utils";

export interface AnimatedNumberProps {
  value: number;
  format?: Format | undefined;
  locales?: Intl.LocalesArgument | undefined;
  prefix?: string | undefined;
  suffix?: string | undefined;
  animated?: boolean | undefined;
  className?: string | undefined;
}

export function AnimatedNumber({
  value,
  format,
  locales = "en-US",
  prefix,
  suffix,
  animated = true,
  className,
}: AnimatedNumberProps) {
  return (
    <NumberFlow
      data-slot="animated-number"
      value={value}
      format={format}
      locales={locales}
      prefix={prefix}
      suffix={suffix}
      animated={animated}
      className={cn("tabular-nums", className)}
    />
  );
}
