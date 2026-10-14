"use client";

import { LucideMenu } from "lucide-react";
import type { ReactNode } from "react";

import type { ReactFC } from "../lib/types";
import { cn } from "../lib/utils";
import { useScrolledPast } from "../hooks/useScrolledPast";
import { BottomDrawer } from "./BottomDrawer";
import { CustomButton } from "./CustomButton";
import { PageHeaderMenu } from "./PageHeaderMenu";
import { PageHeaderMenuIcon } from "./PageHeaderParts";
import { useKitzeUI } from "./KitzeUIContext";
import { useControlledOpen } from "../hooks/useControlledOpen";
import type { PageHeaderNavigationContent, PageHeaderProps } from "./PageHeaderTypes";

export type {
  PageHeaderClassNames,
  PageHeaderNavigationContent,
  PageHeaderProps,
} from "./PageHeaderTypes";

const EMPTY_CLASS_NAMES: NonNullable<PageHeaderProps["classNames"]> = {};

export const PageHeader: ReactFC<PageHeaderProps> = ({
  leftSide,
  middle,
  navigationContent,
  drawerContent,
  classNames = EMPTY_CLASS_NAMES,
  renderRightSide,
  height = 80,
  fixedOnScroll = false,
  open,
  onOpenChange,
  onOpenChangeComplete,
}) => {
  const { isMobile } = useKitzeUI();
  const isScrolled = useScrolledPast(height);
  const { isOpen, setIsOpen } = useControlledOpen({ open, onOpenChange });

  const menuButton = (
    <CustomButton
      variant="ghost"
      leftIcon={isMobile ? LucideMenu : PageHeaderMenuIcon}
      className={cn("group/page-header-menu", classNames?.menuButton)}
      aria-label="Menu"
      iconSize={20}
    />
  );

  const bottomDrawer = (children: ReactNode) => (
    <BottomDrawer
      title="Navigation"
      open={isOpen}
      onOpenChange={setIsOpen}
      onOpenChangeComplete={onOpenChangeComplete}
      trigger={menuButton}
    >
      {children}
    </BottomDrawer>
  );

  const navigationMenu = (content: PageHeaderNavigationContent) => (
    <PageHeaderMenu
      trigger={menuButton}
      content={content}
      open={isOpen}
      onOpenChange={setIsOpen}
      onOpenChangeComplete={onOpenChangeComplete}
      className={classNames.navigationContent}
    />
  );

  const applyFixed = fixedOnScroll ? isScrolled : false;

  return (
    <div
      style={{
        height,
      }}
      className={cn(
        "z-30 flex w-full items-center justify-between",
        "backdrop-blur-xl transition-[background-color,box-shadow] duration-200",
        "text-foreground/80",
        {
          "fixed top-0 right-0 left-0 bg-background/80 shadow-sm backdrop-blur-xl":
            applyFixed,
        },
        classNames?.root,
      )}
    >
      <div
        className={cn(
          "flex w-full max-w-[1200px] items-center justify-between px-4 py-3",
          classNames?.container,
        )}
      >
        <div className={cn("flex-1", classNames?.leftSide)}>{leftSide}</div>

        {middle && (
          <div className={cn("flex-1 text-center", classNames?.middle)}>{middle}</div>
        )}

        <div className={cn("flex flex-1 justify-end", classNames?.rightSide)}>
          {renderRightSide?.({ bottomDrawer, menuButton, navigationMenu }) ??
            (navigationContent
              ? navigationMenu(navigationContent)
              : drawerContent
                ? bottomDrawer(drawerContent)
                : null)}
        </div>
      </div>
    </div>
  );
};
