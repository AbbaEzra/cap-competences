import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CompassNeedle } from "@/components/brand/CompassNeedle";
import { DevisForm } from "@/components/entreprises/DevisForm";
import {
  entHeroStats,
  entValues,
  entSteps,
  entClients,
  devisPerks,
  entTestimonial,
  type EntIcon,
} from "@/lib/data/entreprises";
import { getPoleNav } from "@/lib/catalogue";
import { ROUTES } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Entreprises — Formez vos équipes",
  description:
    "Formations intra sur-mesure pour vos équipes, logistique gérée de A à Z, demande de devis sous 48h.",
  openGraph: {
    title: "Entreprises — Formez vos équipes — Cap Expertises",
    description: "Formations intra sur-mesure pour vos équipes, logistique gérée de A à Z, demande de devis sous 48h.",
    url: ROUTES.entreprises,
  },
};

function ValueIcon({ icon }: { icon: EntIcon }) {
  const common = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "#0F3D66", strokeWidth: 1.8 };
  if (icon === "star")
    return (
      <svg {...common}>
        <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.3 7.2 16.9l.9-5.4L4.2 7.7l5.4-.8z" />
      </svg>
    );
  if (icon === "graduation")
    return (
      <svg {...common}>
        <path d="M3 7l9-4 9 4-9 4-9-4z" />
        <path d="M21 7v6M7 10v4c0 1.5 2.2 3 5 3s5-1.5 5-3v-4" />
      </svg>
    );
  if (icon === "screen")
    return (
      <svg {...common}>
        <rect x="2" y="4" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 18v3" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export default function EntreprisesPage() {
  const domaines = getPoleNav();
  return (
    <>
      <Header activeHref={ROUTES.entreprises} />

      {/* Fil d'Ariane */}
      <nav aria-label="Fil d'Ariane" className="border-b border-cap-border bg-white">
        <div className="mx-auto flex max-w-cap-container items-center gap-2.5 px-cap-gutter py-3 text-[13px] text-cap-muted">
          <Link href={ROUTES.home} className="font-semibold">
            Accueil
          </Link>
          <span className="opacity-50">/</span>
          <span className="font-semibold text-cap-navy">Entreprises</span>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-cap-hero-navy text-cap-on-navy">
          <svg viewBox="0 0 200 200" aria-hidden="true" className="absolute -right-[40px] -top-[50px] h-[420px] w-[420px] text-white/10">
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="100" cy="100" r="92" />
              <circle cx="100" cy="100" r="62" />
              <line x1="100" y1="8" x2="100" y2="192" />
              <line x1="8" y1="100" x2="192" y2="100" />
              <line x1="35" y1="35" x2="165" y2="165" />
              <line x1="165" y1="35" x2="35" y2="165" />
            </g>
          </svg>
          <div className="relative mx-auto grid max-w-cap-container grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-[clamp(28px,4vw,48px)] px-cap-gutter py-[clamp(40px,5vw,72px)]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-cap-pill bg-[rgba(246,196,69,.16)] px-3.5 py-[7px] text-[13px] font-bold uppercase tracking-[.4px] text-cap-accent">
                Entreprises · Formation intra
              </span>
              <h1 className="serif mt-[18px] text-[clamp(32px,4.4vw,52px)] font-bold leading-[1.05] tracking-[-1px]">
                Formez vos équipes. On s'occupe du reste.
              </h1>
              <p className="mt-[18px] max-w-[520px] text-[clamp(16px,1.6vw,19px)] leading-[1.6] text-[#B7CCE0]">
                Programmes sur-mesure, en intra, calés sur vos métiers. On construit le contenu et on gère
                toute la logistique — vos équipes montent en compétences, sans friction.
              </p>
              <div className="mt-[26px] flex flex-wrap gap-3">
                <a
                  href="#devis"
                  className="rounded-cap-md bg-cap-accent px-6 py-3.5 text-[15.5px] font-bold text-cap-ink shadow-[0_12px_28px_-12px_rgba(246,196,69,.8)] transition hover:-translate-y-px hover:brightness-[1.03]"
                >
                  Demander un devis
                </a>
                <a
                  href="#domaines"
                  className="inline-flex items-center gap-2.5 rounded-cap-md border-[1.5px] border-white/30 px-6 py-3.5 text-[15.5px] font-bold text-white"
                >
                  Voir les domaines ↓
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {entHeroStats.map((hs) => (
                <div key={hs.label} className="rounded-cap-xl border border-white/15 bg-white/[.07] p-5">
                  <div className="serif text-[30px] font-bold leading-none text-white">{hs.value}</div>
                  <div className="mt-1.5 text-[13px] leading-[1.4] text-[#B7CCE0]">{hs.label}</div>
                </div>
              ))}
              <span className="col-span-2 inline-flex items-center gap-1.5 self-start rounded-cap-pill bg-cap-accent px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[.4px] text-cap-ink">
                Chiffres d'exemple · à confirmer
              </span>
            </div>
          </div>
        </section>

        {/* Value props */}
        <section className="mx-auto max-w-cap-container px-cap-gutter py-[clamp(40px,5vw,68px)]">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
            {entValues.map((v) => (
              <div key={v.title} className="rounded-cap-xl border border-cap-border bg-white p-6">
                <span className="grid h-12 w-12 place-items-center rounded-cap-lg bg-cap-soft">
                  <ValueIcon icon={v.icon} />
                </span>
                <h3 className="mt-3.5 text-[17px] font-bold leading-[1.2] text-cap-ink">{v.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.55] text-cap-muted">{v.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Méthode / process */}
        <section className="border-y border-cap-border bg-cap-surface-2">
          <div className="mx-auto max-w-cap-container px-cap-gutter py-[clamp(40px,5vw,68px)]">
            <div className="mx-auto mb-10 max-w-[620px] text-center">
              <span className="text-[13px] font-bold uppercase tracking-[1.4px] text-cap-green">Notre méthode</span>
              <h2 className="serif mt-2 text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.1] tracking-[-.6px]">
                De votre besoin à des équipes formées.
              </h2>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[18px]">
              {entSteps.map((st) => (
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
          </div>
        </section>

        {/* Domaines */}
        <section id="domaines" className="mx-auto max-w-cap-container px-cap-gutter py-[clamp(40px,5vw,68px)]">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="text-[13px] font-bold uppercase tracking-[1.4px] text-cap-green">Nos domaines</span>
              <h2 className="serif mt-2 text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.1] tracking-[-.6px]">
                Huit domaines, adaptables à vos métiers.
              </h2>
            </div>
            <Link href={ROUTES.catalogue} className="text-[14.5px] font-bold text-cap-navy">
              Voir le catalogue complet →
            </Link>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(255px,1fr))] gap-3.5">
            {domaines.map((d) => (
              <Link
                key={d.name}
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
        </section>

        {/* Accompagnement + témoignage */}
        <section className="mx-auto max-w-cap-container px-cap-gutter pb-[clamp(40px,5vw,60px)]">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-center gap-[clamp(24px,3vw,44px)] rounded-cap-2xl bg-cap-navy p-[clamp(28px,3.4vw,48px)] text-white">
            <div>
              <span className="text-[12.5px] font-bold uppercase tracking-[1px] text-cap-accent">
                Accompagnement de A à Z
              </span>
              <h2 className="serif mt-3 text-[clamp(24px,2.8vw,34px)] font-bold leading-[1.15]">
                On gère toute l'organisation à votre place.
              </h2>
              <p className="mt-3.5 text-[15.5px] leading-[1.6] text-cap-on-navy-muted">
                Planning, convocations, salle ou visio, supports et suivi : on cale chaque détail avec vous,
                puis on s'occupe de tout. Vous gardez la visibilité, sans la paperasse.
              </p>
              <a
                href="#devis"
                className="mt-5 inline-flex items-center gap-2.5 rounded-cap-md bg-cap-accent px-5 py-3.5 text-[15px] font-bold text-cap-ink transition hover:-translate-y-px hover:brightness-[1.03]"
              >
                Demander un devis
              </a>
            </div>
            <div className="rounded-cap-xl border border-white/15 bg-white/[.06] p-[26px]">
              <div className="flex items-center justify-between gap-2.5">
                <span className="text-[18px] text-cap-accent">★★★★★</span>
                <span className="rounded-cap-pill bg-cap-accent px-2.5 py-[3px] text-[10px] font-extrabold uppercase tracking-[.4px] text-cap-ink">
                  Témoignage d'exemple
                </span>
              </div>
              <p className="serif mt-3 text-[18px] font-medium leading-[1.5]">{entTestimonial.quote}</p>
              <div className="mt-[18px] flex items-center gap-3 border-t border-white/15 pt-4">
                <span className="grid h-[42px] w-[42px] place-items-center rounded-full bg-white/15 text-[14px] font-bold">
                  {entTestimonial.initials}
                </span>
                <div>
                  <div className="text-[14.5px] font-bold">{entTestimonial.name}</div>
                  <div className="text-[12.5px] text-[#B7CCE0]">{entTestimonial.role}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-[clamp(20px,4vw,46px)] gap-y-3">
            <span className="text-[12.5px] font-bold uppercase tracking-[1px] text-cap-muted">
              Ils forment leurs équipes avec nous
            </span>
            <span className="rounded-cap-pill border border-[rgba(246,196,69,.5)] bg-[rgba(246,196,69,.2)] px-2.5 py-[3px] text-[10px] font-extrabold uppercase tracking-[.4px] text-cap-accent-ink">
              Logos d'exemple · à confirmer
            </span>
            {entClients.map((c) => (
              <span key={c} className="serif text-[19px] font-bold text-cap-muted opacity-60">
                {c}
              </span>
            ))}
          </div>
        </section>

        {/* Devis */}
        <section id="devis" className="border-t border-cap-border bg-cap-surface-2">
          <div className="mx-auto grid max-w-cap-container grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-[clamp(28px,4vw,48px)] px-cap-gutter py-[clamp(40px,5vw,72px)]">
            <div className="lg:sticky lg:top-[90px]">
              <span className="text-[13px] font-bold uppercase tracking-[1.4px] text-cap-green">
                Demande de devis
              </span>
              <h2 className="serif mt-2 text-[clamp(28px,3.4vw,42px)] font-bold leading-[1.08] tracking-[-.6px]">
                Recevez une proposition sur-mesure.
              </h2>
              <p className="mt-3.5 text-cap-md leading-[1.6] text-cap-muted">
                Décrivez votre besoin en deux minutes. Un conseiller revient vers vous sous 24 à 48h avec un
                programme sur-mesure et un devis détaillé.
              </p>
              <div className="mt-6 flex flex-col gap-3.5">
                {devisPerks.map((p) => (
                  <div key={p} className="flex items-center gap-3">
                    <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-cap-md bg-[rgba(46,158,107,.12)]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E9E6B" strokeWidth="2.4">
                        <path d="M5 12l4.5 4.5L19 7" />
                      </svg>
                    </span>
                    <span className="text-[14.5px] font-medium text-cap-ink">{p}</span>
                  </div>
                ))}
              </div>
            </div>
            <DevisForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
