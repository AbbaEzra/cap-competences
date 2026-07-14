// Aiguille de boussole orientée — picto signature réutilisé partout (catégories,
// profils, méga-menu, cartes, fiches). Pointe « Nord » jaune, corps marine.

interface CompassNeedleProps {
  /** Angle d'orientation de l'aiguille, en degrés. */
  angle: number;
  /** Taille du picto en px (carré). */
  size?: number;
  /** Affiche le cercle extérieur (cadran). */
  ring?: boolean;
  /** Opacité du cercle extérieur. */
  ringOpacity?: number;
  className?: string;
}

export function CompassNeedle({
  angle,
  size = 34,
  ring = true,
  ringOpacity = 0.3,
  className,
}: CompassNeedleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={className}
    >
      {ring && (
        <circle
          cx="16"
          cy="16"
          r="14"
          fill="none"
          stroke="#0F3D66"
          strokeWidth="1"
          opacity={ringOpacity}
        />
      )}
      <g transform={`rotate(${angle} 16 16)`}>
        <polygon points="16,4 19.5,16 12.5,16" fill="#F6C445" />
        <polygon points="16,28 19.5,16 12.5,16" fill="#0F3D66" />
      </g>
      <circle cx="16" cy="16" r="2" fill="#fff" stroke="#0F3D66" strokeWidth="1.2" />
    </svg>
  );
}
