"use client";

import { useState } from "react";
import { devisDomaineOptions, devisSizeOptions } from "@/lib/data/entreprises";

const FORMATS = [
  { k: "presentiel", label: "Présentiel" },
  { k: "visio", label: "À distance" },
  { k: "mixte", label: "Mixte" },
];

const inputCls =
  "rounded-cap-md border border-cap-border px-3.5 py-2.5 text-[14.5px] outline-none focus-visible:border-cap-navy";
const labelCls = "flex flex-col gap-1.5 text-cap-sm font-semibold text-cap-ink";

/** Formulaire de devis entreprise — UI seule (aucun envoi : pas de backend). */
export function DevisForm() {
  const [format, setFormat] = useState("mixte");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-cap-2xl border border-cap-border bg-white p-[clamp(24px,2.6vw,32px)] text-center shadow-cap-card">
        <span className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-[rgba(46,158,107,.12)]">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2E9E6B" strokeWidth="2.4">
            <path d="M5 12l4.5 4.5L19 7" />
          </svg>
        </span>
        <h3 className="serif text-[24px] font-bold text-cap-ink">Demande envoyée. Cap sur votre projet&nbsp;!</h3>
        <p className="mx-auto mt-2.5 max-w-[340px] text-[15px] leading-[1.55] text-cap-muted">
          Un conseiller revient vers vous sous 24 à 48h avec un programme sur-mesure et un devis détaillé.
          (Démonstration : aucun formulaire n'est réellement envoyé sur ce site statique.)
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-[22px] rounded-cap-md bg-cap-navy px-[22px] py-3 text-[14.5px] font-bold text-white transition hover:brightness-110"
        >
          Envoyer une autre demande
        </button>
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
          Société *<input required placeholder="Nom de l'entreprise" className={inputCls} />
        </label>
        <label className={labelCls}>
          Votre nom *<input required placeholder="Prénom Nom" className={inputCls} />
        </label>
      </div>
      <div className="grid grid-cols-1 gap-[13px] sm:grid-cols-2">
        <label className={labelCls}>
          E-mail professionnel *<input required type="email" placeholder="vous@société.fr" className={inputCls} />
        </label>
        <label className={labelCls}>
          Téléphone<input type="tel" placeholder="01 23 45 67 89" className={inputCls} />
        </label>
      </div>
      <div className="grid grid-cols-1 gap-[13px] sm:grid-cols-2">
        <label className={labelCls}>
          Personnes à former
          <select className={`${inputCls} bg-white text-cap-ink`}>
            {devisSizeOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <label className={labelCls}>
          Domaine
          <select className={`${inputCls} bg-white text-cap-ink`}>
            {devisDomaineOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <span className="mb-2 block text-cap-sm font-semibold text-cap-ink">Format souhaité</span>
        <div className="flex flex-wrap gap-2">
          {FORMATS.map((f) => {
            const active = format === f.k;
            return (
              <button
                key={f.k}
                type="button"
                onClick={() => setFormat(f.k)}
                aria-pressed={active}
                className={`inline-flex items-center rounded-cap-pill border px-4 py-2.5 text-[13.5px] font-semibold transition ${
                  active ? "border-cap-navy bg-cap-navy text-white" : "border-cap-border bg-white text-cap-ink"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>
      <label className={labelCls}>
        Votre besoin
        <textarea
          rows={3}
          placeholder="Objectifs, niveau des équipes, échéances…"
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
        Recevoir mon devis →
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
