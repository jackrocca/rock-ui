import type { ReactNode } from "react";

export type PageHeaderNavigationContent =
  ReactNode | ((props: { close: () => void }) => ReactNode);

export interface PageHeaderClassNames {
  root?: string | undefined;
  container?: string | undefined;
  leftSide?: string | undefined;
  middle?: string | undefined;
  rightSide?: string | undefined;
  menuButton?: string | undefined;
  navigationContent?: string | undefined;
  pastScrolled?: string | undefined;
}

export interface PageHeaderProps {
  leftSide?: ReactNode | undefined;
  middle?: ReactNode | undefined;
  navigationContent?: PageHeaderNavigationContent | undefined;
  drawerContent?: ReactNode | undefined;
  classNames?: PageHeaderClassNames | undefined;
  height?: number | undefined;
  fixedOnScroll?: boolean | undefined;
  open?: boolean | undefined;
  onOpenChange?: ((open: boolean) => void) | undefined;
  onOpenChangeComplete?: ((open: boolean) => void) | undefined;
  renderRightSide?:
    | ((props: {
        menuButton: ReactNode;
        bottomDrawer: (children: ReactNode) => ReactNode;
        navigationMenu: (content: PageHeaderNavigationContent) => ReactNode;
      }) => ReactNode)
    | undefined;
}
