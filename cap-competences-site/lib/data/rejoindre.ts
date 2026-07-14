// Données de la page « Rejoindre le réseau » (recrutement de formatrices et formateurs
// indépendants). Copie générique et honnête : aucun chiffre, témoignage ou partenaire
// inventé ; aucune mention CPF / OPCO / Qualiopi / France Travail.

export type FormateurIcon = "target" | "gear" | "clock" | "people";

export const formateurBenefits: { icon: FormateurIcon; title: string; text: string }[] = [
  {
    icon: "target",
    title: "Des missions qui vous ressemblent",
    text: "Intervenez sur les sujets où vous êtes le plus à l'aise, en présentiel comme à distance.",
  },
  {
    icon: "gear",
    title: "La logistique, c'est nous",
    text: "Inscriptions, planning, salles, convocations, supports : on gère l'intendance, vous vous concentrez sur la pédagogie.",
  },
  {
    icon: "clock",
    title: "Souplesse et autonomie",
    text: "Vous choisissez les missions selon vos disponibilités, en complément d'activité ou à temps plein.",
  },
  {
    icon: "people",
    title: "Un accompagnement humain",
    text: "Un interlocuteur dédié pour préparer vos sessions et faire le point régulièrement.",
  },
];

export const formateurSteps = [
  {
    n: "1",
    title: "Candidature",
    text: "Vous remplissez le formulaire avec vos domaines d'expertise et un mot de présentation.",
  },
  {
    n: "2",
    title: "Échange",
    text: "On fait connaissance lors d'un premier entretien pour cerner vos sujets et votre approche.",
  },
  {
    n: "3",
    title: "Intégration",
    text: "On cale ensemble le cadre, les supports et les premières dates d'intervention.",
  },
  {
    n: "4",
    title: "Missions",
    text: "Vous animez les sessions qui correspondent à votre expertise, accompagné(e) à chaque étape.",
  },
];

// Ce que l'équipe regarde dans une candidature (liste de réassurance, sans promesse chiffrée).
export const formateurCriteres = [
  "Une expertise solide dans votre domaine",
  "Le goût de la transmission et de la pédagogie",
  "De la rigueur et de la fiabilité",
  "Présentiel ou à distance, selon vos préférences",
];
