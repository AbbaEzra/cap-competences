/**
 * Cap Expertises — configuration Next.js.
 * Export statique : `next build` produit un dossier `out/` de fichiers statiques
 * déployables sur un hébergement mutualisé OVH (Apache/PHP, sans serveur Node).
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Génère un site 100 % statique dans /out (aucune fonction serveur).
  output: 'export',
  // OVH/Apache sert /catalogue/ -> /catalogue/index.html : on force le slash final.
  trailingSlash: true,
  // Pas d'optimisation d'images côté serveur (incompatible export statique).
  images: { unoptimized: true },
};

module.exports = nextConfig;
