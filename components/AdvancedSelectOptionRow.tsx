"use client";

import { CheckIcon } from "lucide-react";
import { motion } from "motion/react";

import { cn } from "../lib/utils";
import { CommandItem } from "../primitives/command";
import type { AdvancedSelectOption } from "./AdvancedSelectTypes";
import { optionMatchesSearch } from "./AdvancedSelectUtils";
import { optionAnimationVariants } from "./AdvancedSelectVariants";

const AdvancedSelectCheckbox = ({ checked }: { checked: boolean }) => (
  <div
    aria-hidden="true"
    className={cn(
      "border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
      checked ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible",
    )}
  >
    <CheckIcon className="h-4 w-4" />
  </div>
);
export const AdvancedSelectSelectAllOption = ({
  allSelected,
  disabled,
  onClick,
}: {
  allSelected: boolean;
  disabled: boolean;
  onClick: () => void;
}) => (
  <motion.div
    variants={optionAnimationVariants}
    initial="hidden"
    animate="visible"
    custom={0}
  >
    <CommandItem
      className="min-h-10 cursor-pointer [&>svg:last-child]:hidden"
      value="select-all"
      disabled={disabled}
      onSelect={onClick}
      data-select-all="true"
    >
      <AdvancedSelectCheckbox checked={allSelected} />
      <span>(Select All)</span>
    </CommandItem>
  </motion.div>
);
export const AdvancedSelectOptionRow = ({
  index,
  onClick,
  onToggle,
  option,
  selected,
}: {
  index: number;
  onClick: (value: string) => void;
  onToggle: (value: string) => void;
  option: AdvancedSelectOption;
  selected: boolean;
}) => {
  const IconComponent = option.icon;
  return (
    <motion.div
      variants={optionAnimationVariants}
      initial="hidden"
      animate="visible"
      custom={index + 1}
    >
      <CommandItem
        className={cn(
          "min-h-10 transition-colors [&>svg:last-child]:hidden",
          !option.disabled && "cursor-pointer",
          selected
            ? "bg-accent text-accent-foreground"
            : "hover:bg-accent hover:text-accent-foreground",
        )}
        value={`option:${option.value}`}
        disabled={option.disabled}
        onSelect={() => onClick(option.value)}
        onMouseDown={(event) => {
          if (event.button === 1 && !option.disabled) {
            event.preventDefault();
            onToggle(option.value);
          }
        }}
      >
        <AdvancedSelectCheckbox checked={selected} />
        {IconComponent && (
          <IconComponent className="text-muted-foreground mr-2 h-4 w-4" />
        )}
        {option.emoji && <span className="mr-2">{option.emoji}</span>}
        <span>{option.label || option.value}</span>
      </CommandItem>
    </motion.div>
  );
};
export const AdvancedSelectCreateSuggestion = ({
  filteredOptions,
  onCreate,
  searchQuery,
  searchable,
}: {
  filteredOptions: AdvancedSelectOption[];
  onCreate?: (() => void) | undefined;
  searchable: boolean;
  searchQuery: string;
}) => {
  const normalizedQuery = searchQuery.toLowerCase();
  const hasExactMatch = filteredOptions.some((option) =>
    optionMatchesSearch(option, normalizedQuery),
  );
  const showCreateSuggestion =
    searchable &&
    Boolean(onCreate) &&
    Boolean(searchQuery) &&
    filteredOptions.length > 0 &&
    !hasExactMatch;
  if (!(showCreateSuggestion && onCreate)) {
    return null;
  }
  return (
    <motion.div
      variants={optionAnimationVariants}
      initial="hidden"
      animate="visible"
      custom={filteredOptions.length + 1}
    >
      <CommandItem
        className="min-h-10 cursor-pointer transition-colors [&>svg:last-child]:hidden"
        value={`create:${searchQuery}`}
        onSelect={onCreate}
      >
        <div className="mr-2 flex h-4 w-4 items-center justify-center rounded-sm">
          <span className="text-xl">+</span>
        </div>
        <span>Create &quot;{searchQuery}&quot;</span>
      </CommandItem>
    </motion.div>
  );
};
