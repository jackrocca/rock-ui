"use client";

import type { ReactFC } from "../lib/types";
import { cn } from "../lib/utils";
import type { SpinnerProps } from "./Spinner";
import { Spinner } from "./Spinner";

export interface FillHeightSpinnerProps extends SpinnerProps {
  wrapperClassName?: string;
}

export const FillHeightSpinner: ReactFC<FillHeightSpinnerProps> = ({
  size = "xl",
  wrapperClassName,
  ...props
}) => (
  <div className={cn("flex w-full flex-1 items-center justify-center", wrapperClassName)}>
    <Spinner size={size} {...props} />
  </div>
);
