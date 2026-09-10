import { Archivo_Black, Space_Mono } from "next/font/google";
import "./globals.css";
import "./polish.css";
import { SITE_URL, APPLE_MUSIC, AUDIOMACK, INSTAGRAM } from "../lib/site";

const archivoBlack = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--font-display", display: "swap" });
const spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "KNALEDGE550 — Official Artist Site", template: "%s | KNALEDGE550" },
  description: "Official KNALEDGE550 site — music, releases, selected visuals and the 550 Archive.",
  applicationName: "KNALEDGE550",
  creator: "KNALEDGE550",
  openGraph: {
    title: "KNALEDGE550 — Official Artist Site",
    description: "Music, releases, selected visuals and the 550 Archive.",
    url: SITE_URL,
    siteName: "KNALEDGE550",
    type: "website",
    images: [{ url: "/brick-portrait.webp", width: 900, height: 1058, alt: "KNALEDGE550 official artist site" }],
  },
  twitter: { card: "summary_large_image", title: "KNALEDGE550 — Official Artist Site", description: "Music, releases, selected visuals and the 550 Archive.", images: ["/brick-portrait.webp"] },
  alternates: { canonical: "/" },
};

const artistSchema = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "KNALEDGE550",
  url: SITE_URL,
  image: `${SITE_URL}/brick-portrait.webp`,
  sameAs: [APPLE_MUSIC, INSTAGRAM, AUDIOMACK],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${archivoBlack.variable} ${spaceMono.variable}`}>
      <body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(artistSchema) }} />{children}</body>
    </html>
  );
}
