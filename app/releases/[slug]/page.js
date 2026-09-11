import Link from "next/link";
import { notFound } from "next/navigation";
import { APPLE_MUSIC, AUDIOMACK, SITE_URL, catalog, getRelease } from "../../../lib/site";

export function generateStaticParams() {
  return catalog.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const release = getRelease(slug);
  if (!release) return {};
  return {
    title: release.title,
    description: `${release.title} — official KNALEDGE550 release page.`,
    alternates: { canonical: `/releases/${release.slug}` },
    openGraph: {
      title: `${release.title} — KNALEDGE550`,
      description: `Official release page for ${release.title}.`,
      url: `${SITE_URL}/releases/${release.slug}`,
      type: "music.album",
      images: ["/brick-portrait.webp"],
    },
  };
}

export default async function ReleasePage({ params }) {
  const { slug } = await params;
  const release = getRelease(slug);
  if (!release) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": release.type === "PROJECT" ? "MusicAlbum" : "MusicRecording",
    name: release.title,
    byArtist: { "@type": "MusicGroup", name: "KNALEDGE550" },
    url: `${SITE_URL}/releases/${release.slug}`,
  };

  return (
    <main className="releasePage">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="releaseNoise" aria-hidden="true" />
      <header className="releaseNav"><Link href="/#music">← MUSIC</Link><span>RELEASE FILE / {release.code}</span></header>
      <section className="releaseHero">
        <div className={`releaseHeroArt release-${release.slug}`} aria-label={`${release.title} release title card`}><div className="matrixGrid" aria-hidden="true" /><span>{release.code}</span><strong>{release.title}</strong></div>
        <div className="releaseHeroCopy"><span className="sectionIndex">{release.type}</span><h1>{release.title}</h1><p>Official KNALEDGE550 release page with direct access to approved streaming destinations.</p><div className="releaseHeroButtons"><a className="btn btnSolid" href={APPLE_MUSIC} target="_blank" rel="noreferrer">LISTEN ON APPLE MUSIC ↗</a><a className="btn btnLine" href={AUDIOMACK} target="_blank" rel="noreferrer">AUDIOMACK ↗</a></div></div>
      </section>
      <section className="releaseDetails" aria-label="Release destinations"><div><span>01 / PRIMARY STREAMING</span><h2>APPLE MUSIC</h2><p>Open the official KNALEDGE550 artist destination on Apple Music.</p><a className="textLink" href={APPLE_MUSIC} target="_blank" rel="noreferrer">LISTEN ↗</a></div><div><span>02 / MORE MUSIC</span><h2>AUDIOMACK</h2><p>Open the KNALEDGE550 Audiomack destination.</p><a className="textLink" href={AUDIOMACK} target="_blank" rel="noreferrer">OPEN AUDIOMACK ↗</a></div></section>
      <section className="nextRelease"><span>550 / CATALOG</span><div className="nextReleaseGrid">{catalog.filter((item) => item.slug !== release.slug).map((item) => <Link href={`/releases/${item.slug}`} key={item.slug}><small>{item.type}</small><strong>{item.title}</strong><b>OPEN FILE →</b></Link>)}</div></section>
      <footer className="releaseFooter"><Link href="/#music">← RETURN TO MUSIC</Link></footer>
    </main>
  );
}
