"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TRAILERS = [
  {
    id: "uZAwsh-unZ8",
    label: "Official Trailer",
    title: "SPIDER-MAN: BRAND NEW DAY",
    sub: "New Trailer",
  },
  {
    id: "8TZMtslA3UY",
    label: "Trailer 2",
    title: "SPIDER-MAN: BRAND NEW DAY",
    sub: "Second Look",
  },
];

export default function TrailersSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="trailers" ref={ref} className="relative overflow-hidden" style={{ background: "#040608" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 80px, rgba(232,23,44,0.008) 81px)" }} />
      <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(232,23,44,0.3), transparent)" }} />

      <div className="relative z-10 max-w-7xl mx-auto" style={{ padding: "clamp(40px, 7vw, 112px) clamp(16px, 4vw, 48px)" }}>

        {/* Header */}
        <div style={{ marginBottom: "clamp(24px, 5vw, 64px)" }}>
          <motion.p initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}
            style={{ fontSize: 10, letterSpacing: "0.5em", textTransform: "uppercase", color: "var(--red)", fontFamily: "sans-serif", marginBottom: 10 }}>
            Marvel Studios
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.85, delay: 0.08 }}
            style={{ fontSize: "clamp(32px, 6vw, 80px)", fontWeight: 900, fontFamily: "sans-serif", color: "#fff", letterSpacing: "-0.03em", lineHeight: 0.92 }}>
            Watch the<br /><span className="red-gradient">Trailers.</span>
          </motion.h2>
        </div>

        {/* Videos grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "clamp(20px, 4vw, 24px)" }}>
          {TRAILERS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.12 * i }}
              className="group"
              style={{ position: "relative" }}
            >
              {/* Video container — 16:9 */}
              <div style={{
                position: "relative",
                paddingBottom: "56.25%",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.06)",
                borderLeft: "2px solid rgba(232,23,44,0.4)",
              }}>
                {/* Red top accent */}
                <div style={{
                  position: "absolute", inset: "0 0 auto 0", height: 2, zIndex: 2,
                  background: "var(--red)", opacity: 0.7,
                }} />

                <iframe
                  src={`https://www.youtube.com/embed/${t.id}?rel=0&modestbranding=1&color=red`}
                  title={t.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    border: 0,
                  }}
                />
              </div>

              {/* Caption below */}
              <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 20, height: 1, background: "rgba(232,23,44,0.5)", flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(232,23,44,0.5)", fontFamily: "sans-serif", marginBottom: 2 }}>
                    {t.label}
                  </p>
                  <p style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(240,240,240,0.4)", fontFamily: "sans-serif" }}>
                    {t.sub}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(232,23,44,0.2), transparent)" }} />
    </section>
  );
}
