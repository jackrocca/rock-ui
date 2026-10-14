"use client";

import React, { useId, useState } from "react";

import { AlertDialogAction, AlertDialogCancel } from "../primitives/alert-dialog";
import { Input } from "../primitives/input";
import type { AlertProps } from "./Alert";
import { Alert } from "./Alert";

export interface ConfirmAlertProps extends Omit<AlertProps, "children" | "body"> {
  confirmLabel?: string | undefined;
  cancelLabel?: string | undefined;
  onConfirm: () => void;
  confirmationText?: string | undefined;
}
const ConfirmAlertRender = ({
  open,
  onOpenChange,
  onOpenChangeComplete,
  title = "Confirm",
  description,
  variant = "default",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  confirmationText,
}: ConfirmAlertProps) => {
  const [phrase, setPhrase] = useState("");
  const inputId = useId();
  const canConfirm = !confirmationText || phrase === confirmationText;
  const handleConfirm = () => {
    if (canConfirm) {
      onConfirm();
    }
  };
  const handleOpenChangeComplete = (isOpen: boolean) => {
    if (!isOpen) {
      setPhrase("");
    }
    onOpenChangeComplete?.(isOpen);
  };
  return (
    <Alert
      open={open}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={handleOpenChangeComplete}
      title={title}
      description={description}
      variant={variant}
      body={
        confirmationText ? (
          <div className="flex flex-col gap-2">
            <label htmlFor={inputId} className="text-sm">
              Type <strong>{confirmationText}</strong> to confirm
            </label>
            <Input
              id={inputId}
              value={phrase}
              onChange={(event) => setPhrase(event.target.value)}
              autoComplete="off"
              spellCheck={false}
            />
          </div>
        ) : undefined
      }
    >
      <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
      <AlertDialogAction
        disabled={!canConfirm}
        onClick={handleConfirm}
        variant={variant === "destructive" ? "destructive" : "default"}
      >
        {confirmLabel}
      </AlertDialogAction>
    </Alert>
  );
};
export const ConfirmAlert = React.memo(ConfirmAlertRender);
ConfirmAlert.displayName = "ConfirmAlert";
