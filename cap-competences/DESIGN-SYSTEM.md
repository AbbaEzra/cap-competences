# Cap Expertises — Design System (handoff Claude Code)

Référence visuelle pour l'implémentation **Next.js (React) + Tailwind**.
Direction figée : **« Le Cap »** — horizon, confiance posée, clarté. La boussole est la signature, en intensité maîtrisée. Objectif : zéro perte de fidélité au développement.

> ⚠️ **Contenu d'exemple.** Tout élément de preuve (témoignages, logos clients, taux de satisfaction/réussite, certifications) est marqué **« exemple · à confirmer »** dans les maquettes et doit être remplacé par du réel avant mise en ligne. Les détails de financement (montants CPF, conditions AIF / FAF / OPCO) et les certifications (TOSA, Linguaskill/Lilate, codes RNCP/RS, habilitation à présenter des candidats) sont **à vérifier auprès des sources officielles**.

---

## 1. Fichiers de référence

| Fichier | Rôle |
|---|---|
| `tokens.css` | Variables CSS (couleurs, typo, échelle, espacements, rayons, ombres, dégradés). À importer en global. |
| `tailwind.config.js` | Miroir des tokens pour Tailwind (`theme.extend`). |
| `Design System.dc.html` | Cette page — rendus + specs des composants. |
| `/assets/*.svg` | Assets exportables (voir §5). |
| `/assets/og-cap-competences.png` | Image Open Graph par défaut (1200×630). |

---

## 2. Tokens (extrait — source : `tokens.css`)

**Couleurs marque** — Bleu cap `#0F3D66` · Marine profond `#0B2E4D` · Jaune boussole `#F6C445` · Vert progression `#2E9E6B`
**Surfaces** — Fond `#FBFCFD` · Surface `#FFFFFF` · Surface-2 `#F4F7FB` · Bleu doux `#E7F0F8` · Papier chaud `#F6F2EA`
**Texte** — Encre `#14202B` · Encre secondaire `#3C566D` · Tertiaire `#5A6B7A` · Bordure `#E6ECF2`

> **Règle du jaune** : signale la direction (CTA principal, étape active, repère). Avec parcimonie, jamais en aplat de fond large. Le vert = progression / validation.

**Typographie** — Display : **Source Serif 4** (titres, chiffres-clés). Corps/UI : **Public Sans**. Échelle : 12 / 13.5 / 15 / 16.5 / 19 / 24 / 30 / 40 / 52 px (titres en `clamp()`).
**Rayons** — 8 / 11 / 14 / 18 / 24 px + pill 100px. **Espacements** — base 4px. **Ombres** — `sm`, `card`, `pop`, `cta`, `modal` (voir tokens).

---

## 3. Pages maquettées (validées)

| Page | Fichier | Contenu |
|---|---|---|
| Accueil | `Accueil - Cap Expertises.dc.html` | Hero + sélecteur de profil (aiguillage), catégories, trajectoire, preuves, financement, formateur, CTA, footer, flottants (chatbot/WhatsApp), bandeau cookies |
| Catalogue | `Catalogue.dc.html` | Liste filtrable (domaine, niveau, format, CPF) + recherche + branchement profil (`?profil=`) |
| Fiche formation | `Fiche Formation.dc.html` | **Gabarit réutilisable** data-driven — 8 fiches d'exemple (1/catégorie), accordéon programme, carte d'inscription collante, partage social |
| CPF & Financement | `CPF et Financement.dc.html` | Mon Compte Formation (règle), routeur par situation, 5 dispositifs, étapes, FAQ |
| Entreprises | `Entreprises.dc.html` | B2B intra, méthode, OPCO, domaines, **formulaire de devis** (anti-spam) |

**Pages standard non maquettées** (à composer par Claude Code à partir de ce système, sans design sur-mesure) : À propos, Contact, Indicateurs de résultats, Accessibilité / Handicap, Devenir formateur, Actualités/Blog, Espace apprenant, Mentions légales, CGV, Politique de confidentialité, Règlement intérieur, Plan du site.

---

## 4. Composants

Header + nav · Méga-menu (catégories à icônes) · Menu Connexion (Espace apprenant / Espace formateur) · Sélecteur de profil · Carte formation · Filtres catalogue · Champ de recherche (suggestions) · Fil d'Ariane · Boutons (primary jaune / navy / outline / link) · Badges (CPF, niveau, « exemple ») · Accordéon · Formulaires (contact, devis, rappel, pré-inscription, devenir formateur) avec anti-spam · Modale de rappel · Bulle chatbot · Bouton WhatsApp flottant · Bandeau cookies (RGPD) · **Icônes sociales** (LinkedIn, Instagram, Facebook) · **Boutons de partage** (fiches & articles) · Footer légal.

---

## 5. Assets SVG exportables (`/assets`)

`logo.svg` · `boussole.svg` · `rose-des-vents.svg` · `etoile-du-nord.svg` ·
`icon-bureautique.svg` · `icon-langues.svg` · `icon-pao.svg` · `icon-cao.svg` · `icon-web.svg` · `icon-marketing.svg` · `icon-management.svg` · `icon-bilan.svg`

Pictos de catégories « en aiguilles » : une aiguille de boussole orientée à un angle propre à chaque domaine (0°, 45°, …, 315°). Couleurs : navy `#0F3D66` + pointe Nord `#F6C445`.

---

## 6. Réseaux sociaux & SEO social

- **Icônes** LinkedIn / Instagram / Facebook : header secondaire + footer.
- **Boutons de partage** sur fiches formation et articles (LinkedIn, Facebook, e-mail, copier le lien).
- **Open Graph** : chaque page porte `og:type`, `og:site_name`, `og:title`, `og:description`, `og:image`, `twitter:card`.
  Côté Next.js : rendre `og:title` / `og:description` / `og:url` **dynamiques par fiche & article** (Metadata API), `og:image` = `og-cap-competences.png` par défaut (prévoir une variante par fiche si possible).

---

## 7. Qualité & accessibilité

Responsive jusqu'au mobile · focus clavier visible (contour `#F6C445`) · contrastes WCAG AA · `prefers-reduced-motion` respecté · cibles tactiles ≥ 44px · animations légères et utiles (révélation au scroll, micro-interactions, aiguille de boussole).

---

## 8. Conformité / mentions à brancher

- **CPF** : inscription & paiement **uniquement** sur Mon Compte Formation (lien sortant officiel). Le site informe et accompagne, **n'encaisse pas** le CPF.
- **Qualiopi** : badge + page Certifications.
- **RGPD** : bandeau cookies + consentement, politique de confidentialité.
- **Accessibilité** : référent handicap, page dédiée.
- Tarifs / durées / dates de session : **indicatifs**, à fixer au catalogue réel.
