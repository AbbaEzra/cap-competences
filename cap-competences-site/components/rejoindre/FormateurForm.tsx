"use client";

import { useState } from "react";
import { CallbackButton } from "@/components/callback/CallbackButton";

// Mêmes classes de champ/label que DevisForm (cohérence du design system).
const inputCls =
  "rounded-cap-md border border-cap-border px-3.5 py-2.5 text-[14.5px] outline-none focus-visible:border-cap-navy";
const labelCls = "flex flex-col gap-1.5 text-cap-sm font-semibold text-cap-ink";

/**
 * Formulaire de candidature formateur — UI seule, AUCUN envoi (pas de backend), calqué
 * techniquement sur DevisForm/CallbackModal : champs non contrôlés validés par HTML natif,
 * onSubmit -> preventDefault -> état `sent`. Différence assumée : le panneau de fin est
 * HONNÊTE (il n'affiche pas de faux « message envoyé »).
 */
export function FormateurForm({ domaines }: { domaines: { id: string; name: string }[] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  const toggle = (id: string) =>
    setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  if (sent) {
    return (
      <div className="rounded-cap-2xl border border-cap-border bg-white p-[clamp(24px,2.6vw,32px)] text-center shadow-cap-card">
        <span className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-cap-soft">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#0F3D66" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
        </span>
        <h3 className="serif text-[24px] font-bold text-cap-ink">Le dépôt en ligne arrive bientôt</h3>
        <p className="mx-auto mt-2.5 max-w-[360px] text-[15px] leading-[1.55] text-cap-muted">
          Ce formulaire n'est pas encore connecté&nbsp;: <strong className="font-semibold text-cap-ink">aucune
          donnée n'a été transmise.</strong> En attendant, faites-vous rappeler — on étudie chaque candidature.
        </p>
        <div className="mt-[22px] flex flex-wrap justify-center gap-2.5">
          <CallbackButton
            options={{ contextLabel: "Candidature formateur" }}
            className="rounded-cap-md bg-cap-accent px-[22px] py-3 text-[14.5px] font-bold text-cap-ink shadow-cap-cta transition hover:-translate-y-px hover:brightness-[1.03]"
          >
            Être rappelé(e)
          </CallbackButton>
          <button
            onClick={() => setSent(false)}
            className="rounded-cap-md border border-cap-border bg-white px-[22px] py-3 text-[14.5px] font-bold text-cap-navy transition hover:bg-cap-soft"
          >
            Revenir au formulaire
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="flex flex-col gap-[15px] rounded-cap-2xl border border-cap-border bg-white p-[clamp(24px,2.6vw,32px)] shadow-cap-card"
    >
      <div className="grid grid-cols-1 gap-[13px] sm:grid-cols-2">
        <label className={labelCls}>
          Nom complet *<input required placeholder="Prénom Nom" className={inputCls} />
        </label>
        <label className={labelCls}>
          E-mail *<input required type="email" placeholder="vous@exemple.fr" className={inputCls} />
        </label>
      </div>
      <div className="grid grid-cols-1 gap-[13px] sm:grid-cols-2">
        <label className={labelCls}>
          Téléphone<input type="tel" placeholder="06 12 34 56 78" className={inputCls} />
        </label>
        <label className={labelCls}>
          Lien CV / LinkedIn
          <input type="url" placeholder="https://linkedin.com/in/…" className={inputCls} />
        </label>
      </div>

      <div>
        <span className="mb-2 block text-cap-sm font-semibold text-cap-ink">
          Domaine(s) d'expertise
        </span>
        <div className="flex flex-wrap gap-2">
          {domaines.map((d) => {
            const active = selected.includes(d.id);
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => toggle(d.id)}
                aria-pressed={active}
                className={`inline-flex items-center rounded-cap-pill border px-4 py-2.5 text-[13.5px] font-semibold transition ${
                  active ? "border-cap-navy bg-cap-navy text-white" : "border-cap-border bg-white text-cap-ink"
                }`}
              >
                {d.name}
              </button>
            );
          })}
        </div>
        <span className="mt-1.5 block text-cap-xs text-cap-muted">
          Sélectionnez un ou plusieurs domaines (facultatif).
        </span>
      </div>

      <label className={labelCls}>
        Présentation *
        <textarea
          required
          rows={4}
          placeholder="Votre parcours, vos sujets de prédilection, votre expérience de la formation…"
          className={`${inputCls} resize-y`}
        />
      </label>

      <label className="flex items-start gap-2.5 text-cap-xs leading-[1.45] text-cap-muted">
        <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-cap-navy" />
        <span>
          J'accepte d'être recontacté(e) et la{" "}
          <a href="#" className="font-semibold text-cap-navy underline">
            politique de confidentialité
          </a>
          .
        </span>
      </label>

      <button
        type="submit"
        className="rounded-cap-md bg-cap-accent py-3.5 text-[16px] font-bold text-cap-ink shadow-cap-cta transition hover:-translate-y-px hover:brightness-[1.03]"
      >
        Envoyer ma candidature →
      </button>
      <p className="flex items-center justify-center gap-1.5 text-center text-[11.5px] text-cap-muted">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2E9E6B" strokeWidth="2">
          <path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" />
        </svg>
        Vos données restent confidentielles · protection anti-spam active
      </p>
    </form>
  );
}
