"use client";

import * as React from "react";

import { Command, CommandInput, CommandList } from "../primitives/command";
import {
  AdvancedSelectEmptyState,
  AdvancedSelectFooter,
  AdvancedSelectOptionsGroup,
} from "./AdvancedSelectDropdownParts";
import type { AdvancedSelectOption } from "./AdvancedSelectTypes";

export const AdvancedSelectDropdown = ({
  commandRef,
  filteredOptions,
  handleClearClick,
  handleCloseClick,
  handleCreateOption,
  handleInputKeyDown,
  handleOptionClick,
  handleSearchChange,
  handleSelectAllClick,
  searchable,
  searchQuery,
  selectedValues,
  toggleOption,
}: {
  commandRef: React.RefObject<HTMLDivElement | null>;
  filteredOptions: AdvancedSelectOption[];
  handleClearClick: (event: React.MouseEvent) => void;
  handleCloseClick: (event: React.MouseEvent) => void;
  handleCreateOption: () => void;
  handleInputKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleOptionClick: (value: string) => void;
  handleSearchChange: (value: string) => void;
  handleSelectAllClick: () => void;
  searchable: boolean;
  searchQuery: string;
  selectedValues: string[];
  toggleOption: (value: string) => void;
}) => (
  <Command ref={commandRef} shouldFilter={false} label="Select options">
    {searchable && (
      <CommandInput
        placeholder="Search..."
        onKeyDown={handleInputKeyDown}
        onValueChange={handleSearchChange}
        value={searchQuery}
        data-slot="advanced-select-search"
      />
    )}
    <CommandList className="max-h-[300px]">
      <AdvancedSelectEmptyState
        filteredOptions={filteredOptions}
        onCreate={handleCreateOption}
        searchable={searchable}
        searchQuery={searchQuery}
      />
      <AdvancedSelectOptionsGroup
        filteredOptions={filteredOptions}
        onCreate={handleCreateOption}
        onOptionClick={handleOptionClick}
        onSelectAll={handleSelectAllClick}
        onToggleOption={toggleOption}
        searchable={searchable}
        searchQuery={searchQuery}
        selectedValues={selectedValues}
      />
      <AdvancedSelectFooter
        hasSelection={selectedValues.length > 0}
        onClear={handleClearClick}
        onClose={handleCloseClick}
      />
    </CommandList>
  </Command>
);
