"use client";

import React from "react";
import { useLongPress } from "use-long-press";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "../primitives/context-menu";
import type { ReactFC } from "../lib/types";
import { cn } from "../lib/utils";
import { useControlledOpen } from "../hooks/useControlledOpen";
import { BottomDrawerMenu } from "./BottomDrawerMenu";
import { useKitzeUI } from "./KitzeUIContext";
import { MenuProvider } from "./MenuContext";

export type ContextMenuMobileViewType = "keep" | "bottom-drawer";
export interface SimpleContextMenuClassNames {
  content?: string | undefined;
  drawerContent?: string | undefined;
}
export interface SimpleContextMenuProps {
  children: React.ReactNode;
  content: React.ReactNode;
  classNames?: SimpleContextMenuClassNames | undefined;
  closeOnClick?: boolean | undefined;
  open?: boolean | undefined;
  onOpenChange?: ((open: boolean) => void) | undefined;
  mobileView?: ContextMenuMobileViewType | undefined;
  drawerTitle?: string | undefined;
}
export const SimpleContextMenu: ReactFC<SimpleContextMenuProps> = ({
  children,
  content,
  classNames,
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

  const bind = useLongPress(
    () => {
      if (isMobile && mobileView === "bottom-drawer") {
        setIsOpen(true);
      }
    },
    {
      cancelOnMovement: false,
      captureEvent: true,
      filterEvents: () => isMobile && mobileView === "bottom-drawer",
      threshold: 500,
    },
  );

  if (isMobile && mobileView === "bottom-drawer") {
    return (
      <>
        <div className="select-none" {...bind()}>
          {children}
        </div>
        <BottomDrawerMenu
          open={isOpen}
          onOpenChange={setIsOpen}
          title={drawerTitle}
          closeOnClick={closeOnClick}
          content={content}
          classNames={{ content: classNames?.drawerContent }}
        >
          {null}
        </BottomDrawerMenu>
      </>
    );
  }

  return (
    <MenuProvider menuType="context" closeMenu={closeMenu} open={isOpen}>
      <ContextMenu open={isOpen} onOpenChange={setIsOpen}>
        <ContextMenuTrigger
          render={
            <div className="select-none" {...bind()}>
              {children}
            </div>
          }
        />
        <ContextMenuContent className={cn(classNames?.content, "select-none")}>
          {content}
        </ContextMenuContent>
      </ContextMenu>
    </MenuProvider>
  );
};
