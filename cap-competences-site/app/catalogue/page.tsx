import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CatalogueClient } from "@/components/catalogue/CatalogueClient";
import { getPublicCatalogue } from "@/lib/catalogue";
import { ROUTES } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Catalogue des formations",
  description:
    "Bureautique, langues, PAO, web, management… Filtrez par domaine, niveau et format. Chaque formation mène à une fiche détaillée.",
  openGraph: {
    title: "Catalogue des formations — Cap Expertises",
    description:
      "Bureautique, langues, PAO, web, management… Filtrez par domaine, niveau et format.",
    url: ROUTES.catalogue,
  },
};

export default function CataloguePage() {
  return (
    <>
      <Header activeHref={ROUTES.catalogue} />
      {/* Fil d'Ariane */}
      <nav aria-label="Fil d'Ariane" className="border-b border-cap-border bg-white">
        <div className="mx-auto flex max-w-cap-container items-center gap-2.5 px-cap-gutter py-3 text-[13px] text-cap-muted">
          <Link href={ROUTES.home} className="font-semibold">
            Accueil
          </Link>
          <span className="opacity-50">/</span>
          <span className="font-semibold text-cap-navy">Catalogue des formations</span>
        </div>
      </nav>
      <main>
        <CatalogueClient poles={getPublicCatalogue()} />
      </main>
      <Footer />
    </>
  );
}
