"use client";

import { useRef, useState } from "react";
import { useCallbackModal } from "@/components/callback/context";

interface FicheSidebarProps {
  title: string;
  /** Méta affichées (Durée, Modalités, Pôle…) — uniquement celles fournies. */
  meta: { label: string; value: string }[];
}

/** Carte d'action collante : méta + CTAs (rappel/dossier/PDF) + partage. UI seule. */
export function FicheSidebar({ title, meta }: FicheSidebarProps) {
  const { openCallback } = useCallbackModal();
  const [toast, setToast] = useState("");
  const toastTimer = useRef<number | undefined>(undefined);

  const showToast = (msg: string) => {
    setToast(msg);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 3000);
  };

  const shareUrl = () => (typeof window !== "undefined" ? window.location.href : "");
  const shareLinkedIn = () =>
    window.open("https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(shareUrl()), "_blank", "noopener");
  const shareFacebook = () =>
    window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(shareUrl()), "_blank", "noopener");
  const shareEmail = () =>
    window.open(
      "mailto:?subject=" +
        encodeURIComponent(title + " — Cap Expertises") +
        "&body=" +
        encodeURIComponent("Cette formation pourrait vous intéresser : " + shareUrl()),
    );
  const copyLink = () => {
    try {
      navigator.clipboard?.writeText(shareUrl());
    } catch {
      /* noop */
    }
    showToast("Lien copié dans le presse-papier.");
  };

  return (
    <aside className="w-full self-start lg:sticky lg:top-[84px] lg:w-[360px] lg:flex-shrink-0">
      <div className="overflow-hidden rounded-cap-2xl border border-cap-border bg-white shadow-cap-card">
        {meta.length > 0 && (
          <dl className="flex flex-col gap-2.5 border-b border-cap-border bg-cap-surface-2 px-[22px] py-4">
            {meta.map((m) => (
              <div key={m.label} className="flex items-baseline justify-between gap-3">
                <dt className="text-[12px] font-bold uppercase tracking-[.5px] text-cap-muted">{m.label}</dt>
                <dd className="text-right text-[13.5px] font-semibold text-cap-ink">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <div className="flex flex-col gap-2.5 p-[22px]">
          <button
            onClick={() => openCallback({ title: "Être rappelé sous 24h", contextLabel: title })}
            className="flex items-center justify-center gap-2.5 rounded-cap-md bg-cap-accent py-3.5 text-[15.5px] font-bold text-cap-ink shadow-cap-cta transition hover:-translate-y-px hover:brightness-[1.03]"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M4 5c0 8.3 6.7 15 15 15a2 2 0 0 0 2-2v-2.3a1 1 0 0 0-.8-1l-3.6-.7a1 1 0 0 0-1 .4l-.9 1.2a12 12 0 0 1-5.2-5.2l1.2-.9a1 1 0 0 0 .4-1L9.3 4.8a1 1 0 0 0-1-.8H6a2 2 0 0 0-2 2z" />
            </svg>
            Être rappelé
          </button>
          <button
            onClick={() => openCallback({ title: "Lancez votre dossier", field: "situation", contextLabel: title })}
            className="flex items-center justify-center gap-2.5 rounded-cap-md bg-cap-navy py-3.5 text-[15.5px] font-bold text-white transition hover:brightness-110"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6M9 14l2 2 4-4" />
            </svg>
            Demander un programme
          </button>
          <button
            onClick={() => showToast("Le programme PDF vous est envoyé par e-mail.")}
            className="flex items-center justify-center gap-2.5 rounded-cap-md border-[1.5px] border-cap-border bg-white py-3 text-[14.5px] font-bold text-cap-navy transition hover:border-cap-navy hover:bg-cap-surface-2"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
            </svg>
            Télécharger le programme (PDF)
          </button>
        </div>
        <div className="flex items-start gap-2.5 border-t border-cap-border bg-cap-surface-2 px-[22px] py-4 text-[12.5px] leading-[1.45] text-cap-muted">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F3D66" strokeWidth="2" className="mt-px flex-shrink-0">
            <circle cx="12" cy="4" r="2" />
            <path d="M5 8h14M12 8v8M12 16l-3 5M12 16l3 5" />
          </svg>
          Formation accessible aux personnes en situation de handicap — référent dédié, aménagements étudiés
          avant l'inscription.
        </div>
      </div>

      {/* Partage */}
      <div className="mt-3.5 rounded-cap-lg border border-cap-border bg-white px-4 py-3.5">
        <span className="text-[11.5px] font-bold uppercase tracking-[.5px] text-cap-muted">
          Partager cette formation
        </span>
        <div className="mt-2.5 flex gap-2">
          {[
            { label: "LinkedIn", onClick: shareLinkedIn, icon: <LinkedInIcon /> },
            { label: "Facebook", onClick: shareFacebook, icon: <FacebookIcon /> },
            { label: "E-mail", onClick: shareEmail, icon: <MailIcon /> },
            { label: "Copier le lien", onClick: copyLink, icon: <LinkIcon /> },
          ].map((b) => (
            <button
              key={b.label}
              onClick={b.onClick}
              aria-label={`Partager : ${b.label}`}
              className="grid h-10 flex-1 place-items-center rounded-cap-md border border-cap-border text-cap-navy transition hover:border-cap-navy hover:bg-cap-surface-2"
            >
              {b.icon}
            </button>
          ))}
        </div>
      </div>

      {toast && (
        <div
          role="status"
          className="fixed bottom-[26px] left-1/2 z-[140] flex max-w-[calc(100vw-40px)] -translate-x-1/2 items-center gap-2.5 rounded-cap-lg bg-cap-ink px-5 py-3.5 text-white shadow-cap-modal"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F6C445" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <path d="M8 12l2.5 2.5L16 9" />
          </svg>
          <span className="text-[14px] font-medium">{toast}</span>
        </div>
      )}
    </aside>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3-.02-2.95-1.8-2.95-1.8 0-2.07 1.4-2.07 2.85V21h-4z" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 9h3l.5-3H14V4.4c0-.87.3-1.4 1.6-1.4H17.6V.3C17.1.2 16 0 14.8 0 12.1 0 10 1.6 10 4.1V6H7v3h3v9h4z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}
function LinkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" />
      <path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" />
    </svg>
  );
}
