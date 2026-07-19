import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HomeHero } from "@/components/home/HomeHero";
import { CompassNeedle } from "@/components/brand/CompassNeedle";
import { Reveal } from "@/components/ui/Reveal";
import { CallbackButton } from "@/components/callback/CallbackButton";
import { steps, reviews, heroApprenantsStat } from "@/lib/data/home";
import { getPoleNav, allFormations, poles } from "@/lib/catalogue";
import { ROUTES } from "@/lib/data/site";

const sectionHead = "max-w-cap-container mx-auto px-cap-gutter";

function ExampleBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-cap-pill border border-[rgba(246,196,69,.5)] bg-[rgba(246,196,69,.2)] px-2.5 py-[3px] text-[10px] font-extrabold uppercase tracking-[.4px] text-cap-accent-ink">
      {children}
    </span>
  );
}

export default function HomePage() {
  const poleNav = getPoleNav();
  // Stats dérivées dynamiquement du catalogue (pas de chiffre en dur).
  const heroStats = [
    heroApprenantsStat,
    { value: String(allFormations.length), label: "formations au catalogue" },
    { value: String(poles.length), label: poles.length > 1 ? "pôles de compétences" : "pôle de compétences" },
  ];
  return (
    <>
      <Header activeHref={ROUTES.catalogue} />
      <main>
        <HomeHero stats={heroStats} />

        {/* Catégories */}
        <section className={`${sectionHead} py-[clamp(48px,6vw,84px)]`}>
          <Reveal className="mb-9 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="text-[13px] font-bold uppercase tracking-[1.4px] text-cap-green">Le catalogue</span>
              <h2 className="serif mt-2 text-[clamp(30px,3.6vw,42px)] font-bold leading-[1.1] tracking-[-.6px]">
                Sept directions,
                <br />
                un seul cap&nbsp;: le vôtre.
              </h2>
            </div>
            <p className="max-w-[340px] text-cap-md text-cap-muted">
              Chaque domaine est une aiguille de la boussole. Choisissez la vôtre — on vous montre le chemin,
              étape par étape.
            </p>
          </Reveal>
          <Reveal className="grid grid-cols-[repeat(auto-fill,minmax(255px,1fr))] gap-3.5">
            {poleNav.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="flex items-center gap-4 rounded-cap-xl border border-cap-border bg-white p-5 transition duration-200 hover:-translate-y-[3px] hover:border-transparent hover:shadow-[0_18px_36px_-20px_rgba(15,61,102,.4)]"
              >
                <span className="grid h-[54px] w-[54px] flex-shrink-0 place-items-center rounded-cap-lg bg-cap-soft">
                  <CompassNeedle angle={cat.angle} size={34} ringOpacity={0.35} />
                </span>
                <span className="flex-1">
                  <span className="block text-cap-md font-bold leading-[1.2] text-cap-ink">{cat.name}</span>
                  <span className="mt-[3px] block text-[13px] text-cap-muted">{cat.count} formations</span>
                </span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F3D66" strokeWidth="2.2" className="opacity-50">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </Link>
            ))}
          </Reveal>
        </section>

        {/* Trajectoire */}
        <section className="border-y border-cap-border bg-cap-surface-2">
          <div className={`${sectionHead} py-[clamp(48px,6vw,80px)]`}>
            <Reveal className="mx-auto mb-[46px] max-w-[620px] text-center">
              <span className="text-[13px] font-bold uppercase tracking-[1.4px] text-cap-green">La trajectoire</span>
              <h2 className="serif mt-2 text-[clamp(30px,3.6vw,42px)] font-bold leading-[1.1] tracking-[-.6px]">
                Quatre étapes, et c'est tracé.
              </h2>
              <p className="mt-3.5 text-cap-md text-cap-muted">
                On ne vous laisse jamais deviner la suite. Voici le chemin, du premier appel à la compétence
                validée.
              </p>
            </Reveal>
            <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
              {steps.map((step) => (
                <div key={step.n} className="rounded-cap-xl border border-cap-border bg-white p-6">
                  <div className="mb-3.5 flex items-center gap-3">
                    <span className="serif grid h-[42px] w-[42px] place-items-center rounded-full bg-cap-navy text-[18px] font-bold text-white">
                      {step.n}
                    </span>
                    <span className="h-0.5 flex-1 bg-[repeating-linear-gradient(90deg,#F6C445_0_8px,transparent_8px_14px)]" />
                  </div>
                  <h3 className="text-[17px] font-bold text-cap-ink">{step.title}</h3>
                  <p className="mt-[7px] text-[14px] leading-[1.5] text-cap-muted">{step.text}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* Preuves / témoignages */}
        <section className={`${sectionHead} py-[clamp(48px,6vw,84px)]`}>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-stretch gap-5">
            {reviews.map((rv) => (
              <Reveal key={rv.name} className="flex flex-col rounded-cap-2xl border border-cap-border bg-white p-[clamp(24px,2.6vw,32px)]">
                <div className="mb-3.5 flex items-center justify-between gap-1">
                  <span className="text-[18px] text-cap-accent">★★★★★</span>
                  <ExampleBadge>Témoignage d'exemple</ExampleBadge>
                </div>
                <p className="serif flex-1 text-[19px] font-medium leading-[1.5] text-cap-ink">“{rv.quote}”</p>
                <div className="mt-5 flex items-center gap-3 border-t border-cap-border pt-[18px]">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-cap-soft text-[15px] font-bold text-cap-navy">
                    {rv.initials}
                  </span>
                  <div>
                    <div className="text-[14.5px] font-bold text-cap-ink">{rv.name}</div>
                    <div className="text-[12.5px] text-cap-muted">{rv.role}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Formateur / recrutement */}
        <section className={`${sectionHead} px-cap-gutter py-[clamp(20px,3vw,40px)] pb-[clamp(8px,2vw,16px)]`}>
          <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] overflow-hidden rounded-cap-2xl border border-cap-border bg-white shadow-cap-card">
            <div className="flex flex-col justify-center p-[clamp(28px,3.4vw,48px)]">
              <span className="inline-flex items-center gap-2 self-start rounded-cap-pill bg-[rgba(46,158,107,.1)] px-3.5 py-[7px] text-[12.5px] font-bold uppercase tracking-[.6px] text-cap-green">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 7l9-4 9 4-9 4-9-4z" />
                  <path d="M21 7v6M7 10v4c0 1.5 2.2 3 5 3s5-1.5 5-3v-4" />
                </svg>
                Rejoindre le réseau
              </span>
              <h2 className="serif mt-4 text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.1] tracking-[-.6px]">
                Vous êtes formateur&nbsp;?
              </h2>
              <p className="mt-3.5 max-w-[460px] text-cap-md leading-[1.6] text-cap-muted">
                Partagez votre expertise, animez des sessions près de chez vous ou à distance, et accompagnez
                des apprenants jusqu'à leur cap. Vous transmettez&nbsp;: on gère l'administratif et le sourcing.
              </p>
              <div className="mt-5 flex flex-wrap gap-[9px]">
                {["Cadre structuré", "Présentiel ou visio", "Accompagnement admin"].map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-[7px] rounded-cap-pill border border-cap-border bg-cap-surface-2 px-3.5 py-2 text-[13.5px] font-semibold text-cap-ink"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-cap-green" />
                    {chip}
                  </span>
                ))}
              </div>
              <div className="mt-[26px] flex flex-wrap items-center gap-3.5">
                <a
                  href="#"
                  className="inline-flex items-center gap-2.5 rounded-cap-md bg-cap-navy px-6 py-3.5 text-[15.5px] font-bold text-white transition hover:brightness-110"
                >
                  Devenir formateur
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href="#" className="text-[14.5px] font-bold text-cap-navy">
                  Voir les domaines recherchés →
                </a>
              </div>
            </div>
            <div className="relative grid min-h-[280px] place-items-center border-l border-cap-border bg-[repeating-linear-gradient(135deg,#EaF0F6_0_14px,#F2F6FA_14px_28px)]">
              <svg viewBox="0 0 200 200" aria-hidden="true" className="absolute inset-0 h-full w-full text-[rgba(15,61,102,.07)]">
                <g fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="100" cy="100" r="70" />
                  <circle cx="100" cy="100" r="44" />
                  <line x1="100" y1="20" x2="100" y2="180" />
                  <line x1="20" y1="100" x2="180" y2="100" />
                </g>
              </svg>
              <span className="relative rounded-[8px] border border-dashed border-[#C9D6E2] bg-white/70 px-3 py-2 font-mono text-[12px] tracking-[.5px] text-cap-muted">
                [ portrait formateur ]
              </span>
            </div>
          </Reveal>
        </section>

        {/* CTA final */}
        <section className={`${sectionHead} py-[clamp(52px,6.5vw,90px)]`}>
          <Reveal className="relative overflow-hidden rounded-cap-2xl border border-cap-border bg-cap-soft p-[clamp(36px,5vw,64px)] text-center">
            <svg
              width="56"
              height="56"
              viewBox="0 0 40 40"
              aria-hidden="true"
              className="mx-auto mb-[18px] block motion-safe:animate-cap-float"
            >
              <circle cx="20" cy="20" r="18.5" fill="none" stroke="#0F3D66" strokeWidth="1.6" />
              <polygon points="20,4 24,20 20,36 16,20" fill="#0F3D66" />
              <polygon points="20,4 24,20 16,20" fill="#F6C445" />
              <circle cx="20" cy="20" r="2.4" fill="#FBFCFD" stroke="#0F3D66" strokeWidth="1.4" />
            </svg>
            <h2 className="serif mx-auto max-w-[640px] text-[clamp(30px,4vw,48px)] font-bold leading-[1.08] tracking-[-.8px]">
              Prêt à mettre le cap&nbsp;?
            </h2>
            <p className="mx-auto mt-4 max-w-[480px] text-[17px] text-cap-muted">
              Un échange de 15 minutes pour faire le point, sans engagement. On vous rappelle quand vous voulez.
            </p>
            <div className="mt-[30px] flex flex-wrap justify-center gap-3.5">
              <CallbackButton className="inline-flex items-center gap-2.5 rounded-cap-lg bg-cap-accent px-[26px] py-[15px] text-[16px] font-bold text-cap-ink shadow-cap-cta transition hover:-translate-y-px hover:brightness-[1.03]">
                Être rappelé
              </CallbackButton>
              <Link
                href={ROUTES.catalogue}
                className="inline-flex items-center gap-2.5 rounded-cap-lg bg-cap-navy px-[26px] py-[15px] text-[16px] font-bold text-white transition hover:brightness-110"
              >
                Explorer le catalogue
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
