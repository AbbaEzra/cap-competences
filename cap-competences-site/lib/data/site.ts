// Données de navigation & d'identité partagées par tout le site.
// Les URLs sont « propres » (remplacent les fichiers .dc.html de la maquette).

export const SITE = {
  name: "Cap Expertises",
  baseline: "Trouvez votre cap",
  // URL canonique (à adapter au domaine OVH final). Sert de metadataBase pour og:url.
  url: "https://cap-expertises.com",
  description:
    "Organisme de formation : on vous oriente et on vous accompagne jusqu'à la compétence acquise.",
  phone: "09 80 80 33 53",
  phoneHours: "lun–ven 9h–18h",
  email: "contact@cap-expertises.com",
  siret: "82964719700021",
  whatsapp: "https://wa.me/33000000000",
  legalYear: 2026,
} as const;

export const ROUTES = {
  home: "/",
  catalogue: "/catalogue",
  entreprises: "/entreprises",
  rejoindre: "/rejoindre-le-reseau",
  designSystem: "/design-system",
  formation: (slug: string) => `/formations/${slug}`,
  /** Deep-link vers la section d'un pôle dans le catalogue (ancre #pole-<id>). */
  cataloguePole: (poleId: string) => `/catalogue/#pole-${poleId}`,
} as const;

// Navigation principale (header + burger) : Formations, Entreprises, Rejoindre le réseau.
export const NAV_LINKS = [
  { label: "Formations", href: ROUTES.catalogue },
  { label: "Entreprises", href: ROUTES.entreprises },
  { label: "Rejoindre le réseau", href: ROUTES.rejoindre },
];

// Liens sociaux (placeholder « # » : à brancher avant mise en ligne).
export const SOCIALS = [
  { label: "LinkedIn", short: "in", href: "https://www.linkedin.com/company/136166381/" },
  { label: "Instagram", short: "ig", href: "https://www.instagram.com/cap.expertises/" },
  { label: "Facebook", short: "f", href: "https://www.facebook.com/profile.php?id=61592227673416" },
];

// Un lien de footer : soit une URL (href), soit une action « rappel » (ouvre la modale).
export type FooterLink = {
  label: string;
  href?: string;
  /** Ouvre la modale « Être rappelé » au lieu de naviguer (contact côté front, sans backend). */
  action?: "callback";
  /** Valeur affichée « Concernant : … » dans la modale. */
  callbackContext?: string;
};

// Colonnes du footer.
// - Formations -> ancres de pôle réelles du catalogue (+ fiche Bilan).
// - Contact / Devenir formateur -> modale de rappel (seul canal de contact du site statique).
// - Liens « # » = pages standard non encore créées (à fournir avant mise en ligne,
//   au même titre que le SIRET / NDA encore fictifs).
export const FOOTER_COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Formations",
    links: [
      { label: "Bureautique", href: ROUTES.cataloguePole("bureautique") },
      { label: "Langues étrangères", href: ROUTES.cataloguePole("langues-etrangeres") },
      { label: "Infographie & numérique", href: ROUTES.cataloguePole("infographie-numerique") },
      { label: "Management", href: ROUTES.cataloguePole("management") },
      { label: "Bilan de compétences", href: ROUTES.formation("bilan-de-competences") },
      { label: "Tout le catalogue", href: ROUTES.catalogue },
    ],
  },
  {
    title: "Organisme",
    links: [
      { label: "Indicateurs de résultats", href: "#" },
      { label: "Accessibilité & handicap", href: "#" },
      { label: "Devenir formateur", href: ROUTES.rejoindre },
      { label: "Entreprises", href: ROUTES.entreprises },
    ],
  },
  {
    title: "Aide",
    links: [
      { label: "Contact", action: "callback" },
      { label: "FAQ", href: "#" },
      { label: "Espace apprenant", href: "#" },
    ],
  },
];

// Liens légaux (bas de footer). Pages standard non maquettées -> ancres « # ».
export const LEGAL_LINKS = [
  { label: "Mentions légales", href: "#" },
  { label: "CGV", href: "#" },
  { label: "Confidentialité", href: "#" },
  { label: "Règlement intérieur", href: "#" },
  { label: "Accessibilité", href: "#" },
  { label: "Plan du site", href: "#" },
];
