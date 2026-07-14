"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Élément HTML rendu (section, div…). */
  as?: ElementType;
  className?: string;
  /** Délai d'apparition (ms). */
  delay?: number;
}

/**
 * Révélation au scroll (fondu + montée légère), en amélioration progressive :
 * le contenu est visible par défaut (sans JS) et n'est animé que si JavaScript
 * tourne ET que l'utilisateur n'a pas demandé moins d'animations.
 */
export function Reveal({ children, as, className, delay = 0 }: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setArmed(true);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    io.observe(el);
    // Filet de sécurité : ne jamais laisser le contenu masqué.
    const safety = window.setTimeout(() => setShown(true), 1400);
    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      style={
        armed
          ? {
              opacity: shown ? 1 : 0,
              transform: shown ? "none" : "translateY(20px)",
              transition: `opacity .7s ease ${delay}ms, transform .75s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
            }
          : undefined
      }
    >
      {children}
    </Tag>
  );
}
