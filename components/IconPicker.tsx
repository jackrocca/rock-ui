"use client";

import type { ReactNode } from "react";

import { Button } from "../primitives/button";
import type { IconPickerContentProps } from "./IconPickerContent";
import { IconPickerContent } from "./IconPickerContent";
import type { IconValue } from "./icon-types";
import { PickedIcon } from "./PickedIcon";
import { PickerPopover } from "./PickerPopover";

export interface IconPickerProps extends Omit<IconPickerContentProps, "onSelect"> {
  onChange: (value: IconValue) => void;
  trigger?: ReactNode;
  disabled?: boolean;
  label?: string;
}
export const IconPicker = ({
  onChange,
  trigger,
  disabled,
  label = "Choose icon",
  ...props
}: IconPickerProps) => (
  <PickerPopover
    label={label}
    disabled={disabled}
    trigger={
      trigger ?? (
        <Button
          variant="outline"
          disabled={disabled}
          aria-label={label}
          className="size-10 cursor-pointer p-0 shadow-none"
        >
          <PickedIcon value={props.value ?? { name: "lucide:smile" }} />
        </Button>
      )
    }
  >
    {(close) => (
      <IconPickerContent
        {...props}
        onSelect={(value) => {
          onChange(value);
          close();
        }}
      />
    )}
  </PickerPopover>
);
