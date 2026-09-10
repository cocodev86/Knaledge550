"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { APPLE_MUSIC, AUDIOMACK, INSTAGRAM, catalog } from "../lib/site";

const archive = [
  { src: "/brick-portrait.webp", width: 900, height: 1058, label: "FRAME 001", note: "PORTRAIT / DAYLIGHT", alt: "Artist portrait against a weathered brick wall" },
  { src: "/bw-back.webp", width: 978, height: 1222, label: "FRAME 002", note: "ARCHIVE / B&W", alt: "Black-and-white archival photograph from behind" },
  { src: "/phone-candid.webp", width: 743, height: 1137, label: "FRAME 003", note: "CANDID / DAYLIGHT", alt: "Candid daylight photograph during a phone call" },
  { src: "/driveway-1.webp", width: 751, height: 1039, label: "FRAME 004A", note: "NIGHT / DRIVEWAY", alt: "Nighttime documentary photograph in a residential driveway" },
  { src: "/driveway-2.webp", width: 821, height: 1030, label: "FRAME 004B", note: "NIGHT / SECOND FRAME", alt: "Second nighttime documentary frame from the same driveway sequence" },
];

export default function Home() {
  const [soundOn, setSoundOn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const heroRef = useRef(null);
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);
  const restoreFocusRef = useRef(null);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const modalOpen = menuOpen || Boolean(lightbox);
    document.body.classList.toggle("noScroll", modalOpen);
    if (modalOpen) requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => document.body.classList.remove("noScroll");
  }, [menuOpen, lightbox]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setLightbox(null);
        requestAnimationFrame(() => restoreFocusRef.current?.focus?.());
        return;
      }
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = [...dialogRef.current.querySelectorAll('a[href], button:not([disabled])')];
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyPreference = () => {
      document.querySelectorAll("video[autoplay]").forEach((video) => {
        if (media.matches && video !== heroRef.current) video.pause();
        else if (!media.matches) video.play().catch(() => {});
      });
    };
    applyPreference();
    media.addEventListener?.("change", applyPreference);
    return () => media.removeEventListener?.("change", applyPreference);
  }, []);

  const toggleSound = () => {
    if (!heroRef.current) return;
    const next = !soundOn;
    heroRef.current.muted = !next;
    if (next) heroRef.current.play().catch(() => {});
    setSoundOn(next);
  };

  return (
    <>
      <a className="skipLink" href="#main-content">SKIP TO CONTENT</a>
      <div className="grain" aria-hidden="true" />
      <div className="scanline" aria-hidden="true" />

      <header className="siteHeader">
        <a className="brand" href="#top" aria-label="KNALEDGE550 home">KNALEDGE550</a>
        <div className="status" aria-hidden="true">550 / SIGNAL ACTIVE <i /></div>
        <nav aria-label="Primary navigation">
          <a href="#music">MUSIC</a><a href="#archive">ARCHIVE</a><a href="#story">ARTIST</a><Link href="/epk">EPK</Link>
        </nav>
        <button className="menuBtn" type="button" aria-label="Open navigation" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={(event) => { restoreFocusRef.current = event.currentTarget; setMenuOpen(true); }}>MENU</button>
      </header>

      <main id="main-content">
        <section id="top" className="hero" aria-labelledby="hero-title">
          <video ref={heroRef} className="heroVideo" autoPlay muted={!soundOn} loop playsInline preload="metadata" poster="/hero-poster.webp" aria-hidden="true">
            <source src="/hero-red-mirror-optimized.mp4" type="video/mp4" />
          </video>
          <div className="heroRedwash" aria-hidden="true" /><div className="heroVignette" aria-hidden="true" /><div className="signalSlice s1" aria-hidden="true" /><div className="signalSlice s2" aria-hidden="true" />
          <div className="heroMeta topLeft">550 / MIRROR SIGNAL</div><div className="heroMeta topRight">OFFICIAL ARTIST ARCHIVE</div>
          <div className="heroTitleWrap">
            <p className="kicker">KNALEDGE550</p><h1 id="hero-title" className="heroTitle">KNALEDGE<span>550</span></h1><p className="tagline">MUSIC / VISUALS / ARCHIVE</p>
            <div className="heroActions"><a className="btn btnSolid" href={APPLE_MUSIC} target="_blank" rel="noreferrer">LISTEN ON APPLE MUSIC <span aria-hidden="true">↗</span></a><a className="btn btnLine" href="#archive">ENTER ARCHIVE <span aria-hidden="true">→</span></a></div>
          </div>
          <div className="heroBottom"><div className="nowPlaying"><span>FEATURED RELEASE</span><strong>The Acronym</strong><Link href="/releases/the-acronym">OPEN RELEASE <span aria-hidden="true">→</span></Link></div><button className="soundBtn" type="button" aria-pressed={soundOn} onClick={toggleSound}>{soundOn ? "MUTE HERO" : "PLAY HERO AUDIO"}</button></div>
        </section>

        <div className="marquee" aria-hidden="true"><div className="marqueeTrack"><span>KNALEDGE550</span><b>✦</b><span>FIVEFIFTY</span><b>✦</b><span>550 ARCHIVE</span><b>✦</b><span>KNALEDGE550</span><b>✦</b><span>FIVEFIFTY</span><b>✦</b><span>550 ARCHIVE</span><b>✦</b></div></div>

        <section id="music" className="section dark" aria-labelledby="music-title">
          <div className="sectionIndex">01 / MUSIC</div><div className="sectionTitleRow"><h2 id="music-title">MUSIC</h2><p>OFFICIAL RELEASES.<br/>DIRECT LISTENING LINKS.</p></div>
          <div className="releaseFeature reveal">
            <Link className="releaseCover" href="/releases/the-acronym" aria-label="Open The Acronym release page"><div className="matrixGrid" aria-hidden="true" /><div className="releaseCode">550 / RELEASE FILE</div><div className="releaseName">THE<br/>ACRONYM</div><span className="openLabel">OPEN RELEASE</span></Link>
            <div className="releaseCopy"><span className="label">FEATURED PROJECT</span><h3>The Acronym</h3><p>Open the release page or continue directly to an official streaming destination.</p><div className="releaseLinks"><a className="btn btnSolid" href={APPLE_MUSIC} target="_blank" rel="noreferrer">APPLE MUSIC <span aria-hidden="true">↗</span></a><a className="textLink" href={AUDIOMACK} target="_blank" rel="noreferrer">AUDIOMACK <span aria-hidden="true">↗</span></a></div></div>
          </div>
          <a className="appleBanner reveal" href={APPLE_MUSIC} target="_blank" rel="noreferrer"><div><span>PRIMARY STREAMING DESTINATION</span><strong>KNALEDGE550 ON APPLE MUSIC</strong></div><b aria-hidden="true">↗</b></a>
          <div className="catalog" aria-label="Release catalog">{catalog.map((item, index) => <article className="record reveal" key={item.slug}><Link href={`/releases/${item.slug}`} className={`recordArt art${index + 1}`}>{item.title}</Link><div><strong>{item.title}</strong><span>{item.type}</span></div></article>)}</div>
        </section>

        <section className="videoBreak" aria-label="550 Archive motion interlude"><video autoPlay muted loop playsInline preload="metadata" poster="/bw-poster.webp" aria-hidden="true"><source src="/bw-closeup.mp4" type="video/mp4" /></video><div className="videoCopy"><span>550 ARCHIVE / MOTION</span><h2>ARCHIVE.</h2></div></section>

        <section id="archive" className="section archive" aria-labelledby="archive-title">
          <div className="sectionIndex">02 / 550 ARCHIVE</div><div className="sectionTitleRow"><h2 id="archive-title">ARCHIVE</h2><p>PHOTOGRAPHS / MOTION<br/>SELECTED FRAMES.</p></div>
          <div className="archiveGrid">
            {archive.map((item) => <figure className="archiveItem reveal" key={item.src}><button className="archiveOpen" type="button" onClick={(event) => { restoreFocusRef.current = event.currentTarget; setLightbox(item); }} aria-label={`Open ${item.label}: ${item.note}`}><img src={item.src} width={item.width} height={item.height} loading="lazy" decoding="async" alt={item.alt} /><span className="viewLabel" aria-hidden="true">VIEW ↗</span></button><figcaption><span>{item.label}</span><b>{item.note}</b></figcaption></figure>)}
            <div className="motionCard reveal"><video autoPlay muted loop playsInline preload="metadata" poster="/bridge-poster.webp" aria-hidden="true"><source src="/bridge-video.mp4" type="video/mp4" /></video><div>550 ARCHIVE / MOTION FRAME</div></div>
          </div>
        </section>

        <section id="story" className="section story" aria-labelledby="story-title"><div className="storyImage reveal"><img src="/brick-portrait.webp" width="900" height="1058" loading="lazy" decoding="async" alt="Artist portrait against a weathered brick wall" /><div>550 / ARTIST FILE</div></div><div className="storyCopy reveal"><div className="sectionIndex">03 / ARTIST</div><h2 id="story-title">KNALEDGE<br/>550.</h2><p>The official site brings releases, selected visuals, archive material and press resources into one controlled artist destination.</p><Link className="btn btnLine" href="/epk">OPEN PRESS KIT <span aria-hidden="true">→</span></Link></div></section>

        <section id="epk" className="section epk" aria-labelledby="business-title"><div className="sectionIndex">04 / PRESS + BUSINESS</div><div className="epkGrid"><div><h2 id="business-title">PRESS<br/>KIT.</h2><p>Official music, selected images and approved artist resources.</p><a className="appleTextLink" href={APPLE_MUSIC} target="_blank" rel="noreferrer">APPLE MUSIC ARTIST PAGE <span aria-hidden="true">↗</span></a><Link className="btn btnSolid" href="/epk">OPEN EPK <span aria-hidden="true">→</span></Link></div><div className="epkCard"><span>OFFICIAL EPK</span><strong>KNALEDGE550</strong><p>MUSIC / PHOTOS / RELEASES / OFFICIAL LINKS</p><Link href="/epk">VIEW PRESS KIT <span aria-hidden="true">→</span></Link></div></div></section>
      </main>

      <div className="appleDock" role="region" aria-label="Primary streaming link"><div><span>OFFICIAL STREAMING</span><strong>KNALEDGE550</strong></div><a href={APPLE_MUSIC} target="_blank" rel="noreferrer"> LISTEN ON APPLE MUSIC <span aria-hidden="true">↗</span></a></div>
      <footer><div className="footerLogo">KNALEDGE550</div><div className="footerInfo"><span>© 2026 KNALEDGE550</span><span><a href={APPLE_MUSIC} target="_blank" rel="noreferrer">APPLE MUSIC</a> / <a href={INSTAGRAM} target="_blank" rel="noreferrer">INSTAGRAM</a> / <a href={AUDIOMACK} target="_blank" rel="noreferrer">AUDIOMACK</a></span><span>OFFICIAL ARTIST SITE</span></div></footer>

      {menuOpen && <aside ref={dialogRef} id="mobile-navigation" className="mobileDrawer open" role="dialog" aria-modal="true" aria-label="Mobile navigation"><button ref={closeButtonRef} className="closeButton" type="button" aria-label="Close navigation" onClick={() => { setMenuOpen(false); requestAnimationFrame(() => restoreFocusRef.current?.focus?.()); }}>×</button><a href="#music" onClick={() => setMenuOpen(false)}>MUSIC</a><a href="#archive" onClick={() => setMenuOpen(false)}>ARCHIVE</a><a href="#story" onClick={() => setMenuOpen(false)}>ARTIST</a><Link href="/epk" onClick={() => setMenuOpen(false)}>EPK</Link><small>550 / SIGNAL ACTIVE</small></aside>}
      {lightbox && <div ref={dialogRef} className="lightbox" role="dialog" aria-modal="true" aria-label={`${lightbox.label}: ${lightbox.note}`} onClick={() => { setLightbox(null); requestAnimationFrame(() => restoreFocusRef.current?.focus?.()); }}><button ref={closeButtonRef} className="closeButton" type="button" aria-label="Close image viewer" onClick={() => { setLightbox(null); requestAnimationFrame(() => restoreFocusRef.current?.focus?.()); }}>×</button><span>{lightbox.label} / {lightbox.note}</span><img src={lightbox.src} width={lightbox.width} height={lightbox.height} alt={lightbox.alt} onClick={(event) => event.stopPropagation()} /></div>}
    </>
  );
}
