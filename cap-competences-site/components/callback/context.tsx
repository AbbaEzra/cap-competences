"use client";

import { createContext, useContext } from "react";

export interface CallbackOptions {
  /** Titre du panneau (par défaut « Être rappelé sous 24h »). */
  title?: string;
  /** Sous-titre. */
  subtitle?: string;
  /** Ligne de contexte (ex. « Concernant : … »). */
  contextLabel?: string;
  /** Variante du champ central : sujet (défaut) ou situation. */
  field?: "sujet" | "situation";
}

export interface CallbackContextValue {
  open: boolean;
  options: CallbackOptions;
  openCallback: (options?: CallbackOptions) => void;
  closeCallback: () => void;
}

export const CallbackCtx = createContext<CallbackContextValue | null>(null);

export function useCallbackModal(): CallbackContextValue {
  const ctx = useContext(CallbackCtx);
  if (!ctx) throw new Error("useCallbackModal doit être utilisé dans <CallbackProvider>");
  return ctx;
}
