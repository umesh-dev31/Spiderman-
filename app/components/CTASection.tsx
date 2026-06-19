"use client";
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { showToast } from "./Toast";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL = 277;
const PAD   = (n: number) => String(n).padStart(3, "0");
const FRAME = (i: number) => `/footer section/ezgif-frame-${PAD(i + 1)}.jpg`;

export default function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const framesRef    = useRef<HTMLImageElement[]>([]);
  const frameObj     = useRef({ idx: 0 });
  const ctxRef       = useRef<CanvasRenderingContext2D | null>(null);
  const overlayRef   = useRef<HTMLDivElement>(null);
  const inView       = useInView(overlayRef, { once: true });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    function resize() {
      if (!canvas) return;
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      draw(frameObj.current.idx);
    }

    function draw(raw: number) {
      const img = framesRef.current[Math.round(raw)];
      if (!img?.complete || img.naturalWidth === 0 || !canvas || !ctxRef.current) return;
      ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
      const s = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
      const w = img.naturalWidth * s;
      const h = img.naturalHeight * s;
      ctxRef.current.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
    }

    for (let i = 0; i < TOTAL; i++) {
      const img = new Image();
      img.src = FRAME(i);
      img.onload = () => { if (i === 0) { resize(); draw(0); } };
      framesRef.current.push(img);
    }

    window.addEventListener("resize", resize);
    resize();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    tl.to(frameObj.current, {
      idx: TOTAL - 1,
      ease: "none",
      duration: 1,
      onUpdate: () => draw(frameObj.current.idx),
    });

    return () => {
      window.removeEventListener("resize", resize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div id="tickets" ref={containerRef} style={{ height: "500vh", position: "relative" }}>
      <div className="sticky top-0 overflow-hidden" style={{ height: "100vh" }}>

        {/* Canvas — 277-frame scroll animation */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, rgba(4,6,8,0.85) 100%)" }} />

        {/* Top fade */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#040608] to-transparent pointer-events-none" />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#020304] to-transparent pointer-events-none" />

        {/* Cinematic bars */}
        <div className="absolute inset-x-0 top-0 h-12 pointer-events-none" style={{ background: "rgba(0,0,0,0.55)" }} />
        <div className="absolute inset-x-0 bottom-0 h-12 pointer-events-none" style={{ background: "rgba(0,0,0,0.55)" }} />

        {/* Web grid */}
        <div className="absolute inset-0 web-bg opacity-10 pointer-events-none" />

        {/* Red web SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.05 }}
          viewBox="0 0 900 600" preserveAspectRatio="xMidYMid slice">
          {[1,2,3,4,5].map(r => (
            <ellipse key={r} cx="450" cy="300" rx={r * 80} ry={r * 55}
              fill="none" stroke="#e8172c" strokeWidth="0.6" />
          ))}
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * 30 * Math.PI) / 180;
            return <line key={i} x1="450" y1="300"
              x2={450 + Math.cos(a) * 500} y2={300 + Math.sin(a) * 380}
              stroke="#e8172c" strokeWidth="0.4" />;
          })}
        </svg>

        {/* CTA overlay */}
        <div ref={overlayRef} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">

          {/* Marvel badge */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: "clamp(14px, 3vw, 32px)", display: "inline-block", padding: "4px 16px", background: "var(--red)" }}>
            <span style={{ fontSize: "clamp(8px, 1.2vw, 10px)", fontWeight: 900, letterSpacing: "0.4em", textTransform: "uppercase", color: "#fff", fontFamily: "sans-serif" }}>
              Marvel Studios
            </span>
          </motion.div>

          {/* Title */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}>
            <h2 style={{
              fontSize: "clamp(38px, 10vw, 120px)", fontWeight: 900, fontFamily: "sans-serif",
              color: "#fff", letterSpacing: "-0.02em", lineHeight: 1,
              textShadow: "0 0 100px rgba(232,23,44,0.4), 0 4px 60px rgba(0,0,0,0.9)",
            }}>
              SPIDER-MAN
            </h2>
            <h3 style={{
              fontSize: "clamp(14px, 4vw, 48px)", fontWeight: 900, fontFamily: "sans-serif",
              color: "var(--red)", letterSpacing: "0.1em", fontStyle: "italic", marginTop: 6,
              textShadow: "0 0 60px rgba(232,23,44,0.7)",
            }}>
              BRAND NEW DAY
            </h3>
          </motion.div>

          {/* Date */}
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            style={{ marginTop: "clamp(10px, 2vw, 18px)", fontSize: "clamp(8px, 1.5vw, 11px)", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(240,240,240,0.4)", fontFamily: "sans-serif" }}>
            Only In Cinemas &nbsp;·&nbsp; July 31, 2026
          </motion.p>

          {/* Buttons */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="pointer-events-auto"
            style={{ marginTop: "clamp(24px, 5vw, 40px)", display: "flex", flexDirection: "column", alignItems: "center", gap: "clamp(10px, 2vw, 16px)", width: "100%" }}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(232,23,44,0.5)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => showToast("Tickets Available!", "Book your seats for July 31, 2026")}
              style={{ padding: "clamp(12px, 2.5vw, 18px) clamp(28px, 8vw, 52px)", background: "var(--red)", color: "#fff", fontSize: "clamp(10px, 1.5vw, 12px)", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "sans-serif", border: "none", cursor: "pointer", width: "clamp(200px, 60vw, 320px)" }}>
              Get Tickets Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, borderColor: "rgba(232,23,44,0.7)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById("trailers")?.scrollIntoView({ behavior: "smooth" })}
              style={{ padding: "clamp(10px, 2vw, 18px) clamp(28px, 8vw, 52px)", background: "transparent", border: "1px solid rgba(232,23,44,0.35)", color: "rgba(240,240,240,0.7)", fontSize: "clamp(10px, 1.5vw, 12px)", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "sans-serif", cursor: "pointer", width: "clamp(200px, 60vw, 320px)" }}>
              Watch Trailer
            </motion.button>
          </motion.div>

          {/* Badges */}
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{ marginTop: "clamp(16px, 3vw, 40px)", display: "flex", gap: "clamp(6px, 1.5vw, 12px)", flexWrap: "wrap", justifyContent: "center" }}>
            {["PG-13", "IMAX", "4DX", "Dolby Cinema"].map(b => (
              <span key={b} style={{ fontSize: "clamp(7px, 1.2vw, 9px)", letterSpacing: "0.3em", textTransform: "uppercase", padding: "5px 10px", border: "1px solid rgba(240,240,240,0.12)", color: "rgba(240,240,240,0.3)", fontFamily: "sans-serif" }}>
                {b}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Footer bar */}
        <div className="absolute inset-x-0 bottom-0 z-10" style={{ padding: "0 clamp(16px, 5vw, 40px) 16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/spider-logo.png" alt="Spider-Man"
                style={{ width: 22, height: 22, objectFit: "contain", filter: "drop-shadow(0 0 6px rgba(232,23,44,0.8))" }} />
              <span style={{ fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(240,240,240,0.25)", fontFamily: "sans-serif" }}>
                Spider-Man
              </span>
            </div>
            <p style={{ fontSize: 8, color: "rgba(240,240,240,0.12)", fontFamily: "sans-serif" }}>
              © 2026 Marvel Characters, Inc. Fan tribute.
            </p>
            <div className="hidden sm:flex" style={{ gap: 20 }}>
              {[
                { label: "Privacy",  msg: "Privacy Policy — This is a fan tribute site. No personal data is collected." },
                { label: "Terms",    msg: "Terms of Use — Fan content. Not affiliated with Marvel Studios." },
                { label: "Contact",  msg: "Contact — spidermanfan@marvel2026.com" },
              ].map(({ label, msg }) => (
                <button key={label}
                  onClick={() => showToast(label, msg)}
                  style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(240,240,240,0.18)", fontFamily: "sans-serif", background: "none", border: "none", cursor: "pointer" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--red)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(240,240,240,0.18)")}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
