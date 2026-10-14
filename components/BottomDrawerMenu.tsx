"use client";

import React from "react";

import type { ReactFC } from "../lib/types";
import { cn } from "../lib/utils";
import { useControlledOpen } from "../hooks/useControlledOpen";
import type { BottomDrawerClassNames } from "./BottomDrawer";
import { BottomDrawer } from "./BottomDrawer";
import { BottomDrawerMenuItems } from "./BottomDrawerMenuComponents";
import type { BottomDrawerMenuItemProps } from "./BottomDrawerMenuItem";
import { BottomDrawerMenuItem } from "./BottomDrawerMenuItem";
import { MenuProvider } from "./MenuContext";

export interface BottomDrawerMenuProps {
  children: React.ReactNode;
  content?: React.ReactNode | undefined;
  items?: (Omit<BottomDrawerMenuItemProps, "children"> & { label: string })[] | undefined;
  title?: string | undefined;
  open?: boolean | undefined;
  onOpenChange?: ((open: boolean) => void) | undefined;
  closeOnClick?: boolean | undefined;
  classNames?: BottomDrawerClassNames | undefined;
}

export const BottomDrawerMenu: ReactFC<BottomDrawerMenuProps> = ({
  children,
  content,
  items,
  title,
  open,
  onOpenChange,
  closeOnClick = true,
  classNames,
}) => {
  const { isOpen, setIsOpen, close } = useControlledOpen({
    onOpenChange,
    open,
  });

  const closeMenu = () => {
    if (closeOnClick) {
      close();
    }
  };

  let drawerContent = content;

  if (items && items.length > 0) {
    drawerContent = (
      <BottomDrawerMenuItems>
        {items.map((item, index) => {
          const { label, ...itemProps } = item;
          return (
            <BottomDrawerMenuItem
              key={item.label}
              {...itemProps}
              isLast={itemProps.isLast ?? index === items.length - 1}
            >
              {label}
            </BottomDrawerMenuItem>
          );
        })}
      </BottomDrawerMenuItems>
    );
  }

  return (
    <BottomDrawer
      title={title}
      trigger={children}
      open={isOpen}
      onOpenChange={setIsOpen}
      classNames={{
        ...classNames,
        childrenWrapper: cn("px-0", classNames?.childrenWrapper),
      }}
    >
      <MenuProvider menuType="bottom-drawer" closeMenu={closeMenu} open={isOpen}>
        {drawerContent}
      </MenuProvider>
    </BottomDrawer>
  );
};
