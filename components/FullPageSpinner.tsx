"use client";

import type { ReactFC } from "../lib/types";
import type { SpinnerProps } from "./Spinner";
import { Spinner } from "./Spinner";

export type FullPageSpinnerProps = SpinnerProps;
export const FullPageSpinner: ReactFC<FullPageSpinnerProps> = ({
  size = "xl",
  ...props
}) => (
  <div className="flex min-h-screen min-w-screen items-center justify-center">
    <Spinner size={size} {...props} />
  </div>
);
