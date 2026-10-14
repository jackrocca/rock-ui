import { tv } from "tailwind-variants";

export const TOAST_MOTION_MS = 400;
export const TOAST_REDUCED_MOTION_MS = 200;

export const toastVariants = tv({
  base: "pointer-events-auto fixed top-4 right-4 z-50 flex min-h-12 w-[min(22rem,calc(100vw-2rem))] items-center gap-4 rounded-xl px-4 py-3 text-xs shadow-[0_8px_32px_rgb(0_0_0/0.1),0_0_0_1px_rgb(0_0_0/0.06)] transition-[opacity,transform] duration-[400ms] ease-[ease] motion-reduce:translate-y-0 motion-reduce:transition-[opacity] motion-reduce:duration-200",
  variants: {
    variant: {
      default: "bg-background text-foreground",
      error: "bg-destructive/10 text-destructive",
      success: "bg-muted text-muted-foreground",
    },
    entered: {
      false: "pointer-events-none -translate-y-3 opacity-0 motion-reduce:translate-y-0",
      true: "translate-y-0 opacity-100",
    },
  },
  defaultVariants: {
    entered: false,
    variant: "default",
  },
});
