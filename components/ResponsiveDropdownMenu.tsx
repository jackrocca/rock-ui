"use client";

import type { ReactFC } from "../lib/types";
import { BottomDrawerMenu } from "./BottomDrawerMenu";
import { useKitzeUI } from "./KitzeUIContext";
import type { SimpleDropdownMenuProps } from "./SimpleDropdownMenu";
import { SimpleDropdownMenu } from "./SimpleDropdownMenu";

export type DropdownMobileViewType = "keep" | "bottom-drawer";
export interface ResponsiveDropdownMenuProps extends Omit<
  SimpleDropdownMenuProps,
  "classNames"
> {
  mobileView?: DropdownMobileViewType;
  drawerTitle?: string;
  classNames?: SimpleDropdownMenuProps["classNames"] & {
    drawerContent?: string;
  };
}
export const ResponsiveDropdownMenu: ReactFC<ResponsiveDropdownMenuProps> = ({
  mobileView = "bottom-drawer",
  drawerTitle,
  classNames,
  children,
  content,
  closeOnClick = true,
  open,
  onOpenChange,
  ...props
}) => {
  const { isMobile } = useKitzeUI();

  const { drawerContent, ...simpleDropdownClassNames } = classNames ?? {};

  if (isMobile && mobileView === "bottom-drawer") {
    return (
      <BottomDrawerMenu
        title={drawerTitle}
        open={open}
        onOpenChange={onOpenChange}
        content={content}
        closeOnClick={closeOnClick}
        classNames={{
          content: drawerContent,
        }}
      >
        {children}
      </BottomDrawerMenu>
    );
  }

  return (
    <SimpleDropdownMenu
      open={open}
      onOpenChange={onOpenChange}
      content={content}
      closeOnClick={closeOnClick}
      classNames={simpleDropdownClassNames}
      {...props}
    >
      {children}
    </SimpleDropdownMenu>
  );
};
