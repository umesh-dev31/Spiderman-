"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const IMAGES = [
  { src: "/gallery%20section/1410160.jpg",  alt: "Spider-Man Action",        span: "hero" },
  { src: "/gallery%20section/25811764.jpg", alt: "Brand New Day Scene",      span: "tall" },
  { src: "/gallery%20section/22845447.jpg", alt: "Spider-Man Scene",         span: "small" },
  { src: "/gallery%20section/1367972.png",  alt: "Spider-Man Brand New Day", span: "small" },
  { src: "/gallery%20section/1401620.jpg",  alt: "Brand New Day",            span: "small" },
];

export default function GallerySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const h = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  return (
    <section id="gallery" ref={ref} className="relative overflow-hidden" style={{ background: "#040608" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 80px, rgba(232,23,44,0.007) 81px)" }} />
      <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(232,23,44,0.3), transparent)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-28">

        {/* Header */}
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <motion.p initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}
              style={{ fontSize: 10, letterSpacing: "0.7em", textTransform: "uppercase", color: "var(--red)", fontFamily: "sans-serif", marginBottom: 14 }}>
              Gallery
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.85, delay: 0.08 }}
              style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 900, fontFamily: "sans-serif", color: "#fff", letterSpacing: "-0.03em", lineHeight: 0.92 }}>
              Behind the<br /><span className="red-gradient">Lens.</span>
            </motion.h2>
          </div>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.3 }}
            style={{ fontSize: 12, color: "rgba(240,240,240,0.3)", fontFamily: "sans-serif", lineHeight: 1.8, maxWidth: 280 }}>
            Official stills from Spider-Man: Brand New Day. Click any image to expand.
          </motion.p>
        </div>

        {isMobile ? (
          /* ── MOBILE: stacked layout ── */
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {/* Image 1 full width */}
            <GalleryCell img={IMAGES[0]} delay={0} inView={inView}
              style={{ height: "42vw" }} onClick={() => setLightbox(IMAGES[0].src)} />
            {/* Images 3 + 4 side by side */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              <GalleryCell img={IMAGES[2]} delay={0.08} inView={inView}
                style={{ height: "38vw" }} onClick={() => setLightbox(IMAGES[2].src)} />
              <GalleryCell img={IMAGES[3]} delay={0.12} inView={inView}
                style={{ height: "38vw" }} onClick={() => setLightbox(IMAGES[3].src)} />
            </div>
            {/* Image 2 full width */}
            <GalleryCell img={IMAGES[1]} delay={0.16} inView={inView}
              style={{ height: "52vw" }} onClick={() => setLightbox(IMAGES[1].src)} />
            {/* Banner */}
            <GalleryCell img={IMAGES[4]} delay={0.2} inView={inView}
              style={{ height: "32vw" }} onClick={() => setLightbox(IMAGES[4].src)}
              objectPosition="center 35%" />
          </div>
        ) : (
          <>
            {/* ── DESKTOP: bento grid ── */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gridTemplateRows: "42vh 32vh",
              gap: 8,
            }}>
              <GalleryCell img={IMAGES[0]} delay={0} inView={inView}
                style={{ gridColumn: "1 / 8", gridRow: "1 / 2" }}
                onClick={() => setLightbox(IMAGES[0].src)} />
              <GalleryCell img={IMAGES[1]} delay={0.08} inView={inView}
                style={{ gridColumn: "8 / 13", gridRow: "1 / 3" }}
                onClick={() => setLightbox(IMAGES[1].src)} />
              <GalleryCell img={IMAGES[2]} delay={0.16} inView={inView}
                style={{ gridColumn: "1 / 5", gridRow: "2 / 3" }}
                onClick={() => setLightbox(IMAGES[2].src)} />
              <GalleryCell img={IMAGES[3]} delay={0.22} inView={inView}
                style={{ gridColumn: "5 / 8", gridRow: "2 / 3" }}
                onClick={() => setLightbox(IMAGES[3].src)} />
            </div>
            {/* Banner */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="group relative overflow-hidden cursor-pointer"
              style={{ marginTop: 8, height: "28vh" }}
              onClick={() => setLightbox(IMAGES[4].src)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMAGES[4].src} alt={IMAGES[4].alt}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%", display: "block",
                  transition: "transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)" }}
                className="group-hover:scale-105" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "rgba(232,23,44,0.12)" }} />
              <div className="absolute inset-0 pointer-events-none"
                style={{ border: "1px solid rgba(255,255,255,0.06)" }} />
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ width: 32, height: 32, border: "1px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(4,6,8,0.6)" }}>
                <span style={{ color: "#fff", fontSize: 12 }}>⤢</span>
              </div>
            </motion.div>
          </>
        )}

        {/* Caption */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center gap-3 mt-6">
          <div style={{ width: 28, height: 1, background: "rgba(232,23,44,0.4)" }} />
          <span style={{ fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(240,240,240,0.2)", fontFamily: "sans-serif" }}>
            5 official stills &nbsp;·&nbsp; Spider-Man: Brand New Day 2026
          </span>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer"
            style={{ background: "rgba(4,6,8,0.95)", backdropFilter: "blur(16px)" }}
            onClick={() => setLightbox(null)}>
            <motion.img
              initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={lightbox} alt="Gallery"
              style={{ maxWidth: "90vw", maxHeight: "88vh", objectFit: "contain", boxShadow: "0 0 120px rgba(0,0,0,0.8)" }}
              onClick={e => e.stopPropagation()}
            />
            {/* Close */}
            <button onClick={() => setLightbox(null)}
              style={{ position: "absolute", top: 24, right: 32, background: "none", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", width: 40, height: 40, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(232,23,44,0.2), transparent)" }} />
    </section>
  );
}

function GalleryCell({
  img, delay, inView, style, onClick, objectPosition = "center center",
}: {
  img: { src: string; alt: string };
  delay: number;
  inView: boolean;
  style: React.CSSProperties;
  onClick: () => void;
  objectPosition?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className="group relative overflow-hidden cursor-pointer"
      style={{ ...style, position: "relative" }}
      onClick={onClick}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img.src} alt={img.alt}
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition, display: "block",
          transition: "transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)" }}
        className="group-hover:scale-105" />

      {/* Red hover tint */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "rgba(232,23,44,0.1)" }} />

      {/* Border overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ border: "1px solid rgba(255,255,255,0.06)" }} />

      {/* Red top bar on hover */}
      <div className="absolute inset-x-0 top-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left pointer-events-none"
        style={{ background: "var(--red)" }} />

      {/* Expand icon */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ width: 28, height: 28, border: "1px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(4,6,8,0.6)" }}>
        <span style={{ color: "#fff", fontSize: 11 }}>⤢</span>
      </div>
    </motion.div>
  );
}
