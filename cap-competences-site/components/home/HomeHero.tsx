"use client";

import { useState } from "react";
import Link from "next/link";
import { CompassNeedle } from "@/components/brand/CompassNeedle";
import { useCallbackModal } from "@/components/callback/context";
import { profiles, type ProfileId } from "@/lib/data/home";
import { ROUTES } from "@/lib/data/site";

/** Hero d'accueil : promesse + sélecteur de profil (aiguillage) interactif. */
export function HomeHero({ stats }: { stats: { value: string; label: string }[] }) {
  const { openCallback } = useCallbackModal();
  const [active, setActive] = useState<ProfileId | null>(null);
  const current = profiles.find((p) => p.id === active) ?? null;

  return (
    <section className="relative overflow-hidden bg-cap-hero-light py-[clamp(40px,5.5vw,76px)] text-cap-ink">
      {/* Rose des vents décorative */}
      <svg
        viewBox="0 0 200 200"
        aria-hidden="true"
        className="pointer-events-none absolute -right-[90px] -top-[70px] h-[clamp(340px,40vw,560px)] w-[clamp(340px,40vw,560px)] text-[rgba(15,61,102,.07)]"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="100" cy="100" r="96" />
          <circle cx="100" cy="100" r="70" />
          <circle cx="100" cy="100" r="44" />
          <line x1="100" y1="2" x2="100" y2="198" />
          <line x1="2" y1="100" x2="198" y2="100" />
          <line x1="29" y1="29" x2="171" y2="171" />
          <line x1="171" y1="29" x2="29" y2="171" />
        </g>
        <polygon points="100,8 110,100 100,192 90,100" fill="currentColor" opacity=".55" />
        <polygon points="8,100 100,90 192,100 100,110" fill="currentColor" opacity=".3" />
      </svg>

      <div className="relative mx-auto max-w-cap-container px-cap-gutter">
        <div className="grid items-center gap-[clamp(28px,4vw,56px)] lg:grid-cols-2">
          {/* Promesse */}
          <div className="max-w-[560px]">
            <span className="inline-flex items-center gap-2 rounded-cap-pill bg-[rgba(15,61,102,.07)] px-3.5 py-[7px] text-[13px] font-bold uppercase tracking-[.4px] text-cap-navy">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l2.4 6.9H22l-6 4.4 2.3 7-6.3-4.6L5.7 20l2.3-7-6-4.4h7.6z" />
              </svg>
              Organisme de formation
            </span>
            <h1 className="serif mt-5 text-[clamp(38px,5.4vw,62px)] font-bold leading-[1.04] tracking-[-1px]">
              Trouvez votre cap,
              <br />
              <span className="italic text-cap-navy">on vous y conduit.</span>
            </h1>
            <p className="mt-[22px] max-w-[480px] text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-cap-ink-muted">
              Bilan, parcours, accompagnement&nbsp;: on vous prend par la main, du premier doute jusqu'à la
              compétence acquise. Jamais perdu, toujours orienté.
            </p>
            <div className="mt-[30px] flex flex-wrap gap-[26px]">
              {stats.map((st) => (
                <div key={st.label}>
                  <div className="serif text-[30px] font-bold leading-none text-cap-ink">{st.value}</div>
                  <div className="mt-1 text-[13px] font-medium text-cap-ink-muted">{st.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sélecteur de profil */}
          <div className="rounded-cap-2xl border border-cap-border bg-white p-[clamp(22px,2.4vw,30px)] shadow-cap-card">
            <div className="mb-1 flex items-center gap-2.5">
              <span className="h-[9px] w-[9px] rounded-full bg-cap-accent shadow-[0_0_0_4px_rgba(246,196,69,.25)]" />
              <span className="text-[12.5px] font-bold uppercase tracking-[1.2px] text-cap-muted">
                Entrée guidée
              </span>
            </div>
            <h2 className="serif text-[23px] font-bold leading-[1.2] text-cap-ink">Quel est votre profil&nbsp;?</h2>
            <p className="mt-1 text-[14px] text-cap-muted">Dites-nous qui vous êtes — on aiguille le reste.</p>

            <div className="mt-[18px] grid grid-cols-2 gap-[11px]">
              {profiles.map((p) => {
                const selected = active === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActive(p.id)}
                    aria-pressed={selected}
                    className={`relative rounded-cap-lg border-[1.5px] p-[14px] text-left transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-14px_rgba(15,61,102,.35)] ${
                      selected ? "border-cap-green bg-[rgba(46,158,107,.06)]" : "border-cap-border bg-white"
                    }`}
                  >
                    <CompassNeedle angle={p.angle} size={34} ringOpacity={0.3} />
                    <div className="mt-2 text-[14.5px] font-bold leading-[1.2] text-cap-ink">{p.title}</div>
                    <div className="mt-[3px] text-[12px] leading-[1.35] text-cap-muted">{p.desc}</div>
                    {selected && (
                      <span className="absolute right-[11px] top-[11px] grid h-[21px] w-[21px] place-items-center rounded-full bg-cap-green">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                          <path d="M5 12l4.5 4.5L19 7" />
                        </svg>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Panneau d'aiguillage */}
        {current && (
          <div className="mt-[26px] overflow-hidden rounded-cap-2xl border border-cap-border bg-white shadow-cap-card">
            <div className="grid lg:grid-cols-3">
              <div className="relative bg-cap-soft p-[clamp(22px,2.4vw,30px)]">
                <span className="text-[12px] font-bold uppercase tracking-[1.2px] text-cap-navy">
                  Votre cap · {current.title}
                </span>
                <p className="serif mt-3 text-[21px] font-medium leading-[1.35] text-cap-ink">{current.lead}</p>
                <button
                  onClick={() => openCallback()}
                  className="mt-[22px] inline-flex items-center gap-2.5 rounded-cap-md bg-cap-navy px-[18px] py-2.5 text-[14.5px] font-bold text-white transition hover:brightness-110"
                >
                  Faire le point
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
              <div className="p-[clamp(20px,2.2vw,28px)] lg:col-span-2">
                <div className="mb-3.5 flex items-baseline justify-between">
                  <span className="text-[15px] font-bold text-cap-ink">Formations recommandées pour vous</span>
                  <Link href={ROUTES.catalogue} className="text-[13.5px] font-bold text-cap-navy">
                    Tout voir →
                  </Link>
                </div>
                <div className="grid gap-[11px]">
                  {current.formations.map((fo) => (
                    <Link
                      key={fo.name}
                      href={ROUTES.catalogue}
                      className="flex items-center gap-[15px] rounded-cap-lg border border-cap-border bg-white p-3.5 transition hover:border-cap-green hover:bg-[rgba(46,158,107,.04)]"
                    >
                      <span className="serif grid h-[46px] w-[46px] flex-shrink-0 place-items-center rounded-cap-md bg-cap-soft text-[16px] font-extrabold text-cap-navy">
                        {fo.tag}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[15px] font-bold text-cap-ink">{fo.name}</span>
                        <span className="mt-0.5 block text-[12.5px] text-cap-muted">{fo.meta}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
