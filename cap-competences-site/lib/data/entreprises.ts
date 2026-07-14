// Données de la page « Entreprises » (B2B intra, organisation gérée de bout en bout).

export const entHeroStats = [
  { value: "+250", label: "entreprises accompagnées" },
  { value: "96 %", label: "de satisfaction" },
  { value: "48 h", label: "pour un devis" },
  { value: "Intra", label: "sur-mesure & à distance" },
];

export type EntIcon = "star" | "graduation" | "screen" | "shield";

export const entValues: { icon: EntIcon; title: string; text: string }[] = [
  {
    icon: "star",
    title: "Programmes sur-mesure",
    text: "On part de vos métiers et de vos outils, pas d'un catalogue figé. Le contenu colle à votre réalité.",
  },
  {
    icon: "graduation",
    title: "Logistique gérée",
    text: "Planning, convocations, salle ou visio, supports : on s'occupe de l'organisation, vous ne gérez pas la paperasse.",
  },
  {
    icon: "screen",
    title: "Présentiel ou à distance",
    text: "Dans vos locaux, dans les nôtres ou en visio. On s'adapte à votre organisation et à vos horaires.",
  },
  {
    icon: "shield",
    title: "Qualité & résultats",
    text: "Un cadre exigeant, des formateurs experts et des indicateurs de résultats suivis et transparents.",
  },
];

export const entSteps = [
  { n: "1", title: "On cadre le besoin", text: "Un échange pour comprendre vos objectifs, le niveau des équipes et vos contraintes." },
  { n: "2", title: "On construit le programme", text: "Contenu, durée, format et planning sur-mesure, validés avec vous avant de lancer." },
  { n: "3", title: "On cale la logistique", text: "Devis, convention et planning : on prépare tout, vous n'avez qu'à valider." },
  { n: "4", title: "On forme vos équipes", text: "Sessions animées par nos formateurs experts, en intra ou à distance." },
  { n: "5", title: "On mesure les résultats", text: "Évaluations, attestations et bilan : vous gardez la preuve de la montée en compétences." },
];

export const entClients = ["NORDICA", "Atelier Vialli", "Groupe Méridien", "Studio Klein", "Verdier & Co"];

export const devisPerks = [
  "Réponse sous 24 à 48h",
  "Programme adapté à vos métiers",
  "Programme clé en main",
  "Sans engagement",
];

export const entTestimonial = {
  quote:
    "« Montée en compétences de 14 collaborateurs sur Excel et le management. Programme calé sur nos process, logistique gérée de bout en bout. Zéro friction. »",
  name: "Claire V.",
  role: "DRH · Groupe Méridien (PME, 80 salariés)",
  initials: "CV",
};

export const devisDomaineOptions = [
  "Bureautique",
  "Langues",
  "PAO & Infographie",
  "CAO-DAO & 3D",
  "Web",
  "Marketing digital",
  "Management",
  "Autre / sur-mesure",
];

export const devisSizeOptions = ["1 à 3", "4 à 8", "9 à 15", "Plus de 15"];
