import type { CSSProperties } from "react";

export const processColor = (c: string | undefined): string | undefined => {
  if (!c) {
    return undefined;
  }
  return c.startsWith("bg-") ? c.slice(3) : c;
};

export const uiColorStyle = (color: string | undefined): CSSProperties | undefined => {
  const name = processColor(color);
  if (!name) return undefined;
  const value = /^(#|[a-z-]+\(|currentcolor$|transparent$)/i.test(name)
    ? name
    : `var(--color-${name})`;
  return { "--ui-color": value } as CSSProperties;
};
