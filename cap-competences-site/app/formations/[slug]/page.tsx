import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CompassNeedle } from "@/components/brand/CompassNeedle";
import { Reveal } from "@/components/ui/Reveal";
import { CallbackButton } from "@/components/callback/CallbackButton";
import { FicheSidebar } from "@/components/fiche/FicheSidebar";
import {
  getFormation,
  getAllFormationIds,
  allFormations,
  cadreMethodologique,
  catalogueMeta,
  poleAngle,
} from "@/lib/catalogue";
import { ROUTES } from "@/lib/data/site";

// Export statique : un fichier HTML par slug (29), généré depuis le JSON catalogue.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllFormationIds().map((slug) => ({ slug }));
}

// SEO par fiche : og:title / og:description / og:url dérivés des données (titre, objectif, slug).
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const f = getFormation(params.slug);
  if (!f) return { title: "Formation introuvable" };
  return {
    title: f.titre,
    description: f.objectif,
    openGraph: {
      type: "website",
      title: `${f.titre} — Cap Expertises`,
      description: f.objectif,
      url: ROUTES.formation(f.id),
    },
  };
}

export default function FichePage({ params }: { params: { slug: string } }) {
  const f = getFormation(params.slug);
  if (!f) notFound();

  const pole = f.pole;
  const related = allFormations.filter((x) => x.pole.id === pole.id && x.id !== f.id);

  const meta: { label: string; value: string }[] = [];
  if (f.dureeResolved) meta.push({ label: "Durée", value: f.dureeResolved });
  meta.push({ label: "Modalités", value: catalogueMeta.modalites_globales });
  meta.push({ label: "Pôle", value: pole.titre });

  const titleBar = (label: string) => (
    <h2 className="serif flex items-center gap-3 text-[24px] font-bold tracking-[-.4px]">
      <span className="h-6 w-[5px] rounded-[3px] bg-cap-accent" />
      {label}
    </h2>
  );

  return (
    <>
      <Header activeHref={ROUTES.catalogue} />

      {/* Fil d'Ariane */}
      <nav aria-label="Fil d'Ariane" className="border-b border-cap-border bg-white">
        <div className="mx-auto flex max-w-cap-container flex-wrap items-center gap-2.5 px-cap-gutter py-3.5 text-[13px] text-cap-muted">
          <Link href={ROUTES.home} className="font-semibold">
            Accueil
          </Link>
          <span className="opacity-50">/</span>
          <Link href={ROUTES.catalogue} className="font-semibold">
            Formations
          </Link>
          <span className="opacity-50">/</span>
          <span className="font-semibold text-cap-navy">{pole.titre}</span>
          <span className="opacity-50">/</span>
          <span className="text-cap-ink">{f.titre}</span>
        </div>
      </nav>

      <main>
        {/* En-tête de fiche */}
        <section className="relative overflow-hidden border-b border-cap-border bg-cap-hero-light">
          <svg viewBox="0 0 200 200" aria-hidden="true" className="absolute -right-[60px] -top-[50px] h-[380px] w-[380px] text-[rgba(15,61,102,.06)]">
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="100" cy="100" r="92" />
              <circle cx="100" cy="100" r="64" />
              <line x1="100" y1="8" x2="100" y2="192" />
              <line x1="8" y1="100" x2="192" y2="100" />
              <line x1="35" y1="35" x2="165" y2="165" />
              <line x1="165" y1="35" x2="35" y2="165" />
            </g>
          </svg>
          <div className="relative mx-auto max-w-cap-container px-cap-gutter py-[clamp(28px,3.6vw,48px)]">
            <Link
              href={ROUTES.catalogue}
              className="mb-4 inline-flex items-center gap-2 rounded-cap-pill border border-cap-border bg-white px-3.5 py-[7px] text-[13px] font-bold text-cap-navy"
            >
              <CompassNeedle angle={poleAngle(pole.numero)} size={18} ring={false} />
              {pole.titre}
            </Link>
            <h1 className="serif max-w-[820px] text-[clamp(28px,3.8vw,46px)] font-bold leading-[1.08] tracking-[-.8px]">
              {f.titre}
            </h1>
            <p className="mt-4 max-w-[720px] text-[clamp(16px,1.6vw,19px)] leading-[1.55] text-cap-ink-muted">
              {f.objectif}
            </p>

            <div className="mt-7 grid max-w-[820px] grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-3">
              {meta.map((m) => (
                <div key={m.label} className="rounded-cap-lg border border-cap-border bg-white px-4 py-3.5">
                  <span className="block text-[11.5px] font-bold uppercase tracking-[.5px] text-cap-muted">
                    {m.label}
                  </span>
                  <span className="mt-1 block text-[14px] font-bold leading-[1.25] text-cap-ink">{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Corps */}
        <div className="mx-auto flex max-w-cap-container flex-col items-start gap-[clamp(24px,3vw,40px)] px-cap-gutter py-[clamp(32px,4vw,56px)] lg:flex-row">
          <div className="flex w-full min-w-0 flex-col gap-[clamp(28px,3vw,42px)] lg:flex-1">
            {/* Programme & contenu (prose, fidèle) */}
            <Reveal as="section">
              {titleBar("Programme & contenu")}
              <div className="mt-4 rounded-cap-xl border border-cap-border bg-white p-[clamp(20px,2.4vw,28px)]">
                <p className="whitespace-pre-line text-[15.5px] leading-[1.7] text-cap-ink-muted">{f.contenu}</p>
              </div>
            </Reveal>

            {/* Prérequis */}
            {f.prerequisResolved && (
              <Reveal as="section" className="rounded-cap-xl border border-cap-border bg-cap-surface-2 p-[22px]">
                <h3 className="mb-2 text-[17px] font-bold text-cap-ink">Prérequis</h3>
                <p className="text-[14.5px] leading-[1.6] text-cap-ink-muted">{f.prerequisResolved}</p>
              </Reveal>
            )}

            {/* Objectifs du pôle (optionnel) */}
            {pole.objectifs && pole.objectifs.length > 0 && (
              <Reveal as="section">
                {titleBar("Objectifs pédagogiques")}
                <div className="mt-4 grid gap-2.5">
                  {pole.objectifs.map((ob) => (
                    <div key={ob} className="flex items-start gap-3 rounded-cap-lg border border-cap-border bg-white px-4 py-3.5">
                      <span className="mt-px grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-[rgba(46,158,107,.12)]">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2E9E6B" strokeWidth="3">
                          <path d="M5 12l4.5 4.5L19 7" />
                        </svg>
                      </span>
                      <span className="text-[15.5px] leading-[1.5] text-cap-ink">{ob}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {/* Programme type du pôle (optionnel) */}
            {pole.programme_type && pole.programme_type.length > 0 && (
              <Reveal as="section">
                {titleBar("Programme type")}
                <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3.5">
                  {pole.programme_type.map((p) => (
                    <div key={p.label} className="rounded-cap-xl border border-cap-border bg-white p-5">
                      <h3 className="text-[15.5px] font-bold text-cap-ink">{p.label}</h3>
                      <p className="mt-1.5 text-[14px] leading-[1.55] text-cap-muted">{p.detail}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {/* Langues & public (pôle Langues) */}
            {pole.modalites_public && (pole.modalites_public.langues || pole.modalites_public.profils) && (
              <Reveal as="section" className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
                {pole.modalites_public.langues && (
                  <div className="rounded-cap-xl border border-cap-border bg-cap-surface-2 p-[22px]">
                    <h3 className="mb-3 text-[16px] font-bold text-cap-ink">Langues disponibles</h3>
                    <div className="flex flex-wrap gap-2">
                      {pole.modalites_public.langues.map((l) => (
                        <span key={l} className="rounded-cap-pill border border-cap-border bg-white px-3 py-1.5 text-[13px] font-semibold text-cap-ink">
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {pole.modalites_public.profils && (
                  <div className="rounded-cap-xl border border-cap-border bg-cap-surface-2 p-[22px]">
                    <h3 className="mb-3 text-[16px] font-bold text-cap-ink">Public</h3>
                    <div className="flex flex-wrap gap-2">
                      {pole.modalites_public.profils.map((pr) => (
                        <span key={pr} className="rounded-cap-pill border border-cap-border bg-white px-3 py-1.5 text-[13px] font-semibold text-cap-ink">
                          {pr}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </Reveal>
            )}

            {/* Public concerné / Moyens (optionnels) */}
            {(pole.profil_beneficiaires || pole.moyens_formats) && (
              <Reveal as="section" className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
                {pole.profil_beneficiaires && (
                  <div className="rounded-cap-xl border border-cap-border bg-cap-surface-2 p-[22px]">
                    <h3 className="mb-2 text-[16px] font-bold text-cap-ink">Public concerné</h3>
                    <p className="text-[14.5px] leading-[1.6] text-cap-ink-muted">{pole.profil_beneficiaires}</p>
                  </div>
                )}
                {pole.moyens_formats && (
                  <div className="rounded-cap-xl border border-cap-border bg-cap-surface-2 p-[22px]">
                    <h3 className="mb-2 text-[16px] font-bold text-cap-ink">Modalités & moyens</h3>
                    <p className="text-[14.5px] leading-[1.6] text-cap-ink-muted">{pole.moyens_formats}</p>
                  </div>
                )}
              </Reveal>
            )}

            {/* Cadre méthodologique commun (sur chaque fiche) */}
            <Reveal as="section">
              {titleBar("Cadre méthodologique")}
              <p className="ml-4 mb-4 mt-2 max-w-[640px] text-[14.5px] leading-[1.55] text-cap-muted">
                {cadreMethodologique.intro}
              </p>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
                <MethodCard title="Suivi & évaluation" items={cadreMethodologique.suivi_execution_evaluation} tone="navy" />
                <MethodCard title="Ressources & moyens" items={cadreMethodologique.ressources_moyens_pedagogiques} tone="green" />
              </div>
            </Reveal>
          </div>

          <FicheSidebar title={f.titre} meta={meta} />
        </div>

        {/* Autres formations du pôle */}
        {related.length > 0 && (
          <section className="border-t border-cap-border bg-cap-surface-2">
            <div className="mx-auto max-w-cap-container px-cap-gutter py-[clamp(40px,5vw,64px)]">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-5">
                <h2 className="serif text-[clamp(24px,2.8vw,32px)] font-bold tracking-[-.5px]">
                  Dans la même direction
                </h2>
                <Link href={ROUTES.catalogue} className="text-[14.5px] font-bold text-cap-navy">
                  Tout le catalogue →
                </Link>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-3.5">
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    href={ROUTES.formation(rel.id)}
                    className="flex items-center gap-3.5 rounded-cap-xl border border-cap-border bg-white p-[18px] transition hover:-translate-y-0.5 hover:border-cap-navy hover:shadow-[0_14px_30px_-18px_rgba(15,61,102,.4)]"
                  >
                    <span className="grid h-[46px] w-[46px] flex-shrink-0 place-items-center rounded-cap-md bg-cap-soft">
                      <CompassNeedle angle={poleAngle(pole.numero)} size={26} ring={false} />
                    </span>
                    <span className="flex-1">
                      <span className="block text-[15px] font-bold leading-[1.25] text-cap-ink">{rel.titre}</span>
                      <span className="mt-[3px] block text-[12.5px] text-cap-muted">{pole.titre}</span>
                    </span>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0F3D66" strokeWidth="2.2" className="opacity-50">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA final */}
        <section className="mx-auto max-w-cap-container px-cap-gutter py-[clamp(44px,5.5vw,76px)]">
          <div className="rounded-cap-2xl border border-cap-border bg-cap-soft p-[clamp(32px,4.5vw,56px)] text-center">
            <h2 className="serif mx-auto max-w-[560px] text-[clamp(26px,3.4vw,40px)] font-bold leading-[1.1] tracking-[-.6px]">
              Cette formation vous intéresse&nbsp;?
            </h2>
            <p className="mx-auto mt-3.5 max-w-[480px] text-cap-md text-cap-muted">
              On fait le point sur votre projet, on construit le programme adapté et on vous accompagne.
            </p>
            <div className="mt-[26px] flex flex-wrap justify-center gap-3">
              <CallbackButton
                options={{ contextLabel: f.titre }}
                className="rounded-cap-lg bg-cap-accent px-[26px] py-[15px] text-[16px] font-bold text-cap-ink shadow-cap-cta transition hover:-translate-y-px hover:brightness-[1.03]"
              >
                Être rappelé
              </CallbackButton>
              <CallbackButton
                options={{ title: "Lancez votre dossier", field: "situation", contextLabel: f.titre }}
                className="rounded-cap-lg bg-cap-navy px-[26px] py-[15px] text-[16px] font-bold text-white transition hover:brightness-110"
              >
                Demander un programme
              </CallbackButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function MethodCard({
  title,
  items,
  tone,
}: {
  title: string;
  items: { label: string; detail: string }[];
  tone: "navy" | "green";
}) {
  const stroke = tone === "green" ? "#2E9E6B" : "#0F3D66";
  return (
    <div className="rounded-cap-xl border border-cap-border bg-white p-6">
      <h3 className="mb-3.5 text-[18px] font-bold text-cap-ink">{title}</h3>
      <div className="flex flex-col gap-3">
        {items.map((it) => (
          <div key={it.label} className="flex items-start gap-2.5">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" className="mt-0.5 flex-shrink-0">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            <span className="text-[14.5px] leading-[1.5] text-cap-ink-muted">
              <strong className="font-bold text-cap-ink">{it.label} :</strong> {it.detail}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
