import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CompassNeedle } from "@/components/brand/CompassNeedle";
import { CallbackButton } from "@/components/callback/CallbackButton";
import { FormateurForm } from "@/components/rejoindre/FormateurForm";
import { formateurBenefits, formateurSteps, formateurCriteres, type FormateurIcon } from "@/lib/data/rejoindre";
import { getPoleNav } from "@/lib/catalogue";
import { ROUTES } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Rejoindre le réseau — Devenez formateur",
  description:
    "Vous êtes expert dans votre domaine et aimez transmettre ? Rejoignez notre réseau de formatrices et formateurs indépendants : missions adaptées, logistique gérée, accompagnement humain.",
  openGraph: {
    title: "Rejoindre le réseau — Devenez formateur — Cap Expertises",
    description:
      "Rejoignez notre réseau de formatrices et formateurs indépendants : missions adaptées, logistique gérée, accompagnement humain.",
    url: ROUTES.rejoindre,
  },
};

function BenefitIcon({ icon }: { icon: FormateurIcon }) {
  const common = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "#0F3D66", strokeWidth: 1.8 };
  if (icon === "target")
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.4" fill="#0F3D66" stroke="none" />
      </svg>
    );
  if (icon === "gear")
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="3.2" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
      </svg>
    );
  if (icon === "clock")
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    );
  return (
    <svg {...common}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.5 20c0-3.3 2.9-5.5 6.5-5.5s6.5 2.2 6.5 5.5" />
      <path d="M16 5.2a3.2 3.2 0 0 1 0 5.6M17.5 14.6c2.4.6 4 2.4 4 5.4" />
    </svg>
  );
}

