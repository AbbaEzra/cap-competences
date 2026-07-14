"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "cap-cookie-consent";

/** Bandeau cookies (RGPD) — choix mémorisé en localStorage. */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const decide = (choice: "all" | "refuse" | "custom") => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* stockage indisponible : on ferme quand même */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentement aux cookies"
      className="fixed bottom-5 left-5 z-[110] w-[360px] max-w-[calc(100vw-40px)] rounded-cap-xl border border-cap-border bg-white p-5 shadow-cap-pop"
    >
      <div className="mb-2 flex items-center gap-2.5">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F3D66" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <circle cx="9" cy="10" r="1" fill="currentColor" />
          <circle cx="14" cy="14" r="1" fill="currentColor" />
          <circle cx="15" cy="9" r="1" fill="currentColor" />
        </svg>
        <strong className="text-cap-base text-cap-ink">On respecte votre cap (et vos données)</strong>
      </div>
      <p className="text-[13px] leading-[1.5] text-cap-muted">
        Nous utilisons des cookies pour améliorer votre navigation. Vous gardez le contrôle.
      </p>
      <div className="mt-3.5 flex gap-2.5">
        <button
          onClick={() => decide("all")}
          className="flex-1 rounded-[10px] bg-cap-navy py-2.5 text-[13.5px] font-bold text-white"
        >
          Tout accepter
        </button>
        <button
          onClick={() => decide("refuse")}
          className="flex-1 rounded-[10px] border border-cap-border bg-cap-surface-2 py-2.5 text-[13.5px] font-bold text-cap-ink"
        >
          Refuser
        </button>
      </div>
      <button
        onClick={() => decide("custom")}
        className="mt-2 w-full text-center text-[12.5px] font-semibold text-cap-muted"
      >
        Personnaliser
      </button>
    </div>
  );
}
