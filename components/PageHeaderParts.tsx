import type { SVGProps } from "react";
import { cn } from "../lib/utils";

const LINE_CLASS_NAME =
  "origin-center [transform-box:view-box] transition-[transform,opacity] duration-160 ease-(--ease-in-out) in-[body:has(:focus-visible)]:transition-none motion-reduce:transition-none";

export function PageHeaderMenuIcon({
  size = 20,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number | undefined }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      data-slot="page-header-menu-icon"
      {...props}
    >
      <path
        d="M4 12h16"
        className={cn(
          LINE_CLASS_NAME,
          "transform-[translateY(-7px)_rotate(0deg)] group-aria-expanded/page-header-menu:transform-[translateY(0px)_rotate(45deg)]",
        )}
      />
      <path
        d="M4 12h16"
        className={cn(
          LINE_CLASS_NAME,
          "group-aria-expanded/page-header-menu:opacity-0 group-aria-expanded/page-header-menu:transform-[scaleX(0.5)]",
        )}
      />
      <path
        d="M4 12h16"
        className={cn(
          LINE_CLASS_NAME,
          "transform-[translateY(7px)_rotate(0deg)] group-aria-expanded/page-header-menu:transform-[translateY(0px)_rotate(-45deg)]",
        )}
      />
    </svg>
  );
}
