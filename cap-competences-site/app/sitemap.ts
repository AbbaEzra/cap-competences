import type { MetadataRoute } from "next";
import { SITE, ROUTES } from "@/lib/data/site";
import { getAllFormationIds } from "@/lib/catalogue";

// Sitemap statique généré au build (compatible export). Exclut /design-system (noindex, dev-only).
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ROUTES.home,
    ROUTES.catalogue,
    ROUTES.entreprises,
    ROUTES.rejoindre,
    ...getAllFormationIds().map((id) => ROUTES.formation(id)),
  ];

  return routes.map((route) => ({
    url: `${SITE.url}${route === "/" ? "/" : `${route}/`}`,
    lastModified: new Date(),
  }));
}
