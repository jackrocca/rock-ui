"use client";

import { useTheme } from "next-themes";

import type { ReactFC } from "../lib/types";
import { useMounted } from "../hooks/useMounted";
import type { CustomButtonProps } from "./CustomButton";
import type { ThemeSwitchMinimalClassNames } from "./ThemeSwitchMinimal";
import { ThemeSwitchMinimal } from "./ThemeSwitchMinimal";

export interface ThemeSwitchMinimalNextThemesProps {
  className?: string | undefined;
  classNames?: ThemeSwitchMinimalClassNames | undefined;
  buttonProps?: Partial<CustomButtonProps> | undefined;
}

export const ThemeSwitchMinimalNextThemes: ReactFC<ThemeSwitchMinimalNextThemesProps> = ({
  className,
  classNames,
  buttonProps,
}) => {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  return (
    <ThemeSwitchMinimal
      theme={theme || "light"}
      setTheme={setTheme}
      className={className}
      classNames={classNames}
      buttonProps={buttonProps}
    />
  );
};
