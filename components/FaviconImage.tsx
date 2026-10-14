import type { ReactNode } from "react";

import { cn } from "../lib/utils";

export interface FaviconImageProps {
  icon: ReactNode;
  gradient: string;
  size?: number;
  borderRadiusPercent?: number;
  iconSizePercent?: number;
  className?: string;
}
export const FaviconImage = ({
  icon,
  gradient,
  size = 512,
  borderRadiusPercent = 20,
  iconSizePercent = 60,
  className,
}: FaviconImageProps) => {
  const borderRadius = (size * borderRadiusPercent) / 100;
  const iconSize = (size * iconSizePercent) / 100;
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-gradient-to-br",
        gradient,
        className,
      )}
      style={{
        borderRadius,
        height: size,
        width: size,
      }}
    >
      <div
        className="text-white"
        style={{
          height: iconSize,
          width: iconSize,
        }}
      >
        {icon}
      </div>
    </div>
  );
};
