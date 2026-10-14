"use client";

import { CalendarDays } from "lucide-react";
import { useState } from "react";

import { SimplePopover } from "./SimplePopover";
import { cn } from "../lib/utils";
import { Calendar } from "../primitives/calendar";

export interface DatePickerProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string | undefined;
  min?: string | undefined;
  max?: string | undefined;
  clearable?: boolean | undefined;
  disabled?: boolean | undefined;
  color?: string | undefined;
  id?: string | undefined;
  name?: string | undefined;
  "aria-label"?: string | undefined;
  "aria-invalid"?: boolean | undefined;
  className?: string | undefined;
}

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
const display = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });

function parseDate(value: string | undefined): Date | undefined {
  const match = value ? ISO_DATE.exec(value) : null;
  if (!match) return undefined;
  const [year, month, day] = [Number(match[1]), Number(match[2]) - 1, Number(match[3])];
  const date = new Date(2000, 0, 1);
  date.setFullYear(year, month, day);
  const valid =
    date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
  return valid ? date : undefined;
}

function toISODate(date: Date): string {
  const year = String(date.getFullYear()).padStart(4, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function DatePicker({
  value,
  onValueChange,
  placeholder = "Pick a date",
  min,
  max,
  clearable = true,
  disabled,
  color,
  id,
  name,
  "aria-label": ariaLabel,
  "aria-invalid": ariaInvalid,
  className,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const selected = parseDate(value);
  const minDate = parseDate(min);
  const maxDate = parseDate(max);
  const today = new Date();
  const firstMonth =
    selected ??
    (maxDate && maxDate < today ? maxDate : minDate && minDate > today ? minDate : today);
  const startMonth =
    minDate ??
    new Date(
      Math.min(firstMonth.getFullYear(), (maxDate ?? today).getFullYear() - 100),
      0,
    );
  const endMonth =
    maxDate ??
    new Date(
      Math.max(firstMonth.getFullYear(), (minDate ?? today).getFullYear() + 10),
      11,
    );

  const pick = (next: string) => {
    onValueChange(next);
    setOpen(false);
  };

  return (
    <>
      <SimplePopover
        open={open && !disabled}
        onOpenChange={(next) => setOpen(next && !disabled)}
        align="start"
        mobileView="bottom-drawer"
        drawerTitle={ariaLabel ?? placeholder}
        classNames={{ content: "w-auto p-1" }}
        trigger={
          <button
            type="button"
            id={id}
            disabled={disabled}
            aria-label={ariaLabel}
            aria-invalid={ariaInvalid || undefined}
            data-slot="date-picker"
            className={cn(
              "border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 flex h-8 w-full min-w-0 items-center gap-2 rounded-lg border bg-transparent px-2.5 text-left text-base transition-colors outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 motion-reduce:transition-none md:text-sm",
              className,
            )}
          >
            <CalendarDays
              className="text-muted-foreground size-4 shrink-0"
              aria-hidden="true"
            />
            <span
              className={cn(
                "truncate tabular-nums",
                !selected && "text-muted-foreground",
              )}
            >
              {selected ? display.format(selected) : placeholder}
            </span>
          </button>
        }
        content={
          <div className="flex flex-col items-center">
            <Calendar
              mode="single"
              required
              autoFocus
              captionLayout="dropdown"
              color={color}
              selected={selected}
              defaultMonth={firstMonth}
              startMonth={startMonth}
              endMonth={endMonth}
              disabled={[
                ...(minDate ? [{ before: minDate }] : []),
                ...(maxDate ? [{ after: maxDate }] : []),
              ]}
              onSelect={(date) => pick(toISODate(date))}
            />
            {selected && clearable ? (
              <button
                type="button"
                onClick={() => pick("")}
                className="text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-ring/50 mb-1 h-8 self-stretch rounded-lg text-sm transition-colors outline-none focus-visible:ring-3 motion-reduce:transition-none"
              >
                Clear
              </button>
            ) : null}
          </div>
        }
      />
      {name ? (
        <input type="hidden" name={name} value={value} disabled={disabled} />
      ) : null}
    </>
  );
}
