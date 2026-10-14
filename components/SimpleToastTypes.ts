import type React from "react";

export type SimpleToastVariant = "default" | "success" | "error";

export interface SimpleToastClassNames {
  root?: string | undefined;
  message?: string | undefined;
  close?: string | undefined;
}

export interface SimpleToastProps {
  children: React.ReactNode;
  open?: boolean | undefined;
  onOpenChange?: ((open: boolean) => void) | undefined;
  onOpenChangeComplete?: ((open: boolean) => void) | undefined;
  variant?: SimpleToastVariant | undefined;
  duration?: number | undefined;
  dismissible?: boolean | undefined;
  className?: string | undefined;
  classNames?: SimpleToastClassNames | undefined;
}
