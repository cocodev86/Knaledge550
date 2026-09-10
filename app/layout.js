import "./globals.css";
import { SITE_URL, APPLE_MUSIC, INSTAGRAM } from "../lib/site";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "KNALEDGE550 — Official Artist Site", template: "%s | KNALEDGE550" },
  description: "Official site for KNALEDGE550 — music, visuals, the 550 Archive, press, releases and business contact.",
  openGraph: {
    title: "KNALEDGE550",
    description: "Music, visuals, releases and the 550 Archive.",
    url: SITE_URL,
    siteName: "KNALEDGE550",
    type: "website",
    images: [{ url: "/brick-portrait.jpeg", width: 1200, height: 1500 }],
  },
  twitter: { card: "summary_large_image", title: "KNALEDGE550", description: "Official artist site.", images: ["/brick-portrait.jpeg"] },
  alternates: { canonical: "/" },
};

const artistSchema = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "KNALEDGE550",
  url: SITE_URL,
  image: `${SITE_URL}/brick-portrait.jpeg`,
  sameAs: [APPLE_MUSIC, INSTAGRAM],
};

export default function RootLayout({ children }) {
  return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(artistSchema) }} />{children}</body></html>;
}
