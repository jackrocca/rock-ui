"use client";

import React from "react";

import { ContextMenuGroup } from "../primitives/context-menu";
import { DropdownMenuGroup } from "../primitives/dropdown-menu";
import type { ReactFC } from "../lib/types";
import { BottomDrawerMenuGroup } from "./BottomDrawerMenuComponents";
import { useMenuContext } from "./MenuContext";

const CommonMenuGroupContext = React.createContext(false);

export const useIsInsideCommonMenuGroup = () => React.useContext(CommonMenuGroupContext);

export interface CommonMenuGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const CommonMenuGroup: ReactFC<CommonMenuGroupProps> = ({
  children,
  className,
}) => {
  const { menuType } = useMenuContext();

  if (menuType === "bottom-drawer") {
    return (
      <BottomDrawerMenuGroup className={className}>{children}</BottomDrawerMenuGroup>
    );
  }

  const MenuGroup = menuType === "dropdown" ? DropdownMenuGroup : ContextMenuGroup;

  return (
    <CommonMenuGroupContext.Provider value={true}>
      <MenuGroup className={className}>{children}</MenuGroup>
    </CommonMenuGroupContext.Provider>
  );
};
