"use client";

import { NumberField } from "@base-ui/react/number-field";
import { Minus, Plus } from "lucide-react";

import { cn } from "../lib/utils";

export interface NumberInputProps {
  value?: number | null | undefined;
  defaultValue?: number | undefined;
  onValueChange?: ((value: number | null) => void) | undefined;
  min?: number | undefined;
  max?: number | undefined;
  step?: number | undefined;
  format?: Intl.NumberFormatOptions | undefined;
  unit?: string | undefined;
  buttons?: boolean | undefined;
  placeholder?: string | undefined;
  id?: string | undefined;
  name?: string | undefined;
  required?: boolean | undefined;
  disabled?: boolean | undefined;
  "aria-label"?: string | undefined;
  "aria-invalid"?: boolean | undefined;
  className?: string | undefined;
}

const stepButton =
  "text-muted-foreground hover:bg-muted hover:text-foreground flex size-8 shrink-0 items-center justify-center transition-colors duration-150 outline-none select-none focus-visible:bg-muted disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none [&_svg]:size-3.5";

export function NumberInput({
  value,
  defaultValue,
  onValueChange,
  min,
  max,
  step = 1,
  format,
  unit,
  buttons = false,
  placeholder,
  id,
  name,
  required,
  disabled,
  "aria-label": ariaLabel,
  "aria-invalid": ariaInvalid,
  className,
}: NumberInputProps) {
  return (
    <NumberField.Root
      data-slot="number-input"
      id={id}
      name={name}
      value={value}
      defaultValue={defaultValue}
      onValueChange={(next) => onValueChange?.(next)}
      min={min}
      max={max}
      step={step}
      largeStep={step * 10}
      format={format}
      required={required}
      disabled={disabled}
      className="contents"
    >
      <NumberField.Group
        className={cn(
          "border-input focus-within:border-ring focus-within:ring-ring/50 has-aria-invalid:border-destructive has-aria-invalid:ring-destructive/20 flex h-8 w-full items-center overflow-hidden rounded-lg border transition-colors focus-within:ring-3 has-aria-invalid:ring-3 data-disabled:opacity-50 motion-reduce:transition-none",
          className,
        )}
      >
        {buttons ? (
          <NumberField.Decrement className={stepButton}>
            <Minus />
          </NumberField.Decrement>
        ) : null}
        <NumberField.Input
          aria-label={ariaLabel}
          aria-invalid={ariaInvalid || undefined}
          placeholder={placeholder}
          className={cn(
            "placeholder:text-muted-foreground h-full min-w-0 flex-1 bg-transparent px-2.5 text-base tabular-nums outline-none md:text-sm",
            buttons && "text-center",
          )}
        />
        {unit ? (
          <span className="text-muted-foreground pr-2.5 text-sm select-none">{unit}</span>
        ) : null}
        {buttons ? (
          <NumberField.Increment className={stepButton}>
            <Plus />
          </NumberField.Increment>
        ) : null}
      </NumberField.Group>
    </NumberField.Root>
  );
}
