"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useCallbackModal } from "@/components/callback/context";
import { submitToWeb3Forms } from "@/lib/web3forms";

const SUJETS = [
  "Trouver une formation",
  "Faire un bilan de compétences",
  "Former mes équipes (entreprise)",
  "Autre demande",
];
const SITUATIONS = ["Salarié(e)", "Demandeur d'emploi", "Indépendant / Freelance", "Entreprise"];

/**
 * Modale « Être rappelé » — envoi réel via Web3Forms.
 * Accessible : role dialog, fermeture Échap / clic overlay / bouton, verrou scroll.
 */
export function CallbackModal() {
  const { open, options, closeCallback } = useCallbackModal();
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  useEffect(() => {
    if (!open) return;
    setStatus("idle");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCallback();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, closeCallback]);

  if (!open) return null;

  const title = options.title ?? "Être rappelé sous 24h";
  const subtitle = options.subtitle ?? "Un conseiller fait le point avec vous, à votre rythme.";
  const isSituation = options.field === "situation";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fields = Object.fromEntries(new FormData(e.currentTarget).entries());
    if (options.contextLabel) fields.contexte = options.contextLabel;
    try {
      await submitToWeb3Forms(fields, `Demande de rappel — ${options.contextLabel ?? title}`);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      onClick={closeCallback}
      className="fixed inset-0 z-[120] grid place-items-center bg-[rgba(11,32,46,.55)] p-5 backdrop-blur-[4px]"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="callback-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[460px] overflow-hidden rounded-cap-2xl bg-white shadow-cap-modal"
      >
        <div className="relative bg-cap-navy px-6 py-6 text-white">
          <button
            onClick={closeCallback}
            aria-label="Fermer"
            className="absolute right-[18px] top-[18px] grid h-8 w-8 place-items-center rounded-[9px] bg-white/15 text-lg text-white"
          >
            ×
          </button>
          <span className="text-cap-xs font-bold uppercase tracking-[1.2px] text-cap-accent">
            Sans engagement
          </span>
          <h3 id="callback-title" className="serif mt-1.5 text-[24px] font-bold">
            {title}
          </h3>
          <p className="mt-1 text-cap-sm opacity-85">{subtitle}</p>
          {options.contextLabel && (
            <p className="mt-1 text-cap-sm opacity-85">Concernant : {options.contextLabel}</p>
          )}
        </div>

        {status === "sent" ? (
          <div className="px-6 py-8 text-center">
            <span className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-[rgba(46,158,107,.12)]">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2E9E6B" strokeWidth="2.4">
                <path d="M5 12l4.5 4.5L19 7" />
              </svg>
            </span>
            <h4 className="serif text-[22px] font-bold text-cap-ink">Demande envoyée&nbsp;!</h4>
            <p className="mx-auto mt-2 max-w-[320px] text-cap-base text-cap-muted">
              Un conseiller vous rappelle sous 24h.
            </p>
            <button
              onClick={closeCallback}
              className="mt-5 rounded-cap-md bg-cap-navy px-5 py-3 text-cap-sm font-bold text-white"
            >
              Fermer
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 px-6 py-6">
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
            <div className="grid grid-cols-2 gap-3">
              <label className="flex flex-col gap-1.5 text-cap-sm font-semibold text-cap-ink">
                Prénom
                <input
                  name="prenom"
                  placeholder="Camille"
                  className="rounded-cap-md border border-cap-border px-3 py-2.5 text-[14.5px] outline-none focus-visible:border-cap-navy"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-cap-sm font-semibold text-cap-ink">
                Téléphone *
                <input
                  required
                  type="tel"
                  name="telephone"
                  placeholder="06 12 34 56 78"
                  className="rounded-cap-md border border-cap-border px-3 py-2.5 text-[14.5px] outline-none focus-visible:border-cap-navy"
                />
              </label>
            </div>
            <label className="flex flex-col gap-1.5 text-cap-sm font-semibold text-cap-ink">
              {isSituation ? "Votre situation" : "Sujet"}
              <select
                name={isSituation ? "situation" : "sujet"}
                className="rounded-cap-md border border-cap-border bg-white px-3 py-2.5 text-[14.5px] text-cap-ink outline-none focus-visible:border-cap-navy"
              >
                {(isSituation ? SITUATIONS : SUJETS).map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
            <label className="mt-0.5 flex items-start gap-2.5 text-cap-xs leading-[1.45] text-cap-muted">
              <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-cap-navy" />
              <span>
                J'accepte d'être recontacté(e) et la{" "}
                <a href="#" className="font-semibold text-cap-navy underline">
                  politique de confidentialité
                </a>
                .
              </span>
            </label>
            {status === "error" && (
              <p className="text-cap-sm font-semibold text-red-600">
                L'envoi a échoué. Réessayez ou appelez-nous directement.
              </p>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-0.5 rounded-cap-md bg-cap-accent py-3.5 text-[15.5px] font-bold text-cap-ink shadow-cap-cta transition hover:brightness-[1.03] disabled:opacity-60"
            >
              {status === "loading" ? "Envoi en cours…" : "Demander mon rappel →"}
            </button>
            <p className="flex items-center justify-center gap-1.5 text-center text-[11.5px] text-cap-muted">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2E9E6B" strokeWidth="2">
                <path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" />
              </svg>
              Données protégées · jamais de spam · anti-spam activé
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
