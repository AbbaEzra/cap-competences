// Données de la page d'accueil — reprises de la maquette (orientation et accompagnement).

export type ProfileId = "salarie" | "demandeur" | "independant" | "entreprise";

export interface ProfileReco {
  tag: string;
  name: string;
  meta: string;
}

export interface Profile {
  id: ProfileId;
  title: string;
  desc: string;
  angle: number;
  lead: string;
  formations: ProfileReco[];
}

// Statistique non dérivable (donnée d'exemple). Le nombre de formations et de pôles
// est calculé dynamiquement depuis le catalogue (voir app/page.tsx).
export const heroApprenantsStat = { value: "4 200+", label: "apprenants orientés" };

export const profiles: Profile[] = [
  {
    id: "salarie",
    title: "Salarié",
    desc: "Monter en compétences",
    angle: 0,
    lead: "Montez en compétences sans quitter votre poste, à votre rythme et selon vos objectifs.",
    formations: [
      { tag: "XL", name: "Excel — du tableau au pilotage", meta: "21 h · présentiel ou visio · niveau intermédiaire" },
      { tag: "EN", name: "Anglais professionnel + TOEIC", meta: "30 h · visio · tous niveaux" },
      { tag: "MG", name: "Manager une équipe au quotidien", meta: "14 h · présentiel · prise de poste" },
    ],
  },
  {
    id: "demandeur",
    title: "Demandeur d'emploi",
    desc: "Retrouver le bon poste",
    angle: 270,
    lead: "Rebondissez vers le bon poste. On construit avec vous un parcours adapté à votre projet.",
    formations: [
      { tag: "BU", name: "Pack Bureautique complet", meta: "35 h · e-learning + visio · débutant" },
      { tag: "WP", name: "Créer et gérer un site WordPress", meta: "28 h · présentiel · débutant" },
      { tag: "BC", name: "Bilan de compétences", meta: "24 h · entretiens individuels" },
    ],
  },
  {
    id: "independant",
    title: "Indépendant",
    desc: "Développer mon activité",
    angle: 45,
    lead: "Développez votre activité avec des compétences directement actionnables au quotidien.",
    formations: [
      { tag: "MK", name: "Marketing digital — attirer ses clients", meta: "21 h · visio · tous niveaux" },
      { tag: "PS", name: "Photoshop & Illustrator — les essentiels", meta: "28 h · présentiel · débutant" },
      { tag: "SV", name: "Créer son site vitrine", meta: "21 h · e-learning · débutant" },
    ],
  },
  {
    id: "entreprise",
    title: "Entreprise",
    desc: "Former mes équipes",
    angle: 135,
    lead: "Formez vos équipes sans logistique. On adapte le programme à vos métiers et à vos enjeux.",
    formations: [
      { tag: "IN", name: "Parcours Management sur-mesure", meta: "Intra · adapté à vos enjeux" },
      { tag: "LG", name: "Anglais pour les équipes", meta: "Intra · visio · groupes de niveau" },
      { tag: "BU", name: "Pack Bureautique collaborateurs", meta: "Intra · présentiel · tous niveaux" },
    ],
  },
];

export const steps = [
  { n: "1", title: "On fait le point", text: "Un échange court pour cerner votre objectif, votre niveau et votre situation." },
  { n: "2", title: "On trace le parcours", text: "La bonne formation, le bon format, le bon rythme — sélectionnés pour vous." },
  { n: "3", title: "On organise tout", text: "Planning, convocation et supports : on cale les détails, vous gardez le cap sur l'apprentissage." },
  { n: "4", title: "Vous avancez, validez", text: "Formation, suivi de progression, et une compétence reconnue à l'arrivée." },
];

export const proofStats = [
  { value: "96 %", label: "de satisfaction" },
  { value: "91 %", label: "de réussite" },
  { value: "4,8/5", label: "note apprenants" },
];

export const reviews = [
  {
    quote:
      "J'ai repris confiance et décroché un poste de gestionnaire. On ne m'a jamais laissée seule.",
    name: "Sophie M.",
    role: "Reconversion · Bureautique",
    initials: "SM",
  },
  {
    quote:
      "Formation Excel au top, parfaitement organisée. L'équipe avait tout préparé en amont.",
    name: "Karim B.",
    role: "Salarié · Excel avancé",
    initials: "KB",
  },
];
