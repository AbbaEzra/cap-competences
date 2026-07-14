import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { CallbackButton } from "@/components/callback/CallbackButton";
import { SITE, SOCIALS, FOOTER_COLUMNS, LEGAL_LINKS } from "@/lib/data/site";

/** Pied de page UNIQUE et CANONIQUE, rendu identique sur toutes les pages. */
export function Footer() {
  return (
    <footer className="bg-cap-navy text-[#D6E4F0]">
      <div className="mx-auto max-w-cap-container px-cap-gutter pt-[clamp(44px,5vw,68px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-x-7 gap-y-9">
          {/* Bloc marque */}
          <div className="min-w-[200px]">
            <Logo variant="white" markSize={36} href="/" />
            <p className="mt-3.5 max-w-[260px] text-[13.5px] leading-[1.6] text-[#A9C2D9]">
              L'organisme de formation qui vous oriente et vous accompagne jusqu'à la compétence
              acquise.
            </p>
            <div className="mt-[18px] flex gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-[34px] w-[34px] place-items-center rounded-[9px] bg-white/10 text-[12px] font-bold transition hover:bg-white/20"
                >
                  {s.short}
                </a>
              ))}
            </div>
          </div>

          {/* Colonnes de liens */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="mb-3.5 text-[12.5px] font-bold uppercase tracking-[1px] text-white">
                {col.title}
              </div>
              <div className="flex flex-col items-start gap-2.5">
                {col.links.map((l) =>
                  l.action === "callback" ? (
                    <CallbackButton
                      key={l.label}
                      options={l.callbackContext ? { contextLabel: l.callbackContext } : undefined}
                      className="text-left text-[14px] text-[#B9CDDF] transition hover:text-white"
                    >
                      {l.label}
                    </CallbackButton>
                  ) : (
                    <Link
                      key={l.label}
                      href={l.href ?? "#"}
                      className="text-[14px] text-[#B9CDDF] transition hover:text-white"
                    >
                      {l.label}
                    </Link>
                  ),
                )}
              </div>
            </div>
          ))}

          {/* Newsletter */}
          <div className="min-w-[200px]">
            <div className="mb-3.5 text-[12.5px] font-bold uppercase tracking-[1px] text-white">
              Restez orienté
            </div>
            <p className="mb-3 text-[13.5px] leading-[1.55] text-[#A9C2D9]">
              Nos actus formation, une fois par mois.
            </p>
            <form
              className="flex gap-2 rounded-cap-md bg-white/10 py-[5px] pl-3.5 pr-[5px]"
              action="#"
            >
              <input
                type="email"
                placeholder="Votre e-mail"
                aria-label="Votre e-mail"
                className="flex-1 border-none bg-transparent text-[14px] text-white outline-none placeholder:text-[#A9C2D9]"
              />
              <button type="submit" className="rounded-[8px] bg-cap-accent px-3.5 py-2.5 text-[13.5px] font-bold text-cap-ink">
                OK
              </button>
            </form>
          </div>
        </div>

        {/* Bas de page */}
        <div className="mt-[46px] flex flex-wrap items-center justify-between gap-4 border-t border-white/15 py-[22px]">
          <span className="text-[12.5px] text-[#A9C2D9]">
            © {SITE.legalYear} {SITE.name} · SIRET {SITE.siret} · NDA 00 00 00000 00
          </span>
          <div className="flex flex-wrap gap-[18px]">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.label} href={l.href} className="text-[12.5px] text-[#A9C2D9] transition hover:text-white">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
