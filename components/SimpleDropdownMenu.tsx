"use client";

import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../primitives/dropdown-menu";
import type { ReactFC } from "../lib/types";
import { useControlledOpen } from "../hooks/useControlledOpen";
import { BottomDrawerMenu } from "./BottomDrawerMenu";
import { useKitzeUI } from "./KitzeUIContext";
import { MenuProvider } from "./MenuContext";

export type DropdownMobileViewType = "keep" | "bottom-drawer";
export interface SimpleDropdownMenuClassNames {
  content?: string | undefined;
  drawerContent?: string | undefined;
}
export interface SimpleDropdownMenuProps {
  children: React.ReactNode;
  content: React.ReactNode;
  classNames?: SimpleDropdownMenuClassNames | undefined;
  align?: "start" | "center" | "end" | undefined;
  side?: "top" | "right" | "bottom" | "left" | undefined;
  closeOnClick?: boolean | undefined;
  open?: boolean | undefined;
  onOpenChange?: ((open: boolean) => void) | undefined;
  mobileView?: DropdownMobileViewType | undefined;
  drawerTitle?: string | undefined;
}
export const SimpleDropdownMenu: ReactFC<SimpleDropdownMenuProps> = ({
  children,
  content,
  classNames,
  align = "center",
  side = "bottom",
  closeOnClick = true,
  open,
  onOpenChange,
  mobileView = "keep",
  drawerTitle,
}) => {
  const { isMobile } = useKitzeUI();
  const { isOpen, setIsOpen, close } = useControlledOpen({
    onOpenChange,
    open,
  });

  const closeMenu = () => {
    if (closeOnClick) {
      close();
    }
  };

  if (isMobile && mobileView === "bottom-drawer") {
    return (
      <BottomDrawerMenu
        title={drawerTitle}
        open={isOpen}
        onOpenChange={setIsOpen}
        content={content}
        closeOnClick={closeOnClick}
        classNames={{ content: classNames?.drawerContent }}
      >
        {children}
      </BottomDrawerMenu>
    );
  }

  return (
    <MenuProvider menuType="dropdown" closeMenu={closeMenu} open={isOpen}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger
          render={
            React.isValidElement(children) ? (
              children
            ) : (
              <button type="button">{children}</button>
            )
          }
        />
        <DropdownMenuContent className={classNames?.content} align={align} side={side}>
          {content}
        </DropdownMenuContent>
      </DropdownMenu>
    </MenuProvider>
  );
};
