"use client";

import { useState } from "react";
import { useCallbackModal } from "@/components/callback/context";
import { SITE, ROUTES } from "@/lib/data/site";

/**
 * Actions flottantes : bouton WhatsApp + « Cap, votre guide » — un GUIDE SCRIPTÉ
 * (pur front-end, aucune IA, aucun backend). Chaque option route vers une fonction
 * existante (recherche du catalogue, sélecteur de profil, ou demande de rappel).
 */
export function FloatingActions() {
  const { openCallback } = useCallbackModal();
  const [chatOpen, setChatOpen] = useState(false);
  const [ack, setAck] = useState("");

  // Accusé court puis routage (navigation pleine page = compatible export statique).
  const navigate = (url: string, msg: string) => {
    setAck(msg);
    window.setTimeout(() => {
      window.location.href = url;
    }, 600);
  };

  const options = [
    {
      label: "Une formation précise",
      run: () =>
        navigate(`${ROUTES.catalogue}/?focus=recherche`, "Je vous emmène à la recherche du catalogue…"),
    },
    {
      label: "Être orienté(e)",
      run: () => navigate(`${ROUTES.catalogue}/#profils`, "Je vous emmène au sélecteur « Je suis… »…"),
    },
    {
      label: "Parler à un conseiller",
      run: () => {
        // Même action que le CTA « Être rappelé » du header : demande de rappel (asynchrone).
        setChatOpen(false);
        setAck("");
        openCallback();
      },
    },
  ];

  const closeChat = () => {
    setChatOpen(false);
    setAck("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-[90] flex flex-col items-end gap-3">
      {chatOpen && (
        <div className="w-[320px] max-w-[calc(100vw-40px)] overflow-hidden rounded-cap-2xl border border-cap-border bg-white shadow-cap-pop">
          <div className="flex items-center gap-2.5 bg-cap-navy px-[18px] py-4 text-white">
            <span className="grid h-[38px] w-[38px] place-items-center rounded-full bg-white/15">
              <svg width="20" height="20" viewBox="0 0 40 40">
                <polygon points="20,6 23,20 20,34 17,20" fill="#fff" />
                <polygon points="20,6 23,20 17,20" fill="#F6C445" />
              </svg>
            </span>
            <div>
              <div className="text-cap-base font-bold">Cap, votre guide</div>
              <div className="text-[12px] opacity-80">Assistant guidé</div>
            </div>
            <button onClick={closeChat} aria-label="Fermer le guide" className="ml-auto text-xl text-white opacity-80">
              ×
            </button>
          </div>
          <div className="bg-cap-surface-2 p-[18px]">
            <div className="rounded-cap-lg rounded-tl-[4px] border border-cap-border bg-white px-[15px] py-3 text-[14px] leading-[1.5] text-cap-ink">
              Bonjour 👋 Je vous oriente en quelques clics. Que cherchez-vous&nbsp;?
            </div>
            {ack ? (
              <div className="mt-3.5 rounded-cap-md border border-cap-border bg-white px-3.5 py-3 text-[13.5px] font-semibold text-cap-navy">
                {ack}
              </div>
            ) : (
              <div className="mt-3.5 flex flex-col gap-2">
                {options.map((o) => (
                  <button
                    key={o.label}
                    onClick={o.run}
                    className="rounded-cap-md border border-cap-border bg-white px-3.5 py-2.5 text-left text-[13.5px] font-semibold text-cap-navy transition hover:border-cap-navy hover:bg-cap-soft"
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <a
        href={SITE.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter sur WhatsApp"
        className="grid h-14 w-14 place-items-center rounded-full bg-cap-whatsapp shadow-[0_14px_30px_-10px_rgba(37,211,102,.7)]"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
          <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 .9-2.2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.5.1.3.7 1.1 1.4 1.7.9.8 1.6 1 1.9 1.2.2.1.4.1.5-.1l.6-.8c.2-.2.3-.2.5-.1l1.8.9c.2.1.4.2.5.3 0 .2 0 .8-.2 1.3z" />
        </svg>
      </a>

      <button
        onClick={() => {
          setChatOpen((v) => !v);
          setAck("");
        }}
        aria-label="Ouvrir le guide"
        aria-expanded={chatOpen}
        className="grid h-[60px] w-[60px] place-items-center rounded-full bg-cap-navy shadow-[0_16px_34px_-12px_rgba(15,61,102,.8)] transition hover:-translate-y-0.5"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
          <path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5z" />
        </svg>
      </button>
    </div>
  );
}
