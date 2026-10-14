"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

import { CustomButton } from "./CustomButton";
import {
  TOAST_MOTION_MS,
  TOAST_REDUCED_MOTION_MS,
  toastVariants,
} from "./SimpleToastStyles";
import type * as Types from "./SimpleToastTypes";
import { useControlledOpen } from "../hooks/useControlledOpen";
import { cn } from "../lib/utils";

export type SimpleToastClassNames = Types.SimpleToastClassNames;
export type SimpleToastProps = Types.SimpleToastProps;
export type SimpleToastVariant = Types.SimpleToastVariant;

const EMPTY_CLASS_NAMES: NonNullable<SimpleToastProps["classNames"]> = {};

function motionMs() {
  if (typeof window === "undefined") return TOAST_MOTION_MS;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? TOAST_REDUCED_MOTION_MS
    : TOAST_MOTION_MS;
}

export const SimpleToast = ({
  children,
  open,
  onOpenChange,
  onOpenChangeComplete,
  variant = "default",
  duration = 3000,
  dismissible = true,
  className,
  classNames = EMPTY_CLASS_NAMES,
}: SimpleToastProps) => {
  const { isOpen, setIsOpen } = useControlledOpen({ open, onOpenChange });
  const [rendered, setRendered] = useState(Boolean(open));
  const [entered, setEntered] = useState(false);
  const [shown, setShown] = useState(children);
  const [shownVariant, setShownVariant] = useState(variant);
  const remainingRef = useRef(duration);
  const startedAtRef = useRef(0);
  const timeoutRef = useRef(0);
  const pausedRef = useRef(false);
  const hoveringRef = useRef(false);
  const focusedRef = useRef(false);
  const isOpenRef = useRef(isOpen);
  const hasOpenedRef = useRef(Boolean(open));
  isOpenRef.current = isOpen;

  useEffect(() => {
    if (isOpen) {
      setShown(children);
      setShownVariant(variant);
    }
  }, [children, isOpen, variant]);

  useEffect(() => {
    if (isOpen) {
      hasOpenedRef.current = true;
      setRendered(true);
      let inner = 0;
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => setEntered(true));
      });
      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(inner);
      };
    }
    if (!hasOpenedRef.current) return;
    setEntered(false);
    const hide = window.setTimeout(() => {
      setRendered(false);
      onOpenChangeComplete?.(false);
    }, motionMs());
    return () => window.clearTimeout(hide);
  }, [isOpen, onOpenChangeComplete]);

  useEffect(() => {
    if (!isOpen || !Number.isFinite(duration) || duration <= 0) return;

    remainingRef.current = duration;
    pausedRef.current = hoveringRef.current || focusedRef.current;

    const arm = () => {
      startedAtRef.current = Date.now();
      timeoutRef.current = window.setTimeout(() => {
        isOpenRef.current = false;
        setIsOpen(false);
      }, remainingRef.current);
    };
    if (!pausedRef.current) arm();

    return () => window.clearTimeout(timeoutRef.current);
  }, [duration, isOpen, setIsOpen, shown, shownVariant]);

  const close = () => {
    isOpenRef.current = false;
    setIsOpen(false);
  };

  const pause = () => {
    if (
      !isOpenRef.current ||
      pausedRef.current ||
      !Number.isFinite(duration) ||
      duration <= 0
    ) {
      return;
    }
    pausedRef.current = true;
    window.clearTimeout(timeoutRef.current);
    remainingRef.current = Math.max(
      0,
      remainingRef.current - (Date.now() - startedAtRef.current),
    );
  };

  const resume = () => {
    if (
      !isOpenRef.current ||
      !pausedRef.current ||
      hoveringRef.current ||
      focusedRef.current
    ) {
      return;
    }
    pausedRef.current = false;
    startedAtRef.current = Date.now();
    timeoutRef.current = window.setTimeout(close, remainingRef.current);
  };

  if (!rendered) return null;

  return (
    <div
      className={cn(
        toastVariants({ entered, variant: shownVariant }),
        className,
        classNames.root,
      )}
      data-open={entered}
      data-slot="simple-toast"
      data-variant={shownVariant}
      onBlur={(event) => {
        if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
        focusedRef.current = false;
        resume();
      }}
      onFocus={() => {
        focusedRef.current = true;
        pause();
      }}
      onPointerEnter={() => {
        hoveringRef.current = true;
        pause();
      }}
      onPointerLeave={() => {
        hoveringRef.current = false;
        resume();
      }}
      role={shownVariant === "error" ? "alert" : "status"}
    >
      <p
        className={cn("m-0 min-w-0 flex-1 [overflow-wrap:anywhere]", classNames.message)}
      >
        {shown}
      </p>
      {dismissible ? (
        <CustomButton
          aria-label="Dismiss notification"
          className={cn("text-current", classNames.close)}
          icon={X}
          iconSize={16}
          onClick={close}
          size="md"
          type="button"
          variant="unstyled"
          circle
        />
      ) : null}
    </div>
  );
};
SimpleToast.displayName = "SimpleToast";
