"use client";

import { motion } from "motion/react";
import * as React from "react";

import { CommandEmpty, CommandGroup, CommandSeparator } from "../primitives/command";
import { Separator } from "../primitives/separator";
import {
  AdvancedSelectCreateSuggestion,
  AdvancedSelectOptionRow,
  AdvancedSelectSelectAllOption,
} from "./AdvancedSelectOptionRow";
import type { AdvancedSelectOption } from "./AdvancedSelectTypes";

export const AdvancedSelectEmptyState = ({
  filteredOptions,
  onCreate,
  searchable,
  searchQuery,
}: {
  filteredOptions: AdvancedSelectOption[];
  onCreate?: (() => void) | undefined;
  searchable: boolean;
  searchQuery: string;
}) => {
  if (searchable && filteredOptions.length === 0 && searchQuery && onCreate) {
    return (
      <CommandEmpty className="py-0">
        <button
          type="button"
          className="hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center px-2 py-1.5 text-sm"
          onClick={onCreate}
        >
          <div className="mr-2 flex h-4 w-4 items-center justify-center rounded-sm">
            <span className="text-xl">+</span>
          </div>
          Create &quot;{searchQuery}&quot;
        </button>
      </CommandEmpty>
    );
  }
  if (searchable && filteredOptions.length === 0 && (!searchQuery || !onCreate)) {
    return <CommandEmpty className="ml-2 py-1.5">No results found.</CommandEmpty>;
  }
  return null;
};
export const AdvancedSelectOptionsGroup = ({
  filteredOptions,
  onCreate,
  onOptionClick,
  onSelectAll,
  onToggleOption,
  searchable,
  searchQuery,
  selectedValues,
}: {
  filteredOptions: AdvancedSelectOption[];
  onCreate?: (() => void) | undefined;
  onOptionClick: (value: string) => void;
  onSelectAll: () => void;
  onToggleOption: (value: string) => void;
  searchable: boolean;
  searchQuery: string;
  selectedValues: string[];
}) => (
  <CommandGroup>
    {!searchable && (
      <>
        <AdvancedSelectSelectAllOption
          allSelected={
            filteredOptions.some((option) => !option.disabled) &&
            filteredOptions.every(
              (option) => option.disabled || selectedValues.includes(option.value),
            )
          }
          disabled={!filteredOptions.some((option) => !option.disabled)}
          onClick={onSelectAll}
        />
        <CommandSeparator />
      </>
    )}
    {filteredOptions.map((option, index) => (
      <AdvancedSelectOptionRow
        key={option.value}
        index={index}
        onClick={onOptionClick}
        onToggle={onToggleOption}
        option={option}
        selected={selectedValues.includes(option.value)}
      />
    ))}
    <AdvancedSelectCreateSuggestion
      filteredOptions={filteredOptions}
      onCreate={onCreate}
      searchable={searchable}
      searchQuery={searchQuery}
    />
  </CommandGroup>
);
export const AdvancedSelectFooter = ({
  hasSelection,
  onClear,
  onClose,
}: {
  hasSelection: boolean;
  onClear: (event: React.MouseEvent) => void;
  onClose: (event: React.MouseEvent) => void;
}) => (
  <CommandGroup>
    <div className="flex items-center justify-between">
      {hasSelection && (
        <>
          <motion.button
            type="button"
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="hover:bg-accent hover:text-accent-foreground flex-1 cursor-pointer justify-center py-1.5 text-center text-sm"
            onClick={onClear}
          >
            Clear
          </motion.button>
          <Separator orientation="vertical" className="flex h-full min-h-6" />
        </>
      )}
      <motion.button
        type="button"
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.95,
        }}
        className="hover:bg-accent hover:text-accent-foreground flex-1 cursor-pointer justify-center py-1.5 text-center text-sm"
        onClick={onClose}
      >
        Close
      </motion.button>
    </div>
  </CommandGroup>
);
