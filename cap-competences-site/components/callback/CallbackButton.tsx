"use client";

import type { ReactNode } from "react";
import { useCallbackModal } from "@/components/callback/context";
import type { CallbackOptions } from "@/components/callback/context";

interface CallbackButtonProps {
  children: ReactNode;
  className?: string;
  options?: CallbackOptions;
  "aria-label"?: string;
}

/** Bouton client qui ouvre la modale « Être rappelé » depuis n'importe quelle page. */
export function CallbackButton({ children, className, options, ...rest }: CallbackButtonProps) {
  const { openCallback } = useCallbackModal();
  return (
    <button type="button" className={className} onClick={() => openCallback(options)} {...rest}>
      {children}
    </button>
  );
}
