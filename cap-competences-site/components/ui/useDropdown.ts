"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Comportement unique et partagé pour TOUS les menus déroulants du site :
 * - clic sur le déclencheur → ouvre (toggle) ;
 * - re-clic, clic en dehors (souris ET tactile via `pointerdown`), ou Échap → ferme ;
 * - clic sur un item → appeler `close()` dans son onClick pour fermer après navigation.
 *
 * Le déclencheur ET le panneau doivent être placés à l'intérieur de l'élément
 * portant `ref` (utiliser un wrapper `className="contents"` si le panneau doit
 * rester en overlay pleine largeur sans créer de boîte).
 */
export function useDropdown<T extends HTMLElement = HTMLDivElement>() {
  const [open, setOpen] = useState(false);
  const ref = useRef<T>(null);

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return { open, setOpen, toggle, close, ref };
}
