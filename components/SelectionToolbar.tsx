"use client";

import type { ElementType } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { cn } from "../lib/utils";

export interface SelectionAction {
  label: string;
  icon?: ElementType | undefined;
  onSelect: (text: string) => void;
}

export interface SelectionToolbarProps {
  actions: SelectionAction[];
  within?: string | undefined;
  minLength?: number | undefined;
  maxLength?: number | undefined;
  className?: string | undefined;
}

interface Selected {
  text: string;
  rect: DOMRect;
}

const EDGE = 8;

export function SelectionToolbar({
  actions,
  within,
  minLength = 3,
  maxLength = 2000,
  className,
}: SelectionToolbarProps) {
  const [selected, setSelected] = useState<Selected | null>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let pointerDown = false;
    let frame = 0;
    let dismissed: string | null = null;
    const read = () => {
      const selection = window.getSelection();
      const text = selection?.toString().trim() ?? "";
      if (text !== dismissed) dismissed = null;
      if (
        dismissed !== null ||
        !selection ||
        selection.isCollapsed ||
        selection.rangeCount === 0 ||
        text.length < minLength ||
        text.length > maxLength
      ) {
        setSelected(null);
        return;
      }
      const range = selection.getRangeAt(0);
      const node = range.commonAncestorContainer;
      const element = node instanceof Element ? node : node.parentElement;
      if (within && !element?.closest(within)) {
        setSelected(null);
        return;
      }
      setSelected({ text, rect: range.getBoundingClientRect() });
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(read);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (toolbarRef.current?.contains(event.target as Node)) return;
      pointerDown = true;
      dismissed = null;
      setSelected(null);
    };
    const onPointerUp = () => {
      if (!pointerDown) return;
      pointerDown = false;
      schedule();
    };
    const onSelectionChange = () => {
      if (!pointerDown) schedule();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      cancelAnimationFrame(frame);
      dismissed = window.getSelection()?.toString().trim() || null;
      setSelected(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointerup", onPointerUp);
    document.addEventListener("pointercancel", onPointerUp);
    document.addEventListener("selectionchange", onSelectionChange);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", schedule, true);
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointercancel", onPointerUp);
      document.removeEventListener("selectionchange", onSelectionChange);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", schedule, true);
      window.removeEventListener("resize", schedule);
    };
  }, [within, minLength, maxLength]);

  useLayoutEffect(() => {
    const toolbar = toolbarRef.current;
    if (!toolbar || !selected) return;
    const { rect } = selected;
    const half = toolbar.offsetWidth / 2;
    const center = Math.min(
      Math.max(rect.left + rect.width / 2, half + EDGE),
      window.innerWidth - half - EDGE,
    );
    const above = rect.top - toolbar.offsetHeight - EDGE;
    toolbar.style.left = `${center - half}px`;
    toolbar.style.top = `${above >= EDGE ? above : rect.bottom + EDGE}px`;
  }, [selected]);

  if (!selected) return null;
  return createPortal(
    <div
      ref={toolbarRef}
      role="toolbar"
      aria-label="Selection actions"
      data-slot="selection-toolbar"
      onMouseDown={(event) => event.preventDefault()}
      className={cn(
        "bg-foreground text-background animate-pop-in fixed z-50 flex items-center gap-0.5 rounded-full p-0.5 shadow-[0_6px_20px_rgba(0,0,0,0.18)] motion-reduce:animate-none",
        className,
      )}
    >
      {actions.map(({ label, icon: Icon, onSelect }) => (
        <button
          key={label}
          type="button"
          onClick={() => {
            onSelect(selected.text);
            setSelected(null);
          }}
          className="hover:bg-background/15 focus-visible:ring-background/60 flex h-7 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium whitespace-nowrap transition-colors duration-150 outline-none focus-visible:ring-2 motion-reduce:transition-none [&_svg]:size-3.5 [&_svg]:shrink-0"
        >
          {Icon ? <Icon aria-hidden="true" /> : null}
          {label}
        </button>
      ))}
    </div>,
    document.body,
  );
}
