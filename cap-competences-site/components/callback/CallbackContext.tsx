"use client";

import { useCallback, useMemo, useState, type ReactNode } from "react";
import { CallbackCtx, type CallbackOptions } from "@/components/callback/context";
import { CallbackModal } from "@/components/callback/CallbackModal";

export function CallbackProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<CallbackOptions>({});

  const openCallback = useCallback((opts?: CallbackOptions) => {
    setOptions(opts ?? {});
    setOpen(true);
  }, []);
  const closeCallback = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, options, openCallback, closeCallback }),
    [open, options, openCallback, closeCallback],
  );

  return (
    <CallbackCtx.Provider value={value}>
      {children}
      <CallbackModal />
    </CallbackCtx.Provider>
  );
}
