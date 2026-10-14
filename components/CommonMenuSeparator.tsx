"use client";

import { ContextMenuSeparator } from "../primitives/context-menu";
import { DropdownMenuSeparator } from "../primitives/dropdown-menu";
import type { ReactFC } from "../lib/types";
import { cn } from "../lib/utils";
import { BottomDrawerMenuSeparator } from "./BottomDrawerMenuComponents";
import { useMenuContext } from "./MenuContext";

export interface CommonMenuSeparatorProps {
  className?: string;
}

export const CommonMenuSeparator: ReactFC<CommonMenuSeparatorProps> = ({ className }) => {
  const { menuType } = useMenuContext();

  if (menuType === "bottom-drawer") {
    return <BottomDrawerMenuSeparator className={className} />;
  }

  const MenuSeparator =
    menuType === "dropdown" ? DropdownMenuSeparator : ContextMenuSeparator;

  return <MenuSeparator className={cn(className)} />;
};
