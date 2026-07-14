import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CompassNeedle } from "@/components/brand/CompassNeedle";
import {
  dsAnchors,
  dsBrand,
  dsColorGroups,
  dsTypeScale,
  dsSpacing,
  dsRadii,
  dsShadows,
  dsCatIcons,
  dsPages,
  dsComponentsList,
} from "@/lib/data/designSystem";

export const metadata: Metadata = {
  title: "Design System",
  description: "Tokens, composants et assets de la direction visuelle « Le Cap » — Cap Expertises.",
  robots: { index: false, follow: false },
};

const card = "rounded-cap-2xl border border-[#E0E6EC] bg-white";
const mono = "font-mono";
const codeCls =
  "rounded-[5px] border border-cap-border bg-cap-surface-2 px-1.5 py-px font-mono text-[.85em] text-cap-navy";

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-[#EEF1F4]">
      {/* En-tête canonique partagé (identique sur toutes les pages) */}
      <Header />

      {/* Sous-barre de navigation interne au Design System (table des matières) */}
      <div className="border-b border-[#E0E6EC] bg-white">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-1 px-7 py-2.5 text-[13px] font-semibold">
          <span className="mr-2 text-[11px] font-bold uppercase tracking-[1.6px] text-cap-green">
            Design System · v1
          </span>
          {dsAnchors.map((a) => (
            <a
              key={a.href}
              href={a.href}
              className="rounded-[8px] px-3 py-[7px] text-cap-ink-muted transition hover:bg-cap-surface-2 hover:text-cap-ink"
            >
              {a.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1180px] px-7 pb-20 pt-9">
        {/* Intro */}
        <div className={`${card} mb-[34px] p-[clamp(28px,3vw,44px)]`}>
          <span className="text-[12.5px] font-bold uppercase tracking-[1.4px] text-cap-green">
            Cahier des charges visuel · handoff Claude Code
          </span>
          <h1 className="serif mt-2.5 text-[clamp(30px,4vw,46px)] font-bold leading-[1.05] tracking-[-.8px]">
            Le système « Le Cap ».
          </h1>
          <p className="mt-3.5 max-w-[720px] text-[16.5px] leading-[1.6] text-cap-ink-muted">
            Direction visuelle figée&nbsp;: horizon, confiance posée, clarté. La boussole reste la signature, en
            intensité maîtrisée. Cette page documente tokens, composants et assets pour une implémentation{" "}
            <strong>Next.js + Tailwind</strong> sans perte de fidélité.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {["tokens.css variables CSS", "tailwind.config.js", "/assets · 13 fichiers SVG/PNG"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 rounded-cap-pill border border-cap-border bg-cap-surface-2 px-3.5 py-[7px] text-[13px] font-semibold">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Marque */}
        <section id="brand" className="mb-10">
          <div className="mb-4 flex items-baseline gap-3">
            <h2 className="serif text-[26px] font-bold">Marque &amp; logo</h2>
            <span className="text-[13px] text-cap-muted">
              Assets exportables — dossier <code className={codeCls}>/assets</code>
            </span>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-4">
            {dsBrand.map((b) => (
              <div key={b.name} className={`${card} p-[22px] text-center`}>
                <div className="mb-3.5 grid place-items-center rounded-cap-lg bg-cap-surface-2 p-[22px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.file} width={72} height={72} alt={b.name} className="block" />
                </div>
                <div className="text-[15px] font-bold">{b.name}</div>
                <div className={`${mono} mt-1 text-[11.5px] text-cap-muted`}>{b.file.replace("/", "")}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Couleurs */}
        <section id="colors" className="mb-10">
          <h2 className="serif mb-4 text-[26px] font-bold">Couleurs</h2>
          {dsColorGroups.map((g) => (
            <div key={g.group} className="mb-4">
              <div className="mb-2.5 text-[12px] font-bold uppercase tracking-[.8px] text-cap-muted">{g.group}</div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(165px,1fr))] gap-3">
                {g.items.map((c) => (
                  <div key={c.token} className={`${card} overflow-hidden`}>
                    <div className="h-[74px] border-b border-cap-border" style={{ background: c.hex }} />
                    <div className="px-3 py-2.5">
                      <div className="text-[13.5px] font-bold">{c.name}</div>
                      <div className={`${mono} mt-0.5 text-[11.5px] text-cap-muted`}>{c.hex}</div>
                      <div className={`${mono} mt-0.5 text-[10.5px] text-[#9DB1C2]`}>{c.token}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className={`${card} px-[18px] py-4 text-[13.5px] leading-[1.55] text-cap-ink-muted`}>
            <strong className="text-cap-ink">Règle du jaune&nbsp;:</strong> le jaune-boussole signale la direction
            (CTA principal, étape active, repère). À utiliser avec parcimonie — jamais en aplat de fond large. Le
            vert = progression/validation. Contrastes vérifiés AA pour le texte.
          </div>
        </section>

        {/* Typographie */}
        <section id="type" className="mb-10">
          <h2 className="serif mb-4 text-[26px] font-bold">Typographie</h2>
          <div className="mb-4 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
            <div className={`${card} p-6`}>
              <div className="text-[12px] font-bold uppercase tracking-[.8px] text-cap-green">Display</div>
              <div className="serif mt-2 text-[44px] font-bold leading-[1.05] tracking-[-.8px]">Source Serif 4</div>
              <p className="mt-2.5 text-[13.5px] text-cap-muted">
                Titres, chiffres-clés, citations. Chaleureux et crédible. Poids 400–700.
              </p>
            </div>
            <div className={`${card} p-6`}>
              <div className="text-[12px] font-bold uppercase tracking-[.8px] text-cap-green">Corps &amp; UI</div>
              <div className="mt-2 text-[40px] font-bold leading-[1.05] tracking-[-.4px]">Public Sans</div>
              <p className="mt-2.5 text-[13.5px] text-cap-muted">
                Corps de texte, interface, formulaires. Très lisible. Poids 400–800.
              </p>
            </div>
          </div>
          <div className={`${card} p-6`}>
            <div className="mb-3.5 text-[12px] font-bold uppercase tracking-[.8px] text-cap-muted">Échelle</div>
            {dsTypeScale.map((t) => (
              <div key={t.token} className="flex items-baseline gap-[18px] border-t border-cap-border-2 py-2.5">
                <span className={`${mono} w-[130px] flex-shrink-0 text-[11.5px] text-cap-muted`}>
                  {t.token} · {t.px}
                </span>
                <span
                  className={t.cls === "serif" ? "serif" : ""}
                  style={{
                    fontSize: t.px,
                    fontWeight: t.weight,
                    letterSpacing: t.ls,
                    lineHeight: 1.1,
                    color: "#14202B",
                  }}
                >
                  {t.sample}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Tokens : espacements / rayons / ombres */}
        <section id="tokens" className="mb-10">
          <h2 className="serif mb-4 text-[26px] font-bold">Espacements, rayons &amp; ombres</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
            <div className={`${card} p-6`}>
              <div className="mb-3.5 text-[12px] font-bold uppercase tracking-[.8px] text-cap-muted">
                Espacements · base 4px
              </div>
              {dsSpacing.map((s) => (
                <div key={s.token} className="mb-2.5 flex items-center gap-3.5">
                  <span className={`${mono} w-[62px] text-[11.5px] text-cap-muted`}>{s.token}</span>
                  <span className="h-3.5 rounded-[3px] bg-cap-accent" style={{ width: s.px }} />
                  <span className={`${mono} text-[11.5px] text-[#9DB1C2]`}>{s.px}</span>
                </div>
              ))}
            </div>
            <div className={`${card} p-6`}>
              <div className="mb-3.5 text-[12px] font-bold uppercase tracking-[.8px] text-cap-muted">Rayons</div>
              <div className="flex flex-wrap gap-3.5">
                {dsRadii.map((r) => (
                  <div key={r.name} className="text-center">
                    <div
                      className="h-16 w-16 border-[1.5px] border-cap-navy bg-cap-soft"
                      style={{ borderRadius: r.px }}
                    />
                    <div className={`${mono} mt-1.5 text-[10.5px] text-cap-muted`}>{r.name}</div>
                    <div className={`${mono} text-[10.5px] text-[#9DB1C2]`}>{r.px}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${card} p-6`}>
              <div className="mb-4 text-[12px] font-bold uppercase tracking-[.8px] text-cap-muted">Ombres</div>
              <div className="flex flex-wrap gap-[18px]">
                {dsShadows.map((sh) => (
                  <div key={sh.name} className="text-center">
                    <div className="h-14 w-[78px] rounded-cap-md bg-white" style={{ boxShadow: sh.css }} />
                    <div className={`${mono} mt-2.5 text-[10.5px] text-cap-muted`}>{sh.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Iconographie */}
        <section id="icons" className="mb-10">
          <div className="mb-4 flex items-baseline gap-3">
            <h2 className="serif text-[26px] font-bold">Iconographie</h2>
            <span className="text-[13px] text-cap-muted">
              Pictos de catégories « en aiguilles » — chaque domaine pointe une direction
            </span>
          </div>
          <div className={`${card} grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4 p-6`}>
            {dsCatIcons.map((i) => (
              <div key={i.name} className="text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={i.file} width={56} height={56} alt={i.name} className="mx-auto inline-block" />
                <div className="mt-2 text-[12.5px] font-semibold">{i.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Composants */}
        <section id="components" className="mb-10">
          <h2 className="serif mb-4 text-[26px] font-bold">Composants</h2>

          {/* Boutons + badges */}
          <div className={`${card} mb-4 p-[26px]`}>
            <div className="mb-4 text-[13px] font-bold text-cap-navy">Boutons &amp; badges</div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="rounded-cap-md bg-cap-accent px-5 py-3 text-[14.5px] font-bold text-cap-ink shadow-cap-cta">
                Être rappelé
              </button>
              <button className="rounded-cap-md bg-cap-navy px-5 py-3 text-[14.5px] font-bold text-white">
                Monter mon dossier
              </button>
              <button className="rounded-cap-md border-[1.5px] border-cap-border bg-white px-5 py-3 text-[14.5px] font-bold text-cap-navy">
                Télécharger le PDF
              </button>
              <button className="px-1.5 py-3 text-[14.5px] font-bold text-cap-navy">Voir la fiche →</button>
            </div>
            <div className="mt-[18px] flex flex-wrap items-center gap-2.5 border-t border-cap-border-2 pt-[18px]">
              <span className="rounded-[8px] bg-[rgba(46,158,107,.13)] px-2.5 py-[5px] text-[11.5px] font-bold text-cap-green-700">
                Intermédiaire
              </span>
              <span className="rounded-cap-pill bg-cap-soft px-2.5 py-[5px] text-[11px] font-extrabold text-cap-navy">
                Nouveau
              </span>
              <span className="rounded-cap-pill border border-[rgba(246,196,69,.5)] bg-[rgba(246,196,69,.2)] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[.4px] text-cap-accent-ink">
                Exemple · à confirmer
              </span>
            </div>
          </div>

          {/* Carte formation + sélecteur de profil */}
          <div className="mb-4 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
            <div className={`${card} p-[22px]`}>
              <div className="mb-3.5 text-[13px] font-bold text-cap-navy">Carte formation</div>
              <div className="rounded-cap-xl border border-cap-border bg-white p-5 shadow-cap-sm">
                <div className="mb-3.5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-[12.5px] font-bold text-cap-navy">
                    <CompassNeedle angle={0} size={22} ringOpacity={0.35} />
                    Bureautique
                  </span>
                  <span className="rounded-[7px] bg-[rgba(46,158,107,.1)] px-2 py-1 text-[11.5px] font-bold text-cap-green-700">
                    Intermédiaire
                  </span>
                </div>
                <h3 className="serif text-[18.5px] font-bold leading-[1.2]">Excel — du tableau au pilotage</h3>
                <div className="mt-3 flex gap-3.5 text-[12.5px] font-medium text-cap-muted">
                  <span>⏱ 21 h</span>
                  <span>🖥 Présentiel · Visio</span>
                </div>
                <div className="mt-3.5 flex items-center justify-between border-t border-cap-border-2 pt-3.5">
                  <span className="text-[13.5px] font-bold text-cap-navy">Voir la fiche →</span>
                </div>
              </div>
            </div>
            <div className={`${card} p-[22px]`}>
              <div className="mb-3.5 text-[13px] font-bold text-cap-navy">Sélecteur de profil (aiguillage)</div>
              <div className="grid grid-cols-2 gap-[11px]">
                <div className="relative rounded-cap-lg border-[1.5px] border-cap-green bg-[rgba(46,158,107,.06)] p-[15px]">
                  <CompassNeedle angle={0} size={34} ringOpacity={0.3} />
                  <div className="mt-2 text-[14.5px] font-bold">Salarié</div>
                  <div className="text-[12px] text-cap-muted">Monter en compétences</div>
                  <span className="absolute right-[11px] top-[11px] grid h-5 w-5 place-items-center rounded-full bg-cap-green text-[11px] text-white">
                    ✓
                  </span>
                </div>
                <div className="rounded-cap-lg border-[1.5px] border-cap-border bg-white p-[15px]">
                  <CompassNeedle angle={270} size={34} ringOpacity={0.3} />
                  <div className="mt-2 text-[14.5px] font-bold">Demandeur</div>
                  <div className="text-[12px] text-cap-muted">Retrouver le bon poste</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recherche + ariane + champ */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
            <div className={`${card} p-[22px]`}>
              <div className="mb-3.5 text-[13px] font-bold text-cap-navy">Recherche &amp; fil d'Ariane</div>
              <div className="flex items-center gap-2.5 rounded-cap-md border border-cap-border bg-cap-surface-2 px-3.5 py-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5A6B7A" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.2-3.2" />
                </svg>
                <span className="text-[14.5px] text-[#9DB1C2]">Une formation, un métier…</span>
              </div>
              <div className="mt-4 flex items-center gap-2.5 text-[13px] text-cap-muted">
                <span className="font-semibold">Accueil</span>
                <span className="opacity-50">/</span>
                <span className="font-semibold">Formations</span>
                <span className="opacity-50">/</span>
                <span className="font-semibold text-cap-navy">Bureautique</span>
              </div>
            </div>
            <div className={`${card} p-[22px]`}>
              <div className="mb-3.5 text-[13px] font-bold text-cap-navy">Champ de formulaire</div>
              <label className="flex flex-col gap-1.5 text-[13px] font-semibold">
                E-mail professionnel *
                <input
                  placeholder="vous@société.fr"
                  className="rounded-cap-md border border-cap-border px-3.5 py-2.5 text-[14.5px] outline-none"
                />
              </label>
              <label className="mt-3 flex items-start gap-2.5 text-[12.5px] leading-[1.45] text-cap-muted">
                <input type="checkbox" className="mt-0.5 h-4 w-4 accent-cap-navy" />
                J'accepte d'être recontacté(e) · anti-spam actif
              </label>
            </div>
          </div>
        </section>

        {/* Inventaire */}
        <section id="inventory" className="mb-5">
          <h2 className="serif mb-4 text-[26px] font-bold">Inventaire · pages, composants &amp; tokens</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
            <div className={`${card} p-6`}>
              <div className="mb-3.5 text-[12px] font-bold uppercase tracking-[.8px] text-cap-green">
                Pages maquettées
              </div>
              <div className="flex flex-col gap-[3px]">
                {dsPages.map((p) => (
                  <Link key={p.name} href={p.file} className="flex items-center justify-between gap-2.5 rounded-[10px] px-3 py-3 hover:bg-cap-surface-2">
                    <span>
                      <span className="block text-[14.5px] font-bold text-cap-ink">{p.name}</span>
                      <span className="block text-[12px] text-cap-muted">{p.desc}</span>
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F3D66" strokeWidth="2.2" className="flex-shrink-0 opacity-50">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
            <div className={`${card} p-6`}>
              <div className="mb-3.5 text-[12px] font-bold uppercase tracking-[.8px] text-cap-green">Composants</div>
              <div className="flex flex-wrap gap-[7px]">
                {dsComponentsList.map((c) => (
                  <span key={c} className="rounded-cap-pill border border-cap-border bg-cap-surface-2 px-3 py-1.5 text-[12.5px] font-semibold text-cap-navy">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div className={`${card} p-6`}>
              <div className="mb-3.5 text-[12px] font-bold uppercase tracking-[.8px] text-cap-green">
                Fichiers de référence
              </div>
              <div className="flex flex-col gap-2.5 text-[12.5px] text-cap-muted">
                <div className="flex items-center gap-2.5">
                  <code className={codeCls}>tokens.css</code> Variables CSS
                </div>
                <div className="flex items-center gap-2.5">
                  <code className={codeCls}>tailwind.config.js</code> Thème Tailwind
                </div>
                <div className="flex items-center gap-2.5">
                  <code className={codeCls}>/assets/*.svg</code> Logo, boussole, rose, étoile, 8 icônes
                </div>
              </div>
              <div className="mt-4 flex items-start gap-2.5 border-t border-cap-border-2 pt-3.5">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#8A6400" strokeWidth="2" className="mt-px flex-shrink-0">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8h.01M11 12h1v4h1" />
                </svg>
                <span className="text-[12px] leading-[1.5] text-cap-muted">
                  Tout contenu de preuve (témoignages, logos clients, chiffres, certifications) est marqué{" "}
                  <strong className="text-cap-ink">« exemple · à confirmer »</strong> et doit être remplacé par du
                  réel avant mise en ligne.
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
