import type { Metadata } from "next";
import { Source_Serif_4, Public_Sans } from "next/font/google";
import "./globals.css";
import { CallbackProvider } from "@/components/callback/CallbackContext";
import { FloatingActions } from "@/components/overlays/FloatingActions";
import { CookieBanner } from "@/components/overlays/CookieBanner";
import { SITE } from "@/lib/data/site";

// Polices auto-hébergées au build par next/font (compatible export statique).
const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Cap Expertises — Trouvez votre cap",
    template: "%s — Cap Expertises",
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: "Cap Expertises — Trouvez votre cap",
    description: SITE.description,
    images: [{ url: "/assets/og-cap-competences.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-body antialiased">
        <CallbackProvider>
          {children}
          <FloatingActions />
          <CookieBanner />
        </CallbackProvider>
      </body>
    </html>
  );
}
