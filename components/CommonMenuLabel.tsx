"use client";

import React from "react";

import { ContextMenuGroup, ContextMenuLabel } from "../primitives/context-menu";
import { DropdownMenuGroup, DropdownMenuLabel } from "../primitives/dropdown-menu";
import type { ReactFC } from "../lib/types";
import { cn } from "../lib/utils";
import { BottomDrawerMenuLabel } from "./BottomDrawerMenuComponents";
import { useMenuContext } from "./MenuContext";
import { useIsInsideCommonMenuGroup } from "./CommonMenuGroup";

export interface CommonMenuLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const CommonMenuLabel: ReactFC<CommonMenuLabelProps> = ({
  children,
  className,
}) => {
  const { menuType } = useMenuContext();
  const isInsideGroup = useIsInsideCommonMenuGroup();

  if (menuType === "bottom-drawer") {
    return (
      <BottomDrawerMenuLabel className={className}>{children}</BottomDrawerMenuLabel>
    );
  }

  const isDropdown = menuType === "dropdown";
  const MenuLabel = isDropdown ? DropdownMenuLabel : ContextMenuLabel;
  const label = <MenuLabel className={cn(className)}>{children}</MenuLabel>;

  if (isInsideGroup) {
    return label;
  }

  const MenuGroup = isDropdown ? DropdownMenuGroup : ContextMenuGroup;

  return <MenuGroup>{label}</MenuGroup>;
};
