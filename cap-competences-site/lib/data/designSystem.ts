import { ROUTES } from "@/lib/data/site";

// Données de la page « Design System » — verbatim de la maquette.

export const dsAnchors = [
  { label: "Marque", href: "#brand" },
  { label: "Couleurs", href: "#colors" },
  { label: "Typo", href: "#type" },
  { label: "Tokens", href: "#tokens" },
  { label: "Icônes", href: "#icons" },
  { label: "Composants", href: "#components" },
  { label: "Inventaire", href: "#inventory" },
];

export const dsBrand = [
  { name: "Logo / marque", file: "/assets/logo.svg" },
  { name: "Boussole", file: "/assets/boussole.svg" },
  { name: "Rose des vents", file: "/assets/rose-des-vents.svg" },
  { name: "Étoile du Nord", file: "/assets/etoile-du-nord.svg" },
];

export const dsColorGroups = [
  {
    group: "Marque",
    items: [
      { name: "Bleu cap", hex: "#0F3D66", token: "--cap-navy" },
      { name: "Marine profond", hex: "#0B2E4D", token: "--cap-navy-700" },
      { name: "Jaune boussole", hex: "#F6C445", token: "--cap-accent" },
      { name: "Vert progression", hex: "#2E9E6B", token: "--cap-green" },
    ],
  },
  {
    group: "Surfaces",
    items: [
      { name: "Fond de page", hex: "#FBFCFD", token: "--cap-bg" },
      { name: "Surface", hex: "#FFFFFF", token: "--cap-surface" },
      { name: "Surface 2", hex: "#F4F7FB", token: "--cap-surface-2" },
      { name: "Bleu doux", hex: "#E7F0F8", token: "--cap-soft" },
      { name: "Papier chaud", hex: "#F6F2EA", token: "--cap-paper" },
    ],
  },
  {
    group: "Texte & bordures",
    items: [
      { name: "Encre", hex: "#14202B", token: "--cap-ink" },
      { name: "Encre secondaire", hex: "#3C566D", token: "--cap-ink-muted" },
      { name: "Texte tertiaire", hex: "#5A6B7A", token: "--cap-muted" },
      { name: "Bordure", hex: "#E6ECF2", token: "--cap-border" },
    ],
  },
];

export const dsTypeScale = [
  { token: "--cap-text-4xl", px: "52px", sample: "Trouvez votre cap", cls: "serif", weight: 700, ls: "-.8px" },
  { token: "--cap-text-3xl", px: "40px", sample: "Titre de section", cls: "serif", weight: 700, ls: "-.6px" },
  { token: "--cap-text-xl", px: "24px", sample: "Sous-titre", cls: "serif", weight: 700, ls: "-.2px" },
  { token: "--cap-text-lg", px: "19px", sample: "Chapô d'introduction lisible", cls: "", weight: 500, ls: "0" },
  { token: "--cap-text-base", px: "15px", sample: "Corps de texte courant pour les paragraphes.", cls: "", weight: 400, ls: "0" },
  { token: "--cap-text-sm", px: "13.5px", sample: "Légende, méta, mentions.", cls: "", weight: 500, ls: "0" },
];

export const dsSpacing = [
  { token: "--cap-space-2", px: "8px" },
  { token: "--cap-space-3", px: "12px" },
  { token: "--cap-space-4", px: "16px" },
  { token: "--cap-space-6", px: "24px" },
  { token: "--cap-space-8", px: "32px" },
  { token: "--cap-space-12", px: "48px" },
];

export const dsRadii = [
  { name: "md", px: "11px" },
  { name: "lg", px: "14px" },
  { name: "xl", px: "18px" },
  { name: "2xl", px: "24px" },
  { name: "pill", px: "100px" },
];

export const dsShadows = [
  { name: "sm", css: "0 1px 2px rgba(20,32,43,.08)" },
  { name: "card", css: "0 1px 2px rgba(20,32,43,.05), 0 24px 50px -28px rgba(15,61,102,.30)" },
  { name: "cta", css: "0 10px 24px -12px rgba(246,196,69,.90)" },
];

export const dsCatIcons = [
  { name: "Bureautique", file: "/assets/icon-bureautique.svg" },
  { name: "Langues", file: "/assets/icon-langues.svg" },
  { name: "PAO & Infographie", file: "/assets/icon-pao.svg" },
  { name: "CAO-DAO & 3D", file: "/assets/icon-cao.svg" },
  { name: "Web", file: "/assets/icon-web.svg" },
  { name: "Marketing digital", file: "/assets/icon-marketing.svg" },
  { name: "Management", file: "/assets/icon-management.svg" },
  { name: "Bilan de compétences", file: "/assets/icon-bilan.svg" },
];

export const dsPages = [
  { name: "Accueil", file: ROUTES.home, desc: "Hero, sélecteur de profil, catégories, preuves" },
  { name: "Catalogue", file: ROUTES.catalogue, desc: "Liste filtrable + branchement profil" },
  { name: "Fiche formation", file: ROUTES.formation("excel"), desc: "Gabarit réutilisable · data-driven" },
  { name: "Entreprises", file: ROUTES.entreprises, desc: "B2B intra + demande de devis" },
];

export const dsComponentsList = [
  "Header + nav",
  "Méga-menu",
  "Connexion (apprenant/formateur)",
  "Sélecteur de profil",
  "Carte formation",
  "Filtres catalogue",
  "Champ de recherche",
  "Fil d'Ariane",
  "Boutons",
  "Badges",
  "Accordéon",
  "Formulaires",
  "Modale de rappel",
  "Bulle chatbot",
  "Bouton WhatsApp",
  "Bandeau cookies",
  "Icônes sociales",
  "Boutons de partage",
  "Footer",
];
