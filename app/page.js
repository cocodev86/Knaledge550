"use client";

import { useEffect, useRef, useState } from "react";
import { APPLE_MUSIC, AUDIOMACK, INSTAGRAM } from "../lib/site";

const catalog = [
  { title: "THE HERS TAPE", type: "PROJECT", className: "art1" },
  { title: "THE MIX", type: "PROJECT", className: "art2" },
  { title: "STUCK ON ME", type: "SINGLE", className: "art3" },
  { title: "CUPID", type: "SINGLE", className: "art4" },
  { title: "OH WORD?", type: "SINGLE", className: "art5" },
  { title: "THE ACRONYM", type: "PROJECT", className: "art6" },
];

const archive = [
  { src: "/brick-portrait.jpeg", label: "FRAME 001", note: "PORTRAIT / DAYLIGHT" },
  { src: "/bw-back.jpeg", label: "FRAME 002", note: "ARCHIVE / B&W" },
  { src: "/phone-candid.jpeg", label: "FRAME 003", note: "CANDID / REAL LIFE" },
  { src: "/driveway-1.jpeg", label: "FRAME 004A", note: "NIGHT / DRIVEWAY" },
  { src: "/driveway-2.jpeg", label: "FRAME 004B", note: "SAME NIGHT / NEXT FRAME" },
];

