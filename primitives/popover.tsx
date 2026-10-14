"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";

import { useKitzeUI } from "../components/KitzeUIContext";
import { cn } from "../lib/utils";

const Popover = ({ ...props }: PopoverPrimitive.Root.Props) => (
  <PopoverPrimitive.Root data-slot="popover" {...props} />
);
const PopoverTrigger = ({ ...props }: PopoverPrimitive.Trigger.Props) => (
  <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
);
const PopoverContent = ({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  classNames,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  > & {
    classNames?: { positioner?: string | undefined } | undefined;
  }) => {
  const { portalContainer } = useKitzeUI();
  return (
    <PopoverPrimitive.Portal container={portalContainer ?? undefined}>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className={cn("isolate z-50", classNames?.positioner)}
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            "bg-popover text-popover-foreground z-50 w-72 origin-(--transform-origin) rounded-xl border p-4 shadow-md transition-[opacity,scale] duration-150 outline-none data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none",
            className,
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
};
const PopoverTitle = ({ ...props }: PopoverPrimitive.Title.Props) => (
  <PopoverPrimitive.Title data-slot="popover-title" {...props} />
);
const PopoverDescription = ({ ...props }: PopoverPrimitive.Description.Props) => (
  <PopoverPrimitive.Description data-slot="popover-description" {...props} />
);
export { Popover, PopoverTrigger, PopoverContent, PopoverTitle, PopoverDescription };
