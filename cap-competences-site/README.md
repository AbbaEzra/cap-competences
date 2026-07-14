# Cap Expertises — site web responsive

Site vitrine **Next.js (App Router) + TypeScript + Tailwind CSS**, export **100 % statique**,
porté fidèlement depuis la maquette « Le Cap » (`../cap-competences`). Aucun backend, aucune
base de données, aucun paiement : site statique déployable sur un hébergement mutualisé OVH.

## Prérequis

- Node.js 18.18+ (ou 20+)
- npm

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
```

## Construire (export statique)

```bash
npm run build    # génère le dossier ./out (HTML/CSS/JS/asset statiques)
```

`next.config.js` est configuré avec `output: 'export'`, `trailingSlash: true` et
`images.unoptimized: true`. Le build produit un dossier **`out/`** entièrement statique,
sans serveur Node.

## Déployer sur un hébergement mutualisé OVH (Apache)

Le build produit un site **100 % statique** : grâce à `output: 'export'` + `trailingSlash: true`,
chaque page est un dossier contenant un `index.html`, servi nativement par Apache via
`DirectoryIndex`. Structure générée :

```
out/index.html                      → page d'accueil
out/catalogue/index.html
out/entreprises/index.html
out/design-system/index.html
out/formations/<slug>/index.html    → 29 fiches (excel, word, wordpress, fle, …)
out/.htaccess                       → DirectoryIndex index.html + page 404
out/assets/… , out/_next/…          → images, CSS, JS
```

### Étapes

1. **Build** : `npm run build` (génère/rafraîchit `out/`).
2. **Téléverser le CONTENU de `out/`** (pas le dossier lui-même) à la **racine web** de votre
   hébergement OVH — le dossier **`www/`** — via FTP/SFTP (FileZilla) ou l'explorateur OVH.
   La page d'accueil doit donc se trouver en **`www/index.html`**.
   > ⚠️ Activez l'affichage des **fichiers cachés** dans votre client FTP pour bien envoyer le
   > **`.htaccess`** (il commence par un point).
3. **Nettoyer l'ancien site** : supprimez à la racine `www/` tout fichier résiduel d'un ancien
   site (notamment **`index.php`** de WordPress, `wp-*`, etc.). Sans cela, Apache pourrait
   servir `index.php` **avant** `index.html`.
4. **Vérifier** : ouvrez `https://votre-domaine` → l'accueil s'affiche ; testez `/catalogue/`,
   une fiche `/formations/excel/`, etc.

### `.htaccess` (déjà fourni)

Un `.htaccess` minimal est inclus dans `out/` (source : `public/.htaccess`) :

```apache
DirectoryIndex index.html index.htm
ErrorDocument 404 /404.html
```

`DirectoryIndex index.html` garantit que **`index.html` est prioritaire** sur un éventuel
`index.php` résiduel. Si vous préférez ne pas utiliser de `.htaccess`, assurez-vous alors
qu'**aucun `index.php`** ne subsiste à la racine `www/`.

> Avant mise en ligne : renseignez l'URL réelle du site dans `lib/data/site.ts`
> (`SITE.url`) pour des balises `og:url` / `metadataBase` correctes.

## Structure

```
app/                      Routes (App Router)
  page.tsx                Accueil
  catalogue/              Catalogue (filtrable, groupé par pôle, filtre par profil)
  entreprises/            Entreprises + formulaire de devis
  formations/[slug]/      Fiche formation — route DYNAMIQUE (generateStaticParams)
  design-system/          Design System (documentation, noindex)
  globals.css, tokens.css Tokens + base Tailwind
components/               Composants partagés et par page
lib/catalogue.ts          Loader/typage du catalogue (lit le JSON, projette le public)
lib/data/
  catalogue-formations.json  SOURCE DE VÉRITÉ : 7 pôles, 29 formations
  site.ts, home.ts, entreprises.ts, designSystem.ts  Contenu des autres pages
public/assets/            SVG (logo, boussole, icônes) + image Open Graph
```

## Choix d'implémentation notables

- **Source de vérité du catalogue : `lib/data/catalogue-formations.json`** (7 pôles, 29 formations).
  Le loader typé `lib/catalogue.ts` lit + normalise ce JSON ; aucune donnée de formation n'est
  codée en dur. Chaque champ de pôle est traité comme **optionnel** (n'est affiché que s'il
  existe), avec résolution de repli `formation → pôle` pour `durée` et `pré-requis`.
  > Le JSON fourni était en mojibake (UTF-8 lu en Windows-1252) ; il a été ré-encodé proprement.
- **Fiches data-driven.** `/formations/[slug]` est une **route dynamique** : `generateStaticParams`
  génère un fichier HTML par formation (slug = `id`) à partir du JSON. Rien n'est codé en dur
  autour du nombre de fiches : ajouter/retirer une formation dans le JSON suffit.
- **SEO par fiche.** `generateMetadata` dérive `title` / `description` / `og:url` de chaque
  fiche (titre + objectif + slug). Chaque page porte ses métadonnées et balises Open Graph.
- **Aucune mention de prise en charge.** Toute référence aux dispositifs (et la page/onglet
  associé·e), ainsi que les données correspondantes du JSON (montants, codes registre, statut),
  ont été retirées du site. Le catalogue ne porte que du contenu pédagogique.
- **Filtre par profil.** Le sélecteur « Je suis… » (Salarié / Demandeur d'emploi / Indépendant /
  Entreprise) filtre la liste via le champ `profils` de chaque formation (exposé dans la projection
  publique). Aucune donnée interne n'est envoyée au client.
- **Contenu « à vérifier ».** Le contenu provient du PDF officiel transcrit ; durées, intitulés de
  certification et sessions restent **à confirmer** avant mise en ligne. Les champs `objectif` et
  `contenu` sont affichés **fidèlement** (prose, sans découpage).
- **Pages Accueil / Entreprises / Design System** : hors périmètre de cette intégration ; leurs
  liens « domaines » pointent vers `/catalogue` (les anciens slugs par pôle n'existent plus). Le
  bloc « Huit directions » de l'accueil reste en données d'exemple — à aligner sur les 7 pôles
  ultérieurement si souhaité.
- **Responsive mobile-first.** Breakpoints Tailwind `sm 640 / md 768 / lg 1024 / xl 1280`,
  conteneur 1200px, gouttière 24px. Le menu passe en burger sous `lg`. Grilles fluides
  (`auto-fit`/`auto-fill`), pas de scroll horizontal.
- **Accessibilité.** Landmarks (`header`/`nav`/`main`/`footer`), `alt` sur les images, focus
  clavier visible (anneau jaune `#F6C445`), `aria-*` sur menus/accordéons/modale,
  `prefers-reduced-motion` respecté (animations désactivées).
- **Formulaires UI uniquement.** Modale de rappel et formulaire de devis n'envoient rien
  (site statique, pas de backend) : ils affichent un état de confirmation de démonstration.

## Scripts

| Script          | Rôle                                            |
| --------------- | ----------------------------------------------- |
| `npm run dev`   | Serveur de développement                        |
| `npm run build` | Export statique dans `out/`                      |
| `npm run lint`  | Lint Next.js (optionnel)                         |
