import React from "react";
import type { FieldValues, FieldPath } from "react-hook-form";

import { Checkbox } from "../primitives/checkbox";
import { Label } from "../primitives/label";
import { cn } from "../lib/utils";
import type { FormFieldWrapperProps } from "./FormFieldWrapper";
import { FormFieldWrapper } from "./FormFieldWrapper";

const FormFieldCheckboxControl = ({
  label,
  ...controlProps
}: React.ComponentProps<typeof Checkbox> & { label: React.ReactNode }) => (
  <div className="flex items-center space-x-2">
    <Checkbox {...controlProps} />
    <Label
      htmlFor={controlProps.id}
      className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {label}
      {controlProps.required && <span className="text-destructive ml-1">*</span>}
    </Label>
  </div>
);

export interface FormFieldCheckboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<FormFieldWrapperProps<TFieldValues, TName>, "children" | "label"> {
  label: React.ReactNode;
  checkboxClassName?: string;
}
export const FormFieldCheckbox = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  checkboxClassName,
  ...wrapperProps
}: FormFieldCheckboxProps<TFieldValues, TName>) => (
  <FormFieldWrapper<TFieldValues, TName> {...wrapperProps} label={undefined}>
    {(field) => (
      <FormFieldCheckboxControl
        label={label}
        checked={field.value}
        onCheckedChange={(value) => field.onChange(value)}
        onBlur={() => field.onBlur()}
        name={field.name}
        ref={field.ref}
        required={wrapperProps.required}
        className={cn(checkboxClassName)}
      />
    )}
  </FormFieldWrapper>
);
