import Link from "next/link";
import { SITE, ROUTES } from "@/lib/data/site";

interface LogoProps {
  /** "default" : sur fond clair (marine). "white" : sur fond marine (footer). */
  variant?: "default" | "white";
  /** Taille du symbole boussole en px. */
  markSize?: number;
  /** Afficher le nom + la baseline à côté du symbole. */
  showText?: boolean;
  /** Destination du lien (par défaut : accueil). */
  href?: string;
  className?: string;
}

/** Symbole boussole + nom « Cap Expertises » et baseline. */
export function Logo({
  variant = "default",
  markSize = 40,
  showText = true,
  href = ROUTES.home,
  className,
}: LogoProps) {
  const primary = variant === "white" ? "#FFFFFF" : "#0F3D66";
  const centerFill = variant === "white" ? "#0F3D66" : "#FBFCFD";
  const nameColor = variant === "white" ? "#FFFFFF" : "#0F3D66";
  const baselineColor = variant === "white" ? "rgba(255,255,255,.75)" : "#5A6B7A";

  return (
    <Link
      href={href}
      className={`inline-flex flex-shrink-0 items-center gap-3 ${className ?? ""}`}
      aria-label={`${SITE.name} — accueil`}
    >
      <svg width={markSize} height={markSize} viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" r="18.5" fill="none" stroke={primary} strokeWidth="1.6" />
        {variant === "default" && (
          <circle cx="20" cy="20" r="13" fill="none" stroke={primary} strokeWidth="1" opacity=".35" />
        )}
        <polygon points="20,4 24,20 20,36 16,20" fill={primary} />
        <polygon points="20,4 24,20 16,20" fill="#F6C445" />
        {variant === "default" && (
          <polygon points="4,20 20,16 36,20 20,24" fill={primary} opacity=".55" />
        )}
        <circle cx="20" cy="20" r="2.4" fill={centerFill} stroke={primary} strokeWidth="1.4" />
      </svg>
      {showText && (
        <span className="flex flex-col leading-[1.05]">
          <span
            className="serif whitespace-nowrap text-[20px] font-bold tracking-[-0.2px]"
            style={{ color: nameColor }}
          >
            {SITE.name}
          </span>
          <span
            className="text-[10.5px] font-semibold uppercase tracking-[2.2px]"
            style={{ color: baselineColor }}
          >
            {SITE.baseline}
          </span>
        </span>
      )}
    </Link>
  );
}
