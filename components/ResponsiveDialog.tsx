"use client";

import type { SimpleDialogProps } from "./SimpleDialog";
import { SimpleDialog } from "./SimpleDialog";

export type DialogMobileViewType = "keep" | "bottom-drawer";
export type ResponsiveDialogProps = SimpleDialogProps;
export const ResponsiveDialog = ({
  mobileView = "bottom-drawer",
  ...props
}: ResponsiveDialogProps) => <SimpleDialog {...props} mobileView={mobileView} />;
