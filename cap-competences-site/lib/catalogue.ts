// Loader du catalogue — SOURCE DE VÉRITÉ : lib/data/catalogue-formations.json
// (7 pôles, 29 formations). Aucune donnée de formation n'est codée en dur ici.
import catalogueData from "@/lib/data/catalogue-formations.json";
import { ROUTES } from "@/lib/data/site";

export interface LabelDetail {
  label: string;
  detail: string;
}

export interface CatFormation {
  /** id = slug d'URL (/formations/[id]). */
  id: string;
  /** Profils auxquels la formation est pertinente (filtre « Je suis… »). */
  profils?: string[];
  titre: string;
  objectif: string;
  contenu: string;
  duree?: string;
  pre_requis?: string;
}

export interface CatPole {
  id: string;
  numero: number;
  titre: string;
  accroche: string;
  objectifs?: string[];
  programme_type?: LabelDetail[];
  modalites_public?: {
    langues?: string[];
    duree?: string;
    profils?: string[];
    pre_requis?: string;
  };
  profil_beneficiaires?: string;
  pre_requis?: string;
  duree_type?: string;
  moyens_formats?: string;
  formations: CatFormation[];
}

export interface CadreMethodologique {
  intro: string;
  suivi_execution_evaluation: LabelDetail[];
  ressources_moyens_pedagogiques: LabelDetail[];
}

interface Catalogue {
  meta: {
    marque: string;
    titre_catalogue: string;
    modalites_globales: string;
    source: string;
    avertissement: string;
  };
  cadre_methodologique_commun: CadreMethodologique;
  poles: CatPole[];
}

const data = catalogueData as unknown as Catalogue;

export const catalogueMeta = data.meta;
export const poles = data.poles;
export const cadreMethodologique = data.cadre_methodologique_commun;

/** Vue « fiche » : une formation + son pôle + les valeurs résolues (fallback pôle). */
export interface Fiche extends CatFormation {
  pole: CatPole;
  /** durée formation, sinon durée du pôle (duree_type ou modalites_public.duree). */
  dureeResolved?: string;
  /** pré-requis formation, sinon pré-requis du pôle. */
  prerequisResolved?: string;
}

export const allFormations: Fiche[] = poles.flatMap((p) =>
  p.formations.map((f) => ({
    ...f,
    pole: p,
    dureeResolved: f.duree ?? p.duree_type ?? p.modalites_public?.duree,
    prerequisResolved: f.pre_requis ?? p.pre_requis ?? p.modalites_public?.pre_requis,
  })),
);

export function getFormation(id: string): Fiche | undefined {
  return allFormations.find((f) => f.id === id);
}

export function getAllFormationIds(): string[] {
  return allFormations.map((f) => f.id);
}

/** Angle de l'aiguille de boussole pour un pôle (8 directions). */
export function poleAngle(numero: number): number {
  return ((numero - 1) * 45) % 360;
}

/* ------------------------------------------------------------------ *
 * Projection PUBLIQUE pour les composants client (catalogue).
 * On n'expose QUE les champs affichables.
 * ------------------------------------------------------------------ */
export interface PublicFormation {
  id: string;
  titre: string;
  objectif: string;
  /** Profils pertinents (filtre « Je suis… »). */
  profils: string[];
  /** Texte concaténé pour la recherche (titre + objectif + contenu + pôle + langues). */
  searchText: string;
}

export interface PublicPole {
  id: string;
  numero: number;
  titre: string;
  accroche: string;
  angle: number;
  formations: PublicFormation[];
}

export function getPublicCatalogue(): PublicPole[] {
  return poles.map((p) => {
    // Langues du pôle (uniquement le pôle Langues en possède) — utiles à la recherche.
    const langues = p.modalites_public?.langues?.join(" ") ?? "";
    return {
      id: p.id,
      numero: p.numero,
      titre: p.titre,
      accroche: p.accroche,
      angle: poleAngle(p.numero),
      formations: p.formations.map((f) => ({
        id: f.id,
        titre: f.titre,
        objectif: f.objectif,
        profils: f.profils ?? [],
        searchText: [f.titre, f.objectif, f.contenu, p.titre, langues].join(" "),
      })),
    };
  });
}

/**
 * Navigation par pôle (Accueil « catégories » + méga-menu + domaines Entreprises).
 * Dérivée des 7 pôles réels du JSON. Chaque entrée pointe en deep-link vers la
 * section du pôle dans le catalogue (#pole-<id>). Données publiques uniquement.
 */
export interface PoleNavItem {
  id: string;
  name: string;
  angle: number;
  count: number;
  href: string;
}

export function getPoleNav(): PoleNavItem[] {
  return poles.map((p) => ({
    id: p.id,
    name: p.titre,
    angle: poleAngle(p.numero),
    count: p.formations.length,
    href: ROUTES.cataloguePole(p.id),
  }));
}
