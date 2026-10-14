"use client";

import React from "react";

import { Popover, PopoverContent, PopoverTrigger } from "../primitives/popover";
import type { ReactFC } from "../lib/types";
import { cn } from "../lib/utils";
import { useControlledOpen } from "../hooks/useControlledOpen";
import type { BottomDrawerProps } from "./BottomDrawer";
import { BottomDrawer } from "./BottomDrawer";
import { useKitzeUI } from "./KitzeUIContext";

export type PopoverMobileViewType = "keep" | "bottom-drawer";
export interface SimplePopoverClassNames {
  content?: string;
  drawer?: string;
}
export interface SimplePopoverProps {
  trigger?: React.ReactNode;
  content: React.ReactNode;
  classNames?: SimplePopoverClassNames;
  align?: "start" | "center" | "end";
  sideOffset?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  mobileView?: PopoverMobileViewType;
  drawerTitle?: string;
  drawerProps?: Partial<
    Omit<BottomDrawerProps, "children" | "trigger" | "title" | "open" | "onOpenChange">
  >;
}
export const SimplePopover: ReactFC<SimplePopoverProps> = ({
  trigger,
  content,
  classNames,
  align = "center",
  sideOffset = 4,
  open,
  onOpenChange,
  mobileView = "keep",
  drawerTitle,
  drawerProps,
}) => {
  const { isMobile } = useKitzeUI();
  const { isOpen, setIsOpen } = useControlledOpen({
    onOpenChange,
    open,
  });

  if (isMobile && mobileView === "bottom-drawer") {
    return (
      <BottomDrawer
        open={isOpen}
        onOpenChange={setIsOpen}
        trigger={trigger}
        title={drawerTitle}
        classNames={{
          content: cn(classNames?.drawer, drawerProps?.classNames?.content),
          ...drawerProps?.classNames,
        }}
        {...drawerProps}
      >
        <div className="py-2">{content}</div>
      </BottomDrawer>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      {trigger && (
        <PopoverTrigger
          render={
            React.isValidElement(trigger) ? (
              trigger
            ) : (
              <button type="button">{trigger}</button>
            )
          }
        />
      )}
      <PopoverContent
        className={classNames?.content}
        align={align}
        sideOffset={sideOffset}
      >
        {content}
      </PopoverContent>
    </Popover>
  );
};
