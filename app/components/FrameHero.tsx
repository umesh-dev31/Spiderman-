"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FIRST_FRAME = 67;
const LAST_FRAME  = 200;
const TOTAL       = LAST_FRAME - FIRST_FRAME + 1;
const PAD = (n: number) => String(n).padStart(3, "0");
const URL = (i: number) => `/frames/ezgif-frame-${PAD(i)}.jpg`;

const CAPTIONS = [
  { at: 0.05, text: "Everyone forgot.", sub: "His name. His face. His sacrifice." },
  { at: 0.28, text: "A new identity.", sub: "A new beginning. A brand new day." },
  { at: 0.52, text: "But the city still needs him.", sub: "And he's not done yet." },
  { at: 0.76, text: "The greatest chapter", sub: "begins where the last one ended." },
];

const RELEASE = new Date("2026-07-31T00:00:00");

function useHeroCountdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = RELEASE.getTime() - Date.now();
      if (diff <= 0) return;
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function FrameHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const titleRef     = useRef<HTMLDivElement>(null);
  const timerRef     = useRef<HTMLDivElement>(null);
  const captionRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const framesRef    = useRef<HTMLImageElement[]>([]);
  const frameObj     = useRef({ idx: 0 });
  const ctxRef       = useRef<CanvasRenderingContext2D | null>(null);
  const { d, h, m, s } = useHeroCountdown();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    function resize() {
      if (!canvas || !ctxRef.current) return;
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      draw(frameObj.current.idx);
    }

    function draw(raw: number) {
      const img = framesRef.current[Math.round(raw)];
      if (!img?.complete || img.naturalWidth === 0 || !canvas || !ctxRef.current) return;
      ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
      const s = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
      const w = img.naturalWidth * s, h = img.naturalHeight * s;
      ctxRef.current.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
    }

    for (let i = FIRST_FRAME; i <= LAST_FRAME; i++) {
      const img = new Image();
      img.src = URL(i);
      img.onload = () => { if (i === FIRST_FRAME) { resize(); draw(0); } };
      framesRef.current.push(img);
    }

    window.addEventListener("resize", resize);
    resize();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
      },
    });

    // Frame scrub
    tl.to(frameObj.current, {
      idx: TOTAL - 1,
      ease: "none",
      duration: 1,
      onUpdate: () => draw(frameObj.current.idx),
    }, 0);

    // Title fades out as scroll begins
    tl.to(titleRef.current, { opacity: 0, y: -40, duration: 0.08 }, 0.06);

    // Captions
    captionRefs.current.forEach((el, i) => {
      if (!el) return;
      const start = CAPTIONS[i].at;
      tl.fromTo(el, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.07 }, start);
      tl.to(el, { opacity: 0, y: -20, duration: 0.06 }, start + 0.16);
    });

    // Timer fades in after ~half the scroll (3rd "screen")
    if (timerRef.current) {
      tl.fromTo(timerRef.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.08 },
        0.5
      );
    }

    return () => {
      window.removeEventListener("resize", resize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} style={{ height: "600vh", position: "relative" }}>
      <div className="sticky top-0 w-full overflow-hidden" style={{ height: "100vh" }}>

        {/* Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Dark cinematic vignette */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(4,6,8,0.8) 100%)" }} />

        {/* Top bar */}
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />

        {/* Bottom bar */}
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#040608] to-transparent pointer-events-none" />

        {/* Cinematic letterbox — top bar */}
        <div className="absolute inset-x-0 top-0 h-14 pointer-events-none" style={{ background: "rgba(0,0,0,0.6)" }} />

        {/* Cinematic letterbox — bottom ticker bar */}
        <div className="absolute inset-x-0 bottom-0 h-14 pointer-events-none overflow-hidden"
          style={{ background: "#000", borderTop: "1px solid rgba(232,23,44,0.25)" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            whiteSpace: "nowrap",
            animation: "tickerScroll 18s linear infinite",
          }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "clamp(20px, 4vw, 60px)",
                paddingRight: "clamp(20px, 4vw, 60px)",
                fontSize: "clamp(10px, 1vw, 13px)",
                fontFamily: "sans-serif",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "rgba(240,240,240,0.85)",
                fontWeight: 700,
              }}>
                <span style={{ color: "rgba(232,23,44,0.7)", fontSize: "8px" }}>◆</span>
                <span>Spider-Man: Brand New Day</span>
                <span style={{ color: "rgba(232,23,44,0.5)" }}>—</span>
                <span style={{ color: "var(--red)" }}>July 31, 2026</span>
                <span style={{ color: "rgba(232,23,44,0.5)" }}>—</span>
                <span style={{ color: "rgba(240,240,240,0.4)", fontWeight: 400 }}>Only In Cinemas</span>
                <span style={{ color: "rgba(232,23,44,0.7)", fontSize: "8px" }}>◆</span>
              </span>
            ))}
          </div>
        </div>

        {/* Release countdown — top right, hidden until 3rd scroll */}
        <div ref={timerRef} className="absolute pointer-events-none"
          style={{ top: "clamp(72px, 10vh, 110px)", right: "clamp(24px, 5vw, 72px)", opacity: 0 }}>
          <p style={{ fontSize: 8, letterSpacing: "0.6em", textTransform: "uppercase", color: "rgba(232,23,44,0.55)", fontFamily: "sans-serif", textAlign: "right", marginBottom: 10 }}>
            Releasing In
          </p>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
            {[{ v: d, l: "D" }, { v: h, l: "H" }, { v: m, l: "M" }, { v: s, l: "S" }].map(({ v, l }, i, arr) => (
              <div key={l} style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    fontSize: "clamp(22px, 3.5vw, 38px)",
                    fontWeight: 900,
                    fontFamily: "sans-serif",
                    color: "#fff",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    textShadow: "0 0 30px rgba(232,23,44,0.3)",
                    fontVariantNumeric: "tabular-nums",
                    padding: "8px 10px 6px",
                    background: "rgba(4,6,8,0.55)",
                    backdropFilter: "blur(10px)",
                    borderTop: "1px solid rgba(232,23,44,0.4)",
                    minWidth: "clamp(42px, 5vw, 58px)",
                  }}>
                    {String(v).padStart(2, "0")}
                  </div>
                  <div style={{ fontSize: 7, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(232,23,44,0.4)", fontFamily: "sans-serif", marginTop: 5 }}>
                    {l}
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <span style={{ fontSize: "clamp(14px, 2.5vw, 22px)", color: "rgba(232,23,44,0.3)", fontWeight: 300, paddingTop: 6, fontFamily: "sans-serif" }}>:</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Red scan line */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.025]">
          <div className="w-full h-32 bg-gradient-to-b from-transparent via-red-600 to-transparent"
            style={{ animation: "scanline 5s linear infinite" }} />
        </div>

        {/* Web grid */}
        <div className="absolute inset-0 web-bg pointer-events-none opacity-30" />

        {/* ── INITIAL TITLE (fades out on scroll) ── */}
        <div ref={titleRef} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <p className="text-[10px] tracking-[0.8em] uppercase mb-6"
            style={{ color: "var(--red)", fontFamily: "sans-serif" }}>
            Marvel Studios Presents
          </p>
          <h1 className="font-black uppercase leading-none" style={{ fontFamily: "sans-serif" }}>
            <span className="block text-6xl md:text-8xl lg:text-9xl"
              style={{
                color: "#fff",
                letterSpacing: "-0.02em",
                textShadow: "0 0 80px rgba(232,23,44,0.5), 0 4px 40px rgba(0,0,0,0.8)",
              }}>
              SPIDER-MAN
            </span>
            <span className="block text-3xl md:text-5xl lg:text-6xl mt-3 italic"
              style={{
                color: "var(--red)",
                letterSpacing: "0.08em",
                textShadow: "0 0 60px rgba(232,23,44,0.7)",
              }}>
              BRAND NEW DAY
            </span>
          </h1>
          <div className="mt-8 flex items-center gap-4">
            <div className="h-px w-16" style={{ background: "rgba(232,23,44,0.5)" }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "rgba(240,240,240,0.5)", fontFamily: "sans-serif" }}>
              In Cinemas July 31, 2026
            </span>
            <div className="h-px w-16" style={{ background: "rgba(232,23,44,0.5)" }} />
          </div>
        </div>

        {/* Scroll captions — left side, small */}
        <div className="absolute pointer-events-none"
          style={{ left: "clamp(24px, 5vw, 72px)", bottom: "clamp(80px, 12vh, 130px)", width: "clamp(280px, 38vw, 520px)" }}>
          {CAPTIONS.map((c, i) => (
            <div key={c.text} ref={(el) => { captionRefs.current[i] = el; }}
              className="absolute bottom-0" style={{ opacity: 0, left: 0 }}>
              {/* Small red accent line */}
              <div style={{ width: 28, height: 2, background: "var(--red)", marginBottom: 10, opacity: 0.8 }} />
              <p style={{
                fontSize: "clamp(15px, 1.8vw, 22px)",
                fontWeight: 400,
                fontStyle: "italic",
                fontFamily: "Georgia, serif",
                color: "rgba(240,240,240,0.9)",
                letterSpacing: "0.01em",
                lineHeight: 1.4,
                textShadow: "0 2px 20px rgba(0,0,0,1), 0 0 40px rgba(0,0,0,0.8)",
              }}>
                {c.text}
              </p>
              {c.sub && (
                <p style={{
                  marginTop: 8,
                  fontSize: "clamp(8px, 0.9vw, 11px)",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "rgba(232,23,44,0.85)",
                  fontFamily: "sans-serif",
                  textShadow: "0 0 16px rgba(232,23,44,0.5)",
                }}>
                  {c.sub}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-[9px] tracking-[0.5em] uppercase" style={{ color: "var(--red)", fontFamily: "sans-serif" }}>Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#e8172c] to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  );
}

