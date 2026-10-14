"use client";

import { motion } from "motion/react";
import * as React from "react";

import { Button } from "../primitives/button";
import { Popover, PopoverContent, PopoverTrigger } from "../primitives/popover";
import { cn } from "../lib/utils";
import { AdvancedSelectDropdown } from "./AdvancedSelectDropdown";
import { useAdvancedSelectState } from "./AdvancedSelectState";
import {
  AdvancedSelectTriggerContent,
  AdvancedSelectTriggerIcon,
} from "./AdvancedSelectTrigger";
import type * as AdvancedSelectTypesModule from "./AdvancedSelectTypes";
import { contentAnimationVariants } from "./AdvancedSelectVariants";

export type AdvancedSelectOption = AdvancedSelectTypesModule.AdvancedSelectOption;
export type AdvancedSelectProps = AdvancedSelectTypesModule.AdvancedSelectProps;
const EMPTY_SELECTION: string[] = [];

const AdvancedSelectRender: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  AdvancedSelectProps
> = (
  {
    options,
    onValueChange,
    value: controlledValue,
    variant,
    defaultValue = EMPTY_SELECTION,
    searchable = false,
    placeholder = "Select options",
    maxCount = 3,
    modalPopover = false,
    asChild: _asChild = false,
    className,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    loading = false,
    onCreate,
    ...props
  },
  ref,
) => {
  const commandRef = React.useRef<HTMLDivElement>(null);
  const state = useAdvancedSelectState({
    controlledValue,
    defaultValue,
    maxCount,
    onCreate,
    onValueChange,
    options,
    searchable,
  });
  return (
    <Popover
      open={state.isPopoverOpen}
      onOpenChange={(value) => state.setIsPopoverOpen(value)}
      modal={modalPopover}
    >
      <PopoverTrigger
        render={
          <Button
            ref={ref}
            {...props}
            onClick={state.handleTogglePopover}
            disabled={loading || props.disabled}
            className={cn(
              "flex h-auto min-h-10 w-full items-center justify-between rounded-md border bg-inherit p-1 transition-all duration-200 hover:bg-inherit [&_svg]:pointer-events-auto",
              loading && "cursor-not-allowed opacity-50",
              className,
            )}
            data-slot="advanced-select-trigger"
          />
        }
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex min-h-[28px] flex-1 items-center pl-2">
            <AdvancedSelectTriggerContent
              LeftIcon={LeftIcon}
              loading={loading}
              maxCount={maxCount}
              onClearExtra={() => state.clearExtraOptions()}
              onMiddleClick={state.handleMiddleClick}
              onRemove={(value) => state.toggleOption(value)}
              optionsByValue={state.optionsByValue}
              placeholder={placeholder}
              selectedValues={state.selectedValues}
              variant={variant}
            />
          </div>
          <div className="ml-2 flex shrink-0 items-center justify-center pr-2">
            <AdvancedSelectTriggerIcon RightIcon={RightIcon} />
          </div>
        </div>
      </PopoverTrigger>

      <PopoverContent
        className="w-auto p-0"
        align="start"
        data-slot="advanced-select-content"
        initialFocus={() =>
          commandRef.current?.querySelector<HTMLElement>(
            searchable ? "[cmdk-input]" : "[cmdk-list]",
          ) ?? false
        }
        render={
          <motion.div
            initial="hidden"
            animate="visible"
            variants={contentAnimationVariants}
            className="w-[var(--anchor-width)]"
            style={{
              maxWidth: "calc(100vw - 32px)",
              width: "var(--anchor-width)",
            }}
          />
        }
      >
        <AdvancedSelectDropdown
          commandRef={commandRef}
          {...{
            handleClearClick: state.handleClearClick,
            handleCloseClick: state.handleCloseClick,
            handleCreateOption: state.handleCreateOption,
            handleInputKeyDown: state.handleInputKeyDown,
            handleOptionClick: state.handleOptionClick,
            handleSearchChange: state.handleSearchChange,
            handleSelectAllClick: state.handleSelectAllClick,
          }}
          {...{
            handleClearClick: state.handleClearClick,
            handleCloseClick: state.handleCloseClick,
            handleCreateOption: state.handleCreateOption,
            handleInputKeyDown: state.handleInputKeyDown,
            handleOptionClick: state.handleOptionClick,
            handleSearchChange: state.handleSearchChange,
            handleSelectAllClick: state.handleSelectAllClick,
          }}
          filteredOptions={state.filteredOptions}
          searchable={searchable}
          searchQuery={state.searchQuery}
          selectedValues={state.selectedValues}
          toggleOption={state.toggleOption}
        />
      </PopoverContent>
    </Popover>
  );
};
export const AdvancedSelect = React.forwardRef<HTMLButtonElement, AdvancedSelectProps>(
  AdvancedSelectRender,
);
AdvancedSelect.displayName = "AdvancedSelect";
