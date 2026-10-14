"use client";

import * as React from "react";

import type { Size, ReactFC } from "../lib/types";
import { cn } from "../lib/utils";
import { useLinkableComponent } from "../hooks/useLinkableComponent";
import { ConditionalTooltip } from "./ConditionalTooltip";

export interface HoverableIconClassNames {
  root?: string | undefined;
  icon?: string | undefined;
  tooltip?: string | undefined;
}
export const iconSizes: Record<Size, number> = {
  lg: 24,
  md: 20,
  sm: 16,
  xl: 28,
  xs: 14,
};

export type HoverableIconComponent = React.ElementType;
export interface HoverableIconProps {
  Icon: HoverableIconComponent;
  href?: string | undefined;
  external?: boolean | undefined;
  size?: Size | number | undefined;
  defaultColor?: string | undefined;
  tooltip?: string | undefined;
  classNames?: HoverableIconClassNames | undefined;
}
const isPresetSize = (size: Size | number): size is Size => typeof size === "string";

export const HoverableIcon: ReactFC<HoverableIconProps> = ({
  Icon,
  href,
  external = true,
  size = "md",
  defaultColor,
  tooltip,
  classNames,
}) => {
  const { Component, linkProps } = useLinkableComponent({
    external,
    href,
  });

  const iconSize = isPresetSize(size) ? iconSizes[size] : size;

  const elementClassName = cn(
    defaultColor,
    "cursor-pointer opacity-80 transition-opacity hover:opacity-100",
    classNames?.root,
  );

  const iconElement = (
    <Component {...linkProps} className={elementClassName} href={href}>
      <Icon size={iconSize} className={cn(classNames?.icon)} />
    </Component>
  );
  return (
    <ConditionalTooltip
      condition={!!tooltip}
      content={tooltip}
      classNames={{
        tooltip: classNames?.tooltip,
      }}
    >
      {iconElement}
    </ConditionalTooltip>
  );
};
