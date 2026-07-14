"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { CompassNeedle } from "@/components/brand/CompassNeedle";
import { CallbackButton } from "@/components/callback/CallbackButton";
import type { PublicPole } from "@/lib/catalogue";
import { ROUTES } from "@/lib/data/site";

// Recherche insensible à la casse ET aux accents (minuscules + suppression diacritiques).
const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

// Sélecteur de profil — notes d'ORIENTATION neutres (aucune mention de dispositif).
const PROFILS: Record<string, { label: string; angle: number; note: string }> = {
  salarie: {
    label: "Salarié",
    angle: 0,
    note: "Des parcours pour monter en compétences sans quitter votre poste.",
  },
  demandeur: {
    label: "Demandeur d'emploi",
    angle: 270,
    note: "Des parcours pour vous repositionner vers le bon métier.",
  },
  independant: {
    label: "Indépendant / Freelance",
    angle: 45,
    note: "Des parcours pour développer votre activité et vos compétences clés.",
  },
  entreprise: {
    label: "Entreprise",
    angle: 135,
    note: "Des formations sur-mesure, en intra, adaptées à vos équipes.",
  },
};

export function CatalogueClient({ poles }: { poles: PublicPole[] }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [profil, setProfil] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const flat = useMemo(
    () => poles.flatMap((p) => p.formations.map((f) => ({ ...f, pole: p }))),
    [poles],
  );

  // Branchement ?profil= et ?focus=recherche (lus côté client, compatible export statique).
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const p = params.get("profil");
      if (p && PROFILS[p]) setProfil(p);
      if (params.get("focus") === "recherche") {
        // Focus + positionnement INSTANTANÉ du champ sous le header (offset explicite,
        // scroll document — robuste vs hero overflow-hidden).
        const place = () => {
          searchRef.current?.focus({ preventScroll: true });
          const el = searchBoxRef.current;
          if (el) {
            // Même offset que .scroll-anchor-header : hauteur réelle du header (--header-h) + 20px.
            const headerH =
              parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h"), 10) || 116;
            const y = el.getBoundingClientRect().top + window.scrollY - (headerH + 20);
            window.scrollTo(0, Math.max(0, y));
          }
        };
        // On attend que les polices (next/font) soient appliquées : sinon un reflow APRÈS
        // le scroll remonte le champ sous le header. fonts.ready = mise en page stabilisée.
        const fonts = (document as Document & { fonts?: { ready?: Promise<unknown> } }).fonts;
        if (fonts?.ready) {
          fonts.ready.then(() => window.requestAnimationFrame(place));
        } else {
          window.setTimeout(place, 300);
        }
      }
    } catch {
      /* noop */
    }
  }, []);

  // Filtre profil « Je suis… » : une formation est retenue si ses `profils` contiennent
  // le profil choisi (logique transposée de la maquette : profil → pôles pertinents).
  const profilBase = useMemo(
    () => (profil ? flat.filter((f) => f.profils.includes(profil)) : flat),
    [flat, profil],
  );

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return profilBase.filter((f) => {
      if (cat !== "all" && f.pole.id !== cat) return false;
      if (q && !normalize(f.searchText).includes(q)) return false;
      return true;
    });
  }, [query, cat, profilBase]);

  const groups = useMemo(
    () =>
      poles
        .map((p) => ({ pole: p, items: filtered.filter((f) => f.pole.id === p.id) }))
        .filter((g) => g.items.length > 0),
    [filtered, poles],
  );

  // Compteurs par domaine cohérents avec le profil sélectionné.
  const catCounts = useMemo(() => {
    const counts: Record<string, number> = { all: profilBase.length };
    poles.forEach((p) => (counts[p.id] = profilBase.filter((f) => f.pole.id === p.id).length));
    return counts;
  }, [profilBase, poles]);

  const pd = profil ? PROFILS[profil] : null;
  const rowBase =
    "flex w-full items-center justify-between gap-2 rounded-[9px] px-2.5 py-2 text-[14px] font-semibold text-left transition";

  return (
    <>
      {/* Hero + recherche */}
      <section className="relative overflow-hidden border-b border-cap-border bg-cap-hero-light">
        <svg viewBox="0 0 200 200" aria-hidden="true" className="absolute -right-[50px] -top-[50px] h-[330px] w-[330px] text-[rgba(15,61,102,.06)]">
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="100" cy="100" r="92" />
            <circle cx="100" cy="100" r="62" />
            <line x1="100" y1="8" x2="100" y2="192" />
            <line x1="8" y1="100" x2="192" y2="100" />
            <line x1="35" y1="35" x2="165" y2="165" />
            <line x1="165" y1="35" x2="35" y2="165" />
          </g>
        </svg>
        <div className="relative mx-auto max-w-cap-container px-cap-gutter py-[clamp(30px,3.6vw,48px)]">
          <span className="text-[13px] font-bold uppercase tracking-[1.4px] text-cap-green">Le catalogue</span>
          <h1 className="serif mt-2 text-[clamp(30px,4vw,46px)] font-bold leading-[1.06] tracking-[-.8px]">
            Toutes nos formations, un seul cap : le vôtre.
          </h1>
          <p className="mt-3 max-w-[620px] text-[clamp(16px,1.5vw,18px)] text-cap-ink-muted">
            Sept pôles, des programmes sur-mesure en présentiel (Île-de-France) et à distance. Chaque formation
            mène à une fiche détaillée.
          </p>
          <div
            ref={searchBoxRef}
            className="scroll-anchor-header mt-[22px] flex max-w-[520px] items-center gap-2.5 rounded-cap-lg border border-cap-border bg-white px-4 py-3 shadow-[0_12px_30px_-20px_rgba(15,61,102,.3)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5A6B7A" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.2-3.2" />
            </svg>
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher : Excel, anglais, WordPress, management…"
              aria-label="Rechercher une formation"
              className="flex-1 border-none bg-transparent text-[15.5px] text-cap-ink outline-none"
            />
          </div>
        </div>
      </section>

      {/* Sélecteur de profil */}
      <div id="profils" className="scroll-anchor-header border-b border-cap-border bg-white">
        <div className="mx-auto max-w-cap-container px-cap-gutter py-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[12.5px] font-bold uppercase tracking-[.6px] text-cap-muted">Je suis :</span>
            {Object.entries(PROFILS).map(([id, p]) => {
              const selected = profil === id;
              return (
                <button
                  key={id}
                  onClick={() => setProfil(selected ? null : id)}
                  aria-pressed={selected}
                  className={`inline-flex items-center gap-2 rounded-cap-pill border px-3.5 py-2 text-[13.5px] font-semibold transition ${
                    selected
                      ? "border-cap-green bg-[rgba(46,158,107,.08)] text-cap-ink"
                      : "border-cap-border bg-white text-cap-ink hover:border-cap-navy"
                  }`}
                >
                  <CompassNeedle angle={p.angle} size={20} ringOpacity={0.4} />
                  {p.label}
                </button>
              );
            })}
          </div>
          {pd && (
            <div className="mt-3 flex flex-wrap items-center gap-3 rounded-cap-lg border border-[#D2E0EE] bg-cap-soft px-5 py-3.5">
              <CompassNeedle angle={pd.angle} size={22} ringOpacity={0.4} />
              <span className="min-w-[220px] flex-1 text-[14px] leading-[1.55] text-cap-ink">
                <strong>{pd.label}</strong> — {pd.note}
              </span>
              <button onClick={() => setProfil(null)} className="text-[13px] font-bold text-cap-navy">
                Réinitialiser ✕
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Corps : filtre domaine + résultats. Empilé (1 colonne) < lg, 2 colonnes ≥ lg. */}
      <div className="mx-auto flex max-w-cap-container flex-col items-start gap-[clamp(20px,2.6vw,34px)] px-cap-gutter py-[clamp(24px,3vw,40px)] lg:flex-row">
        <aside className="w-full self-start lg:sticky lg:top-[82px] lg:w-[280px] lg:flex-shrink-0">
          {/* < lg : accordéon « Filtrer par domaine » pour ne pas pousser la liste trop bas */}
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
            className="mb-3 flex w-full items-center justify-between gap-3 rounded-cap-xl border border-cap-border bg-white px-4 py-3 lg:hidden"
          >
            <span className="flex items-center gap-2 text-[15px] font-bold text-cap-ink">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0F3D66" strokeWidth="2">
                <path d="M3 5h18M6 12h12M10 19h4" />
              </svg>
              Filtrer par domaine
            </span>
            <span className="flex items-center gap-2 text-[13px] font-semibold text-cap-muted">
              {cat === "all" ? "Tous les pôles" : poles.find((p) => p.id === cat)?.titre}
              <svg
                width="14"
                height="14"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transition-transform duration-200"
                style={{ transform: filtersOpen ? "rotate(180deg)" : "none" }}
              >
                <path d="M2 4l4 4 4-4" />
              </svg>
            </span>
          </button>

          <div className={`${filtersOpen ? "block" : "hidden"} rounded-cap-xl border border-cap-border bg-white p-5 lg:block`}>
            <div className="mb-1.5 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-[16px] font-bold text-cap-ink">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0F3D66" strokeWidth="2">
                  <path d="M3 5h18M6 12h12M10 19h4" />
                </svg>
                Domaines
              </h2>
              {cat !== "all" && (
                <button onClick={() => setCat("all")} className="text-[12.5px] font-bold text-cap-navy">
                  Tout voir
                </button>
              )}
            </div>
            <div className="mt-3 flex flex-col gap-0.5">
              {[{ id: "all", titre: "Tous les pôles", numero: 0, angle: 0 }, ...poles].map((c) => {
                const active = cat === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      setCat(c.id);
                      setFiltersOpen(false);
                    }}
                    aria-pressed={active}
                    className={`${rowBase} ${active ? "bg-cap-soft text-cap-navy" : "text-cap-ink-muted hover:bg-cap-surface-2"}`}
                  >
                    <span className="flex items-center gap-2">
                      {c.id !== "all" && <CompassNeedle angle={c.angle} size={18} ringOpacity={0.35} />}
                      {c.titre}
                    </span>
                    <span
                      className={`rounded-[7px] px-2 py-0.5 text-[11.5px] font-bold ${
                        active ? "bg-white text-cap-navy" : "bg-cap-surface-2 text-[#9DB1C2]"
                      }`}
                    >
                      {catCounts[c.id]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <main className="w-full min-w-0 lg:flex-1">
          <div className="mb-[18px] flex flex-wrap items-baseline justify-between gap-4">
            <span className="text-[15px] text-cap-muted">
              <strong className="font-bold text-cap-ink">{filtered.length}</strong>{" "}
              {filtered.length > 1 ? "formations" : "formation"}
            </span>
            <span className="text-[13.5px] text-cap-muted">
              {cat === "all" ? "Tous les pôles" : poles.find((p) => p.id === cat)?.titre}
            </span>
          </div>

          {groups.length > 0 ? (
            <div className="flex flex-col gap-10">
              {groups.map(({ pole, items }) => (
                <section key={pole.id} aria-labelledby={`pole-${pole.id}`}>
                  <div className="mb-3 flex items-center gap-3">
                    <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-cap-md bg-cap-soft">
                      <CompassNeedle angle={pole.angle} size={24} ringOpacity={0.35} />
                    </span>
                    <h3
                      id={`pole-${pole.id}`}
                      className="serif scroll-anchor-header text-[22px] font-bold tracking-[-.3px] text-cap-ink"
                    >
                      {pole.titre}
                    </h3>
                    <span className="text-[13px] text-cap-muted">
                      {items.length} formation{items.length > 1 ? "s" : ""}
                    </span>
                  </div>
                  <p className="mb-4 max-w-[760px] text-[14.5px] leading-[1.55] text-cap-muted">{pole.accroche}</p>
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(min(290px,100%),1fr))] gap-[15px]">
                    {items.map((f) => (
                      <Link
                        key={f.id}
                        href={ROUTES.formation(f.id)}
                        className="flex flex-col rounded-cap-xl border border-cap-border bg-white p-5 transition duration-200 hover:-translate-y-[3px] hover:border-[#CBD9E6] hover:shadow-[0_20px_40px_-22px_rgba(15,61,102,.45)]"
                      >
                        <span className="inline-flex items-center gap-2 text-[12.5px] font-bold text-cap-navy">
                          <CompassNeedle angle={pole.angle} size={20} ringOpacity={0.35} />
                          {pole.titre}
                        </span>
                        <h4 className="serif mt-3 text-[18.5px] font-bold leading-[1.2] tracking-[-.2px] text-cap-ink">
                          {f.titre}
                        </h4>
                        <p className="mt-2 line-clamp-3 flex-1 text-[14px] leading-[1.5] text-cap-muted">
                          {f.objectif}
                        </p>
                        <span className="mt-3.5 inline-flex items-center gap-1.5 border-t border-cap-border-2 pt-3.5 text-[13.5px] font-bold text-cap-navy">
                          Voir la fiche
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="rounded-cap-xl border border-dashed border-[#C9D6E2] bg-white px-6 py-12 text-center">
              <svg width="48" height="48" viewBox="0 0 40 40" aria-hidden="true" className="mx-auto mb-3.5 block opacity-50">
                <circle cx="20" cy="20" r="18" fill="none" stroke="#0F3D66" strokeWidth="1.5" />
                <polygon points="20,7 23,20 20,33 17,20" fill="#0F3D66" />
                <circle cx="20" cy="20" r="2" fill="#fff" stroke="#0F3D66" strokeWidth="1.2" />
              </svg>
              <h3 className="serif text-[21px] font-bold text-cap-ink">Aucune formation sur ce cap… pour l'instant</h3>
              <p className="mt-2 text-[14.5px] text-cap-muted">
                Élargissez vos critères, ou dites-nous ce que vous cherchez : on vous oriente.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2.5">
                <button
                  onClick={() => {
                    setQuery("");
                    setCat("all");
                  }}
                  className="rounded-cap-md bg-cap-navy px-5 py-2.5 text-[14px] font-bold text-white"
                >
                  Réinitialiser
                </button>
                <CallbackButton className="rounded-cap-md border-[1.5px] border-cap-border bg-white px-5 py-2.5 text-[14px] font-bold text-cap-navy">
                  Être rappelé
                </CallbackButton>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
