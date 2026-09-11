import Link from "next/link";
import { APPLE_MUSIC, AUDIOMACK, INSTAGRAM, SITE_URL } from "../../lib/site";

export const metadata = {
  title: "EPK",
  description: "Official KNALEDGE550 electronic press kit with music, selected images and verified artist links.",
  alternates: { canonical: "/epk" },
  openGraph: { title: "KNALEDGE550 — Official EPK", description: "Official music, selected images and verified artist links.", url: `${SITE_URL}/epk`, images: ["/brick-portrait.webp"] },
};

export default function EPKPage() {
  return (
    <main className="epkPage epkNoir">
      <header className="releaseNav epkNav"><Link href="/">← KNALEDGE550</Link><span>OFFICIAL EPK · 2026</span></header>

      <section className="epkHero epkHeroClean">
        <div className="epkPortrait"><img src="/brick-portrait.webp" width="900" height="1058" alt="KNALEDGE550 portrait against a weathered brick wall" /></div>
        <div className="epkIntro">
          <span className="sectionIndex">ELECTRONIC PRESS KIT</span>
          <h1>KNALEDGE550</h1>
          <p>Official music, selected artist images, release pages and verified external destinations.</p>
          <div className="releaseHeroButtons epkHeroActions"><a className="btn btnSolid" href={APPLE_MUSIC} target="_blank" rel="noreferrer">APPLE MUSIC ↗</a><a className="epkTextAction" href={INSTAGRAM} target="_blank" rel="noreferrer">INSTAGRAM ↗</a></div>
        </div>
      </section>

      <section className="epkBlocks epkBlocksClean" aria-label="EPK resources">
        <article><span>01 · MUSIC</span><h2>LISTEN</h2><p>Go directly to the primary streaming destination.</p><a className="epkTextAction" href={APPLE_MUSIC} target="_blank" rel="noreferrer">OPEN APPLE MUSIC ↗</a></article>
        <article><span>02 · RELEASES</span><h2>CATALOG</h2><p>Open the official release archive and individual release pages.</p><Link className="epkTextAction" href="/#music">VIEW RELEASES →</Link></article>
        <article><span>03 · PHOTOS</span><h2>SELECTED<br/>IMAGES</h2><p>View approved imagery from the 550 Archive.</p><Link className="epkTextAction" href="/#world">VIEW 550 WORLD →</Link></article>
        <article><span>04 · OFFICIAL LINKS</span><h2>CONNECT</h2><div className="epkLinkStack"><a href={APPLE_MUSIC} target="_blank" rel="noreferrer">APPLE MUSIC ↗</a><a href={INSTAGRAM} target="_blank" rel="noreferrer">INSTAGRAM ↗</a><a href={AUDIOMACK} target="_blank" rel="noreferrer">AUDIOMACK ↗</a></div></article>
      </section>

      <footer className="epkFooter"><span>OFFICIAL ARTIST DESTINATION</span><strong>KNALEDGE550</strong><Link href="/">RETURN TO ARTIST SITE →</Link></footer>
    </main>
  );
}
