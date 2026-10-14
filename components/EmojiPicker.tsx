"use client";

import type { ReactNode } from "react";

import { Button } from "../primitives/button";
import { EmojiPickerContent } from "./EmojiPickerContent";
import { PickerPopover } from "./PickerPopover";

export interface EmojiPickerProps {
  value?: string;
  onChange: (emoji: string) => void;
  trigger?: ReactNode;
  disabled?: boolean;
  label?: string;
  theme?: "light" | "dark" | "auto";
}
export const EmojiPicker = ({
  value,
  onChange,
  trigger,
  disabled,
  label = "Choose emoji",
  theme,
}: EmojiPickerProps) => (
  <PickerPopover
    label={label}
    disabled={disabled}
    trigger={
      trigger ?? (
        <Button
          variant="outline"
          disabled={disabled}
          aria-label={label}
          className="size-10 cursor-pointer p-0 text-xl shadow-none"
        >
          {value || "😀"}
        </Button>
      )
    }
  >
    {(close) => (
      <EmojiPickerContent
        theme={theme}
        onSelect={(emoji) => {
          onChange(emoji);
          close();
        }}
      />
    )}
  </PickerPopover>
);
