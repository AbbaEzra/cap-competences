"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { useDropdown } from "@/components/ui/useDropdown";
import { useCallbackModal } from "@/components/callback/context";
import { NAV_LINKS, SOCIALS, SITE, ROUTES } from "@/lib/data/site";

interface HeaderProps {
  /** Lien de nav à mettre en évidence. */
  activeHref?: string;
}

// CTA canonique du header (identique sur toutes les pages).
const DEVIS_HREF = `${ROUTES.entreprises}/#devis`;

const SEARCH_INDEX = [
  "Excel — niveau intermédiaire",
  "Excel — tableaux croisés dynamiques",
  "Anglais professionnel (TOEIC)",
  "Photoshop",
  "Illustrator",
  "InDesign",
  "WordPress",
  "AutoCAD",
  "SketchUp",
  "Revit",
  "SEO & référencement",
  "Réseaux sociaux",
  "Management d'équipe",
  "Gestion de projet",
  "Bilan de compétences",
  "Word",
  "PowerPoint",
];

// Styles des CTA SANS propriété d'affichage (on ajoute `hidden/flex` au cas par cas).
// Principal = plein jaune ; secondaire = contour (ghost).
const ctaPrimary =
  "items-center gap-2 rounded-cap-md bg-cap-accent px-[17px] py-2.5 text-[14.5px] font-bold text-cap-ink shadow-cap-cta transition hover:-translate-y-px hover:brightness-[1.03]";
const ctaGhost =
  "items-center gap-2 rounded-cap-md border-[1.5px] border-cap-navy bg-transparent px-[15px] py-2.5 text-[14.5px] font-bold text-cap-navy transition hover:-translate-y-px hover:bg-cap-soft focus-visible:bg-cap-soft";

/**
 * En-tête UNIQUE et CANONIQUE, rendu identique sur toutes les pages :
 * topbar utilitaire + logo + nav (Formations, Entreprises) + recherche + Connexion
 * + bouton « Demander un devis ». Repli responsive en burger sous xl.
 */
