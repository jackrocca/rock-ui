"use client";

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import type { ComponentProps } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";

import { uiColorStyle } from "../lib/process-color";
import { cn } from "../lib/utils";

const navButton =
  "hover:bg-muted text-foreground focus-visible:ring-ring/50 inline-flex size-8 items-center justify-center rounded-lg transition-colors duration-150 outline-none select-none focus-visible:ring-3 aria-disabled:pointer-events-none aria-disabled:opacity-40 motion-reduce:transition-none";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  color,
  style,
  components,
  formatters,
  ...props
}: ComponentProps<typeof DayPicker> & { color?: string | undefined }) {
  const defaults = getDefaultClassNames();
  return (
    <DayPicker
      data-slot="calendar"
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      style={{ ...uiColorStyle(color), ...style }}
      className={cn("w-fit p-2 text-sm", className)}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString("en-US", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaults.root),
        months: cn("relative flex flex-col gap-4 sm:flex-row", defaults.months),
        month: cn("flex w-full flex-col gap-2", defaults.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex items-center justify-between",
          defaults.nav,
        ),
        button_previous: cn(navButton, defaults.button_previous),
        button_next: cn(navButton, defaults.button_next),
        month_caption: cn(
          "flex h-8 items-center justify-center px-8",
          defaults.month_caption,
        ),
        caption_label: cn(
          "font-medium select-none",
          captionLayout !== "label" &&
            "flex h-7 items-center gap-0.5 rounded-md pr-1 pl-2 [&>svg]:size-3.5 [&>svg]:text-muted-foreground",
          defaults.caption_label,
        ),
        dropdowns: cn(
          "flex h-8 items-center justify-center gap-1 font-medium",
          defaults.dropdowns,
        ),
        dropdown_root: cn(
          "has-focus-visible:ring-ring/50 hover:bg-muted relative rounded-md has-focus-visible:ring-3",
          defaults.dropdown_root,
        ),
        dropdown: cn("absolute inset-0 cursor-pointer opacity-0", defaults.dropdown),
        month_grid: "w-full border-collapse",
        weekdays: cn("flex", defaults.weekdays),
        weekday: cn(
          "text-muted-foreground w-9 text-[0.75rem] font-normal select-none",
          defaults.weekday,
        ),
        week: cn("mt-1 flex w-full", defaults.week),
        day: cn("group/day relative size-9 p-0 text-center select-none", defaults.day),
        day_button: cn(
          "hover:bg-muted focus-visible:ring-ring/50 inline-flex size-9 items-center justify-center rounded-lg tabular-nums transition-colors duration-150 outline-none focus-visible:ring-3 motion-reduce:transition-none",
          "group-data-today/day:font-semibold group-data-outside/day:text-muted-foreground/60",
          "group-data-selected/day:bg-[var(--ui-color,var(--primary))] group-data-selected/day:hover:bg-[var(--ui-color,var(--primary))]",
          color
            ? "group-data-selected/day:text-white"
            : "group-data-selected/day:text-primary-foreground",
          "group-data-disabled/day:text-muted-foreground/40 group-data-disabled/day:pointer-events-none group-data-disabled/day:line-through",
          defaults.day_button,
        ),
        range_middle: cn(
          "bg-muted [&>button]:rounded-none [&>button]:bg-transparent! [&>button]:text-foreground!",
          defaults.range_middle,
        ),
        hidden: cn("invisible", defaults.hidden),
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className: chevronClassName }) => {
          const Icon =
            orientation === "left"
              ? ChevronLeft
              : orientation === "right"
                ? ChevronRight
                : ChevronDown;
          return <Icon className={cn("size-4", chevronClassName)} aria-hidden="true" />;
        },
        ...components,
      }}
      {...props}
    />
  );
}

export { Calendar };
export type { DateRange } from "react-day-picker";