export default function RejoindrePage() {
  const domaines = getPoleNav();
  return (
    <>
      <Header activeHref={ROUTES.rejoindre} />

      {/* Fil d'Ariane */}
      <nav aria-label="Fil d'Ariane" className="border-b border-cap-border bg-white">
        <div className="mx-auto flex max-w-cap-container items-center gap-2.5 px-cap-gutter py-3 text-[13px] text-cap-muted">
          <Link href={ROUTES.home} className="font-semibold">
            Accueil
          </Link>
          <span className="opacity-50">/</span>
          <span className="font-semibold text-cap-navy">Rejoindre le réseau</span>
        </div>
      </nav>

      <main>
        {/* Hero formateur */}
        <section className="relative overflow-hidden bg-cap-hero-light text-cap-ink">
          <svg
            viewBox="0 0 200 200"
            aria-hidden="true"
            className="pointer-events-none absolute -right-[90px] -top-[70px] h-[clamp(320px,38vw,540px)] w-[clamp(320px,38vw,540px)] text-[rgba(15,61,102,.07)]"
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
          </svg>
          <div className="relative mx-auto max-w-cap-container px-cap-gutter py-[clamp(40px,5.5vw,76px)]">
            <div className="max-w-[640px]">
              <span className="inline-flex items-center gap-2 rounded-cap-pill bg-[rgba(15,61,102,.07)] px-3.5 py-[7px] text-[13px] font-bold uppercase tracking-[.4px] text-cap-navy">
                Rejoindre le réseau · Formateurs
              </span>
              <h1 className="serif mt-5 text-[clamp(34px,5vw,58px)] font-bold leading-[1.05] tracking-[-1px]">
                Transmettez votre métier.
                <br />
                <span className="italic text-cap-navy">On s'occupe du reste.</span>
              </h1>
              <p className="mt-[22px] max-w-[540px] text-[clamp(16px,1.5vw,19px)] leading-[1.6] text-cap-ink-muted">
                Vous êtes expert(e) dans votre domaine et aimez transmettre&nbsp;? Rejoignez notre réseau de
                formatrices et formateurs indépendants et intervenez sur des missions qui vous correspondent —
                en présentiel comme à distance.
              </p>
              <div className="mt-[30px] flex flex-wrap gap-3">
                <a
                  href="#candidature"
                  className="rounded-cap-md bg-cap-accent px-6 py-3.5 text-[15.5px] font-bold text-cap-ink shadow-cap-cta transition hover:-translate-y-px hover:brightness-[1.03]"
                >
                  Déposer ma candidature
                </a>
                <a
                  href="#domaines"
                  className="inline-flex items-center gap-2.5 rounded-cap-md border-[1.5px] border-cap-navy bg-transparent px-6 py-3.5 text-[15.5px] font-bold text-cap-navy transition hover:bg-cap-soft"
                >
                  Voir les domaines ↓
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Proposition de valeur formateur */}
        <section className="mx-auto max-w-cap-container px-cap-gutter py-[clamp(40px,5vw,68px)]">
          <div className="mb-9 max-w-[620px]">
            <span className="text-[13px] font-bold uppercase tracking-[1.4px] text-cap-green">
              Pourquoi nous rejoindre
            </span>
            <h2 className="serif mt-2 text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.1] tracking-[-.6px]">
              Vous formez. On gère tout le reste.
            </h2>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
            {formateurBenefits.map((b) => (
              <div key={b.title} className="rounded-cap-xl border border-cap-border bg-white p-6">
                <span className="grid h-12 w-12 place-items-center rounded-cap-lg bg-cap-soft">
                  <BenefitIcon icon={b.icon} />
                </span>
                <h3 className="mt-3.5 text-[17px] font-bold leading-[1.2] text-cap-ink">{b.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.55] text-cap-muted">{b.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Domaines recherchés (7 pôles du catalogue) */}
        <section
          id="domaines"
          className="scroll-anchor-header border-y border-cap-border bg-cap-surface-2"
        >
          <div className="mx-auto max-w-cap-container px-cap-gutter py-[clamp(40px,5vw,68px)]">
            <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
              <div>
                <span className="text-[13px] font-bold uppercase tracking-[1.4px] text-cap-green">
                  Domaines recherchés
                </span>
                <h2 className="serif mt-2 text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.1] tracking-[-.6px]">
                  Nos pôles, vos terrains d'expertise.
                </h2>
                <p className="mt-2.5 max-w-[560px] text-cap-md leading-[1.6] text-cap-muted">
                  Nous recherchons des formatrices et formateurs sur l'ensemble de nos pôles de compétences.
                </p>
              </div>
              <Link href={ROUTES.catalogue} className="text-[14.5px] font-bold text-cap-navy">
                Voir le catalogue complet →
              </Link>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(255px,1fr))] gap-3.5">
              {domaines.map((d) => (
                <Link
                  key={d.id}
                  href={d.href}
                  className="flex items-center gap-3.5 rounded-cap-xl border border-cap-border bg-white p-[17px] transition hover:-translate-y-0.5 hover:border-[#CBD9E6] hover:shadow-[0_16px_34px_-20px_rgba(15,61,102,.4)]"
                >
                  <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-cap-md bg-cap-soft">
                    <CompassNeedle angle={d.angle} size={30} ringOpacity={0.3} />
                  </span>
                  <span className="flex-1 text-[15.5px] font-bold text-cap-ink">{d.name}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F3D66" strokeWidth="2.2" className="opacity-50">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Comment ça marche */}
        <section className="mx-auto max-w-cap-container px-cap-gutter py-[clamp(40px,5vw,68px)]">
          <div className="mx-auto mb-10 max-w-[620px] text-center">
            <span className="text-[13px] font-bold uppercase tracking-[1.4px] text-cap-green">
              Comment ça marche
            </span>
            <h2 className="serif mt-2 text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.1] tracking-[-.6px]">
              De la candidature à vos premières missions.
            </h2>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[18px]">
            {formateurSteps.map((st) => (
              <div key={st.n} className="rounded-cap-xl border border-cap-border bg-white p-[22px]">
                <div className="mb-3.5 flex items-center gap-2.5">
                  <span className="serif grid h-10 w-10 place-items-center rounded-full bg-cap-navy text-[17px] font-bold text-white">
                    {st.n}
                  </span>
                  <span className="h-0.5 flex-1 bg-[repeating-linear-gradient(90deg,#F6C445_0_7px,transparent_7px_13px)]" />
                </div>
                <h3 className="text-[16px] font-bold leading-[1.2] text-cap-ink">{st.title}</h3>
                <p className="mt-[7px] text-[13.5px] leading-[1.5] text-cap-muted">{st.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Formulaire de candidature */}
        <section id="candidature" className="scroll-anchor-header border-t border-cap-border bg-cap-surface-2">
          <div className="mx-auto grid max-w-cap-container grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-[clamp(28px,4vw,48px)] px-cap-gutter py-[clamp(40px,5vw,72px)]">
            <div className="lg:sticky lg:top-[120px]">
              <span className="text-[13px] font-bold uppercase tracking-[1.4px] text-cap-green">
                Candidature
              </span>
              <h2 className="serif mt-2 text-[clamp(28px,3.4vw,42px)] font-bold leading-[1.08] tracking-[-.6px]">
                Présentez-vous en deux minutes.
              </h2>
              <p className="mt-3.5 text-cap-md leading-[1.6] text-cap-muted">
                Dites-nous qui vous êtes et sur quels sujets vous intervenez. On revient vers vous pour un
                premier échange, sans engagement.
              </p>
              <div className="mt-6 flex flex-col gap-3.5">
                {formateurCriteres.map((c) => (
                  <div key={c} className="flex items-center gap-3">
                    <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-cap-md bg-[rgba(46,158,107,.12)]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E9E6B" strokeWidth="2.4">
                        <path d="M5 12l4.5 4.5L19 7" />
                      </svg>
                    </span>
                    <span className="text-[14.5px] font-medium text-cap-ink">{c}</span>
                  </div>
                ))}
              </div>
            </div>
            <FormateurForm domaines={domaines.map((d) => ({ id: d.id, name: d.name }))} />
          </div>
        </section>

        {/* CTA final */}
        <section className="mx-auto max-w-cap-container px-cap-gutter py-[clamp(40px,5vw,64px)]">
          <div className="relative overflow-hidden rounded-cap-2xl border border-cap-border bg-cap-soft p-[clamp(32px,4.5vw,56px)] text-center">
            <h2 className="serif text-[clamp(24px,3vw,34px)] font-bold leading-[1.12] text-cap-ink">
              Une question avant de postuler&nbsp;?
            </h2>
            <p className="mx-auto mt-3 max-w-[520px] text-cap-md leading-[1.6] text-cap-muted">
              Échangez avec l'équipe : on vous explique le fonctionnement du réseau et les missions du moment.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <CallbackButton
                options={{ contextLabel: "Candidature formateur" }}
                className="inline-flex items-center gap-2.5 rounded-cap-lg bg-cap-accent px-[26px] py-[15px] text-[16px] font-bold text-cap-ink shadow-cap-cta transition hover:-translate-y-px hover:brightness-[1.03]"
              >
                Être rappelé(e)
              </CallbackButton>
              <a
                href="#candidature"
                className="inline-flex items-center gap-2.5 rounded-cap-lg border-[1.5px] border-cap-navy px-[26px] py-[15px] text-[16px] font-bold text-cap-navy transition hover:bg-white"
              >
                Déposer ma candidature
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
