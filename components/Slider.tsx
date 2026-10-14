"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import type { ReactNode } from "react";

import { uiColorStyle } from "../lib/process-color";
import { cn } from "../lib/utils";

export interface SliderProps {
  value?: number | undefined;
  defaultValue?: number | undefined;
  onValueChange?: ((value: number) => void) | undefined;
  onValueCommitted?: ((value: number) => void) | undefined;
  min?: number | undefined;
  max?: number | undefined;
  step?: number | undefined;
  label?: ReactNode;
  formatValue?: ((value: number) => ReactNode) | undefined;
  "aria-label"?: string | undefined;
  color?: string | undefined;
  disabled?: boolean | undefined;
  name?: string | undefined;
  className?: string | undefined;
}

export function Slider({
  value,
  defaultValue,
  onValueChange,
  onValueCommitted,
  min = 0,
  max = 100,
  step = 1,
  label,
  formatValue = String,
  "aria-label": ariaLabel,
  color,
  disabled,
  name,
  className,
}: SliderProps) {
  const empty = max <= min;
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      value={value}
      defaultValue={defaultValue}
      onValueChange={(next) => onValueChange?.(next as number)}
      onValueCommitted={(next) => onValueCommitted?.(next as number)}
      min={min}
      max={empty ? min + 1 : max}
      step={step}
      disabled={disabled || empty}
      name={name}
      thumbAlignment="edge"
      style={uiColorStyle(color)}
      className={cn("grid w-full gap-1 data-disabled:opacity-50", className)}
    >
      {label ? (
        <div className="flex items-baseline justify-between gap-3 text-sm">
          <SliderPrimitive.Label className="font-medium">{label}</SliderPrimitive.Label>
          <SliderPrimitive.Value className="text-muted-foreground tabular-nums">
            {(_, values) => formatValue(values[0] ?? min)}
          </SliderPrimitive.Value>
        </div>
      ) : null}
      <SliderPrimitive.Control className="flex h-8 w-full touch-none items-center select-none">
        <SliderPrimitive.Track className="bg-foreground/10 h-1.5 w-full rounded-full select-none">
          <SliderPrimitive.Indicator className="rounded-full bg-[var(--ui-color,var(--primary))] select-none" />
          <SliderPrimitive.Thumb
            aria-label={label ? undefined : ariaLabel}
            className="has-[:focus-visible]:ring-ring/50 size-4 rounded-full border border-black/10 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-[box-shadow] duration-150 outline-none select-none has-[:focus-visible]:ring-3 data-dragging:shadow-[0_1px_5px_rgba(0,0,0,0.28)] motion-reduce:transition-none"
          />
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}