export default function Home() {
  const [soundOn, setSoundOn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [releaseOpen, setReleaseOpen] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")), { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const toggleSound = () => {
    if (!heroRef.current) return;
    heroRef.current.muted = soundOn;
    setSoundOn(!soundOn);
  };

  return <>
    <div className="grain"/><div className="scanline"/>
    <header className="siteHeader"><a className="brand" href="#top">KNALEDGE550</a><div className="status">SIGNAL: ACTIVE <i/></div><nav><a href="#music">MUSIC</a><a href="#archive">ARCHIVE</a><a href="#story">STORY</a><a href="#epk">EPK</a></nav><button className="menuBtn" onClick={() => setMenuOpen(true)}>☰</button></header>
    <main id="top">
      <section className="hero">
        <video ref={heroRef} className="heroVideo" autoPlay muted={!soundOn} loop playsInline><source src="/hero-red-mirror.mp4" type="video/mp4"/></video>
        <div className="heroRedwash"/><div className="heroVignette"/><div className="signalSlice s1"/><div className="signalSlice s2"/>
        <div className="heroMeta topLeft">TRANSMISSION / 550-001</div><div className="heroMeta topRight">ATLANTA, GA / 33.7490°N</div>
        <div className="heroTitleWrap"><p className="kicker">LATEST TRANSMISSION</p><h1 className="heroTitle">KNALEDGE<span>550</span></h1><p className="tagline">REAL PAIN / REAL PROGRESS / A DIFFERENT PERSPECTIVE</p><div className="heroActions"><a className="btn btnSolid" href={APPLE_MUSIC} target="_blank">LISTEN ON APPLE MUSIC ↗</a><a className="btn btnLine" href="#archive">ENTER ARCHIVE →</a></div></div>
        <div className="heroBottom"><div className="nowPlaying"><span>NOW PLAYING</span><strong>THE ACRONYM</strong><a href={APPLE_MUSIC} target="_blank"> MUSIC ↗</a></div><button className="soundBtn" onClick={toggleSound}>{soundOn ? "SOUND OFF" : "SOUND ON"}</button></div>
      </section>
      <section className="marquee"><div className="marqueeTrack"><span>KNALEDGE550</span><b>✦</b><span>FIVEFIFTY</span><b>✦</b><span>REAL PEOPLE. REAL STORIES.</span><b>✦</b><span>KNALEDGE550</span><b>✦</b><span>FIVEFIFTY</span><b>✦</b><span>REAL PEOPLE. REAL STORIES.</span><b>✦</b></div></section>
      <section id="music" className="section dark"><div className="sectionIndex">01 / CURRENT SIGNAL</div><div className="sectionTitleRow"><h2>MUSIC</h2><p>NOT A PLAYLIST PAGE.<br/>AN ACTIVE CATALOG.</p></div>
        <div className="releaseFeature reveal"><button className="releaseCover" onClick={() => setReleaseOpen(true)}><div className="matrixGrid"/><div className="releaseCode">550 / ACRONYM</div><div className="releaseName">THE<br/>ACRONYM</div><span className="openLabel">OPEN RELEASE FILE</span></button><div className="releaseCopy"><span className="label">FEATURED PROJECT</span><h3>THE ACRONYM</h3><p>Music, visuals, credits, lyrics, press, metadata and direct platform links — collected into one artist-controlled release experience.</p><div className="releaseLinks"><a className="btn btnSolid" href={APPLE_MUSIC} target="_blank">LISTEN ON APPLE MUSIC ↗</a><a className="textLink" href={AUDIOMACK} target="_blank">AUDIOMACK →</a></div></div></div>
        <a className="appleBanner reveal" href={APPLE_MUSIC} target="_blank"><div><span>PRIMARY STREAMING DESTINATION</span><strong>LISTEN TO KNALEDGE550 ON APPLE MUSIC</strong></div><b>↗</b></a>
        <div className="catalog">{catalog.map((item) => <article className="record reveal" key={item.title}><a href={item.title === "THE ACRONYM" ? "/releases/the-acronym" : APPLE_MUSIC} target={item.title === "THE ACRONYM" ? undefined : "_blank"} className={`recordArt ${item.className}`}>{item.title}</a><div><strong>{item.title}</strong><span>{item.type}</span></div></article>)}</div>
      </section>
      <section className="videoBreak"><video autoPlay muted loop playsInline preload="metadata"><source src="/bw-closeup.mp4" type="video/mp4"/></video><div className="videoCopy"><span>ARCHIVE SIGNAL / 550-014</span><h2>NO FILTER.</h2></div></section>
      <section id="archive" className="section archive"><div className="sectionIndex">02 / 550 ARCHIVE</div><div className="sectionTitleRow"><h2>ARCHIVE</h2><p>PHOTOS, MOTION, PLACES,<br/>MOMENTS, CHAPTERS.</p></div><div className="archiveGrid">{archive.map((item) => <figure className="archiveItem reveal" key={item.src} onClick={() => setLightbox(item.src)}><img src={item.src} alt=""/><figcaption><span>{item.label}</span><b>{item.note}</b></figcaption></figure>)}<div className="motionCard reveal"><video autoPlay muted loop playsInline preload="metadata"><source src="/bridge-video.mp4" type="video/mp4"/></video><div>MOTION / BRIDGE / ATLANTA</div><span>WATCH ↗</span></div></div></section>
      <section id="story" className="section story"><div className="storyImage reveal"><img src="/brick-portrait.jpeg" alt="KNALEDGE550 portrait"/><div>550 / SUBJECT FILE</div></div><div className="storyCopy reveal"><div className="sectionIndex">03 / THE STORY</div><h2>MORE THAN<br/>MUSIC.</h2><p>This site is built as a living artist archive. The music stays at the center, while places, clothes, movement, environment and everyday moments document the world around it.</p><blockquote>“SAME CITY.<br/>DIFFERENT MINDSET.”</blockquote><a className="btn btnLine" href="#epk">PRESS + BUSINESS →</a></div></section>
      <section className="manifesto"><span>550 / INTERLUDE</span><h2>REAL<br/><em>PAIN.</em><br/>REAL<br/><em>PROGRESS.</em></h2></section>
      <section id="epk" className="section epk"><div className="sectionIndex">04 / PRESS + BUSINESS</div><div className="epkGrid"><div><h2>WORK<br/>WITH 550.</h2><p>Booking · Features · Press · Business</p><a className="appleTextLink" href={APPLE_MUSIC} target="_blank">APPLE MUSIC ARTIST PAGE ↗</a><a className="btn btnSolid" href={INSTAGRAM} target="_blank">CONTACT / INSTAGRAM ↗</a></div><div className="epkCard"><span>EPK / PRESS KIT</span><strong>KNALEDGE550</strong><p>BIO / PHOTOS / MUSIC / PRESS / CONTACT</p><a href="/epk">OPEN EPK →</a></div></div></section>
    </main>
    <footer><div className="footerLogo">KNALEDGE550</div><div className="footerInfo"><span>© 2026 FIVEFIFTY</span><span>APPLE MUSIC / INSTAGRAM / AUDIOMACK</span><span>ATLANTA, GA</span></div></footer>
    <aside className={`mobileDrawer ${menuOpen ? "open" : ""}`}><button onClick={() => setMenuOpen(false)}>×</button><a href="#music" onClick={() => setMenuOpen(false)}>MUSIC</a><a href="#archive" onClick={() => setMenuOpen(false)}>ARCHIVE</a><a href="#story" onClick={() => setMenuOpen(false)}>STORY</a><a href="#epk" onClick={() => setMenuOpen(false)}>EPK</a><small>550 / SIGNAL ACTIVE</small></aside>
    {releaseOpen && <div className="releaseDrawer"><button onClick={() => setReleaseOpen(false)}>×</button><span>550 / RELEASE FILE</span><h3>THE ACRONYM</h3><p>Release hub preview. Final production version will hold the official artwork, track list, credits, lyrics, videos, press notes and streaming destinations.</p><a className="btn btnSolid" href={APPLE_MUSIC} target="_blank">APPLE MUSIC ↗</a></div>}
    {lightbox && <div className="lightbox" onClick={() => setLightbox(null)}><button onClick={() => setLightbox(null)}>×</button><span>550 ARCHIVE / IMAGE VIEWER</span><img src={lightbox} alt="" onClick={(e) => e.stopPropagation()}/></div>}
  </>;
}
