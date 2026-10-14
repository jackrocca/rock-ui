"use client";

import { useLongPress } from "use-long-press";

import type { ReactFC } from "../lib/types";
import { useControlledOpen } from "../hooks/useControlledOpen";
import { BottomDrawerMenu } from "./BottomDrawerMenu";
import { useKitzeUI } from "./KitzeUIContext";
import type { SimpleContextMenuProps } from "./SimpleContextMenu";
import { SimpleContextMenu } from "./SimpleContextMenu";

export type ContextMenuMobileViewType = "keep" | "bottom-drawer";
export interface ResponsiveContextMenuProps extends Omit<
  SimpleContextMenuProps,
  "classNames"
> {
  mobileView?: ContextMenuMobileViewType;
  drawerTitle?: string;
  open?: boolean;
  classNames?: SimpleContextMenuProps["classNames"] & {
    drawerContent?: string;
  };
}
export const ResponsiveContextMenu: ReactFC<ResponsiveContextMenuProps> = ({
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
  const { isOpen, setIsOpen } = useControlledOpen({
    onOpenChange,
    open,
  });

  const { drawerContent, ...simpleContextClassNames } = classNames ?? {};

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
          classNames={{
            content: drawerContent,
          }}
        >
          {null}
        </BottomDrawerMenu>
      </>
    );
  }

  return (
    <SimpleContextMenu
      open={isOpen}
      onOpenChange={setIsOpen}
      content={content}
      closeOnClick={closeOnClick}
      classNames={simpleContextClassNames}
      {...props}
    >
      <div className="select-none" {...bind()}>
        {children}
      </div>
    </SimpleContextMenu>
  );
};
