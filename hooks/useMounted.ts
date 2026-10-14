"use client";

import { useSyncExternalStore } from "react";

const unsubscribe = () => {};
const subscribe = () => unsubscribe;
export const useMounted = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
