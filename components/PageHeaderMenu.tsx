"use client";

import { isValidElement, type ReactNode } from "react";
import { BottomDrawer } from "./BottomDrawer";
import { useKitzeUI } from "./KitzeUIContext";
import type { PageHeaderNavigationContent } from "./PageHeaderTypes";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "../primitives/popover";
import { cn } from "../lib/utils";

interface PageHeaderMenuProps {
  trigger: ReactNode;
  content: PageHeaderNavigationContent;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenChangeComplete?: ((open: boolean) => void) | undefined;
  className?: string | undefined;
}

export function PageHeaderMenu({
  trigger,
  content,
  open,
  onOpenChange,
  onOpenChangeComplete,
  className,
}: PageHeaderMenuProps) {
  const { isMobile } = useKitzeUI();
  const children =
    typeof content === "function"
      ? content({ close: () => onOpenChange(false) })
      : content;

  if (isMobile) {
    return (
      <BottomDrawer
        title="Navigation"
        open={open}
        onOpenChange={onOpenChange}
        onOpenChangeComplete={onOpenChangeComplete}
        trigger={trigger}
      >
        {children}
      </BottomDrawer>
    );
  }

  return (
    <Popover
      open={open}
      modal={false}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={onOpenChangeComplete}
    >
      <PopoverTrigger
        render={
          isValidElement(trigger) ? trigger : <button type="button">{trigger}</button>
        }
      />
      <PopoverContent
        data-slot="page-header-navigation"
        side="left"
        align="center"
        sideOffset={8}
        classNames={{ positioner: "z-[60]" }}
        className={cn(
          "w-auto max-w-(--available-width) max-h-(--available-height) overflow-visible rounded-none border-0 bg-transparent p-0 shadow-none transition-[opacity,transform,clip-path] duration-200 ease-(--ease-out) [clip-path:inset(-6px)] data-starting-style:scale-100 data-ending-style:scale-100 data-starting-style:transform-[translateX(12px)] data-ending-style:transform-[translateX(12px)] data-starting-style:[clip-path:inset(0_0_0_100%)] data-ending-style:[clip-path:inset(0_0_0_100%)] data-[side=right]:data-starting-style:transform-[translateX(-12px)] data-[side=right]:data-ending-style:transform-[translateX(-12px)] data-[side=right]:data-starting-style:[clip-path:inset(0_100%_0_0)] data-[side=right]:data-ending-style:[clip-path:inset(0_100%_0_0)] data-[instant]:transition-none motion-reduce:transition-none [&_nav]:flex [&_nav]:items-center [&_nav]:gap-1 [&_nav_a]:min-h-10 [&_nav_a]:whitespace-nowrap",
          className,
        )}
        initialFocus={(interactionType) => interactionType === "keyboard"}
      >
        <PopoverTitle className="sr-only">Navigation</PopoverTitle>
        <PopoverDescription className="sr-only">
          Choose a page to visit.
        </PopoverDescription>
        {children}
      </PopoverContent>
    </Popover>
  );
}
