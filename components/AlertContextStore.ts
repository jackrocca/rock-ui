"use client";

import { createContext } from "react";

import type { AlertContextValue } from "./AlertContextTypes";

export const AlertContext = createContext<AlertContextValue | undefined>(undefined);