export function Header({ activeHref }: HeaderProps) {
  const { openCallback } = useCallbackModal();
  const login = useDropdown<HTMLDivElement>();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const barRef = useRef<HTMLDivElement>(null);

  // Publie la hauteur RÉELLE du header collant (bandeau + nav, hors menu mobile déroulé)
  // dans --header-h, pour que les ancres .scroll-anchor-header se calent dessous.
  // ResizeObserver => suit les changements de breakpoint, le retour à la ligne du bandeau
  // et le chargement des polices.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const apply = () =>
      document.documentElement.style.setProperty(
        "--header-h",
        `${Math.round(bar.getBoundingClientRect().height)}px`,
      );
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(bar);
    window.addEventListener("resize", apply);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", apply);
    };
  }, []);

  const suggestions = query.trim()
    ? SEARCH_INDEX.filter((s) => s.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 6)
    : [];

  return (
    <header className="sticky top-0 z-[60] border-b border-cap-border bg-[rgba(251,252,253,.86)] backdrop-blur-[12px]">
      {/* Bandeau + barre principale : bloc dont la hauteur alimente --header-h
          (le menu mobile déroulé en est volontairement exclu). */}
      <div ref={barRef}>
      {/* Topbar utilitaire */}
      <div className="bg-cap-navy text-[13px] text-[#EaF2FA]">
        <div className="mx-auto flex max-w-cap-container flex-wrap items-center justify-between gap-x-4 gap-y-1 px-cap-gutter py-2">
          <div className="flex items-center gap-[18px] opacity-90">
            <span className="flex items-center gap-[7px]">
              <span className="h-1.5 w-1.5 rounded-full bg-cap-green shadow-[0_0_0_3px_rgba(46,158,107,.25)]" />
              {SITE.phone} · {SITE.phoneHours}
            </span>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="flex gap-[7px]">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-[26px] w-[26px] place-items-center rounded-[7px] bg-white/10 text-[11px] font-bold"
                >
                  {s.short}
                </a>
              ))}
            </div>
            <span className="hidden h-[18px] w-px bg-white/20 sm:inline-block" />
            <span className="hidden opacity-85 sm:inline">Présentiel · Visio · E-learning</span>
          </div>
        </div>
      </div>

      {/* Barre principale */}
      <div className="relative mx-auto flex max-w-cap-container items-center gap-3 px-cap-gutter py-3.5 xl:gap-4">
        <Logo markSize={40} />

        {/* Nav desktop (≥ xl) — « Formations » est un lien direct vers le catalogue
            (plus de méga-menu : le catalogue assure déjà filtre par pôle + recherche). */}
        <nav className="ml-2 hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={`rounded-[9px] px-3 py-2 text-cap-base font-semibold transition hover:bg-cap-surface-2 ${
                activeHref === l.href ? "text-cap-navy" : "text-cap-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          {/* Recherche (≥ 3xl, très grands écrans) */}
          <div className="relative hidden 3xl:block">
            <div className="flex w-[210px] items-center gap-2 rounded-cap-md border border-cap-border bg-cap-surface-2 px-3 py-2">
              <SearchIcon />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Une formation, un métier…"
                aria-label="Rechercher une formation"
                className="w-full border-none bg-transparent text-[14px] text-cap-ink outline-none"
              />
            </div>
            {suggestions.length > 0 && (
              <div className="absolute left-0 top-[calc(100%+8px)] z-[80] w-[300px] rounded-cap-lg border border-cap-border bg-white p-2 shadow-cap-pop">
                <div className="px-2.5 pb-1.5 pt-2 text-[11px] font-bold uppercase tracking-[1px] text-cap-muted">
                  Suggestions
                </div>
                {suggestions.map((s) => (
                  <Link
                    key={s}
                    href={ROUTES.catalogue}
                    className="flex items-center gap-2.5 rounded-[9px] px-2.5 py-2 text-[14px] font-medium hover:bg-cap-surface-2"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2E9E6B" strokeWidth="2">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                    {s}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Connexion (≥ 2xl) — même comportement de dropdown (clic) */}
          <div ref={login.ref} className="relative hidden 2xl:block">
            <button
              onClick={login.toggle}
              aria-expanded={login.open}
              aria-haspopup="true"
              className="flex items-center gap-2 rounded-cap-md border border-cap-border px-3.5 py-2 text-[14.5px] font-semibold text-cap-ink transition hover:bg-cap-surface-2"
            >
              <UserIcon />
              Connexion
              <svg
                width="11"
                height="11"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transition-transform duration-200"
                style={{ transform: login.open ? "rotate(180deg)" : "none" }}
              >
                <path d="M2 4l4 4 4-4" />
              </svg>
            </button>
            {login.open && (
              <div className="absolute right-0 top-[calc(100%+8px)] z-[85] w-[280px] rounded-cap-2xl border border-cap-border bg-white p-2 shadow-cap-pop">
                <a
                  href="#"
                  onClick={login.close}
                  className="flex items-start gap-3 rounded-cap-md p-3 hover:bg-cap-surface-2"
                >
                  <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-cap-md bg-cap-soft">
                    <UserIcon stroke="#0F3D66" />
                  </span>
                  <span>
                    <span className="block text-[14.5px] font-bold text-cap-ink">Espace apprenant</span>
                    <span className="mt-0.5 block text-[12.5px] text-cap-muted">
                      Vos formations & votre progression
                    </span>
                  </span>
                </a>
                <a
                  href="#"
                  onClick={login.close}
                  className="flex items-start gap-3 rounded-cap-md p-3 hover:bg-cap-surface-2"
                >
                  <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-cap-md bg-[rgba(46,158,107,.12)]">
                    <GradIcon />
                  </span>
                  <span>
                    <span className="block text-[14.5px] font-bold text-cap-ink">Espace formateur</span>
                    <span className="mt-0.5 block text-[12.5px] text-cap-muted">
                      Connexion réservée aux formateurs
                    </span>
                  </span>
                </a>
              </div>
            )}
          </div>

          {/* CTA (≥ xl) — repliés dans le burger en dessous. Secondaire (ghost) + principal (plein). */}
          <button
            type="button"
            onClick={() => openCallback()}
            className={`hidden xl:flex ${ctaGhost}`}
          >
            <PhoneIcon />
            Être rappelé
          </button>
          <Link href={DEVIS_HREF} className={`hidden xl:flex ${ctaPrimary}`}>
            <DevisIcon />
            Demander un devis
          </Link>

          {/* Burger (< xl) */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            className="grid h-[42px] w-[42px] flex-shrink-0 place-items-center rounded-cap-md border border-cap-border xl:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#14202B" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>
      </div>

      {/* Menu mobile (< xl) */}
      {menuOpen && (
        <div className="flex flex-col gap-0.5 border-t border-cap-border bg-white px-cap-gutter pb-5 pt-3.5 xl:hidden">
          <div className="mb-2 flex flex-col gap-2">
            <Link
              href={DEVIS_HREF}
              onClick={() => setMenuOpen(false)}
              className={`flex w-full justify-center ${ctaPrimary}`}
            >
              <DevisIcon />
              Demander un devis
            </Link>
            <button
              type="button"
              onClick={() => {
                openCallback();
                setMenuOpen(false);
              }}
              className={`flex w-full justify-center ${ctaGhost}`}
            >
              <PhoneIcon />
              Être rappelé
            </button>
          </div>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-cap-border px-2 py-3.5 text-[16px] font-semibold"
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-3 flex gap-2.5">
            <a href="#" className="flex-1 rounded-cap-md border border-cap-border p-3 text-center text-[14px] font-bold text-cap-navy">
              Espace apprenant
            </a>
            <a href="#" className="flex-1 rounded-cap-md border border-cap-border p-3 text-center text-[14px] font-bold text-cap-green">
              Espace formateur
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function DevisIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M9 13h6M9 17h4" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M4 5c0 8.3 6.7 15 15 15a2 2 0 0 0 2-2v-2.3a1 1 0 0 0-.8-1l-3.6-.7a1 1 0 0 0-1 .4l-.9 1.2a12 12 0 0 1-5.2-5.2l1.2-.9a1 1 0 0 0 .4-1L9.3 4.8a1 1 0 0 0-1-.8H6a2 2 0 0 0-2 2z" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5A6B7A" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </svg>
  );
}
function UserIcon({ stroke = "currentColor" }: { stroke?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2">
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" />
    </svg>
  );
}
function GradIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E9E6B" strokeWidth="2">
      <path d="M3 7l9-4 9 4-9 4-9-4z" />
      <path d="M21 7v6M7 10v4c0 1.5 2.2 3 5 3s5-1.5 5-3v-4" />
    </svg>
  );
}
