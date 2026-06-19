"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL  = 277;
const PAD    = (n: number) => String(n).padStart(3, "0");
const FRAME  = (i: number) => `/footer section/ezgif-frame-${PAD(i + 1)}.jpg`;

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const framesRef    = useRef<HTMLImageElement[]>([]);
  const frameObj     = useRef({ idx: 0 });
  const ctxRef       = useRef<CanvasRenderingContext2D | null>(null);

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

    // Load all frames
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
    <>
      {/* Scroll container — 500vh gives a slow cinematic scrub */}
      <div ref={containerRef} style={{ height: "500vh", position: "relative" }}>
        <div className="sticky top-0 overflow-hidden" style={{ height: "100vh" }}>

          {/* Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          {/* Dark vignette */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(4,6,8,0.75) 100%)" }} />

          {/* Top fade from previous section */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#040608] to-transparent pointer-events-none" />

          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#020304] to-transparent pointer-events-none" />

          {/* Cinematic bars */}
          <div className="absolute inset-x-0 top-0 h-12 pointer-events-none" style={{ background: "rgba(0,0,0,0.55)" }} />
          <div className="absolute inset-x-0 bottom-0 h-12 pointer-events-none" style={{ background: "rgba(0,0,0,0.55)" }} />

          {/* Web grid */}
          <div className="absolute inset-0 web-bg opacity-10 pointer-events-none" />

          {/* Centre text overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-6">
            <p className="text-[9px] tracking-[0.8em] uppercase mb-4" style={{ color: "var(--red)", fontFamily: "sans-serif" }}>
              Marvel Studios
            </p>
            <h2 className="font-black uppercase leading-none" style={{ fontFamily: "sans-serif" }}>
              <span className="block" style={{ fontSize: "clamp(40px, 8vw, 96px)", color: "#fff", letterSpacing: "-0.02em", textShadow: "0 0 80px rgba(232,23,44,0.4)" }}>
                SPIDER-MAN
              </span>
              <span className="block italic mt-2" style={{ fontSize: "clamp(16px, 3vw, 36px)", color: "var(--red)", letterSpacing: "0.12em", textShadow: "0 0 50px rgba(232,23,44,0.7)" }}>
                BRAND NEW DAY
              </span>
            </h2>
            <p className="mt-6 text-xs tracking-[0.4em] uppercase" style={{ color: "rgba(240,240,240,0.35)", fontFamily: "sans-serif" }}>
              Only In Cinemas · July 31, 2026
            </p>
          </div>

          {/* Bottom footer bar */}
          <div className="absolute inset-x-0 bottom-0 z-10" style={{ padding: "0 40px 20px" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/spider-logo.png" alt="Spider-Man"
                  style={{ width: 28, height: 28, objectFit: "contain", filter: "drop-shadow(0 0 6px rgba(232,23,44,0.8))" }} />
                <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: "rgba(240,240,240,0.3)", fontFamily: "sans-serif" }}>
                  Spider-Man
                </span>
              </div>

              <p className="text-[10px]" style={{ color: "rgba(240,240,240,0.15)", fontFamily: "sans-serif" }}>
                © 2026 Marvel Characters, Inc. Fan tribute.
              </p>

              <div className="flex gap-6">
                {["Privacy", "Terms", "Contact"].map(l => (
                  <a key={l} href="#"
                    className="text-[10px] tracking-[0.2em] uppercase transition-colors duration-300"
                    style={{ color: "rgba(240,240,240,0.2)", fontFamily: "sans-serif" }}
                    onMouseEnter={e => ((e.target as HTMLElement).style.color = "var(--red)")}
                    onMouseLeave={e => ((e.target as HTMLElement).style.color = "rgba(240,240,240,0.2)")}>
                    {l}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
