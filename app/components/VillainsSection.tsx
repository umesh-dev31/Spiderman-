"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const VILLAINS = [
  { n: "01", name: "Green Goblin",  threat: "EXTREME",  level: 100, color: "#7cbb00", desc: "Norman Osborn's fractured psyche is the world's most dangerous variable. And he still has the glider." },
  { n: "02", name: "Doc Ock",       threat: "CRITICAL",  level: 88,  color: "#e8172c", desc: "Eight arms, one focus: scientific precision. He has never failed an experiment. Peter was his first." },
  { n: "03", name: "Venom",         threat: "EXTREME",   level: 97,  color: "#a855f7", desc: "The symbiote remembers every secret Peter forgot it knew. And it is very, very angry." },
  { n: "04", name: "Electro",       threat: "HIGH",      level: 75,  color: "#facc15", desc: "Maximum Carnage is nothing compared to maximum voltage. He can feel every power grid in the city." },
  { n: "05", name: "Sandman",       threat: "HIGH",      level: 70,  color: "#d97706", desc: "Flint Marko fights for the daughter who doesn't know his name. That makes him unpredictable." },
  { n: "06", name: "Lizard",        threat: "MODERATE",  level: 55,  color: "#22c55e", desc: "Dr. Connors lost his arm trying to heal. He lost his mind in the process. Science always has a cost." },
];

export default function VillainsSection() {
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: "#040608" }}>
      <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(232,23,44,0.25), transparent)" }} />

      <div className="relative z-10 py-28">
        {/* Header */}
        <div className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <motion.p initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}
                style={{ fontSize: 10, letterSpacing: "0.7em", textTransform: "uppercase", color: "var(--red)", fontFamily: "sans-serif", marginBottom: 14 }}>
                The Opposition
              </motion.p>
              <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.85, delay: 0.08 }}
                style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 900, fontFamily: "sans-serif", color: "#fff", letterSpacing: "-0.03em", lineHeight: 0.92 }}>
                They<br />Remember<br /><span className="red-gradient">Everything.</span>
              </motion.h2>
            </div>
            <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.3 }}
              style={{ maxWidth: 300, fontSize: 12, lineHeight: 1.9, color: "rgba(240,240,240,0.3)", fontFamily: "sans-serif" }}>
              While the world forgot Peter Parker, they did not. Six threats. One city. No second chances.
            </motion.p>
          </div>
        </div>

        {/* Horizontal scroll cards */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-6"
          style={{
            paddingLeft: "clamp(24px, 5vw, 80px)",
            paddingRight: "clamp(24px, 5vw, 80px)",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>{`.villain-scroll::-webkit-scrollbar { display: none; }`}</style>

          {VILLAINS.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.07 * i }}
              className="group flex-shrink-0"
              style={{
                scrollSnapAlign: "start",
                width: "clamp(280px, 30vw, 380px)",
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)",
                padding: "36px 32px",
                position: "relative",
                overflow: "hidden",
                cursor: "default",
              }}
            >
              {/* Top accent line — villain color */}
              <div className="absolute inset-x-0 top-0 h-0.5 transition-opacity duration-500"
                style={{ background: v.color, opacity: 0.5 }}
                />
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${v.color}12 0%, transparent 70%)` }} />

              {/* Number */}
              <div style={{ fontSize: 10, fontWeight: 700, fontFamily: "sans-serif", letterSpacing: "0.25em", color: "rgba(255,255,255,0.15)", marginBottom: 28 }}>
                {v.n}
              </div>

              {/* Name */}
              <h3 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 900, fontFamily: "sans-serif", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 16 }}>
                {v.name}
              </h3>

              {/* Description */}
              <p style={{ fontSize: 12, color: "rgba(240,240,240,0.32)", fontFamily: "sans-serif", lineHeight: 1.85, marginBottom: 36, minHeight: 80 }}>
                {v.desc}
              </p>

              {/* Threat + bar */}
              <div style={{ marginTop: "auto" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.4em", textTransform: "uppercase", color: v.color, fontFamily: "sans-serif" }}>
                    {v.threat}
                  </span>
                  <span style={{ fontSize: 11, fontFamily: "sans-serif", color: "rgba(255,255,255,0.25)", letterSpacing: "0.05em" }}>
                    {v.level}<span style={{ fontSize: 9, color: "rgba(255,255,255,0.12)" }}>/100</span>
                  </span>
                </div>
                <div style={{ width: "100%", height: 2, background: "rgba(255,255,255,0.07)" }}>
                  <motion.div
                    initial={{ width: 0 }} animate={inView ? { width: `${v.level}%` } : {}}
                    transition={{ duration: 1.2, delay: 0.2 + 0.07 * i, ease: "easeOut" }}
                    style={{ height: "100%", background: v.color, boxShadow: `0 0 8px ${v.color}80` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll hint */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 0.6 }}
          className="flex items-center gap-3 px-6 md:px-12 mt-6"
          style={{ paddingLeft: "clamp(24px, 5vw, 80px)" }}>
          <div style={{ height: 1, width: 40, background: "rgba(232,23,44,0.3)" }} />
          <span style={{ fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(240,240,240,0.2)", fontFamily: "sans-serif" }}>
            Scroll to explore
          </span>
        </motion.div>
      </div>

      <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(232,23,44,0.2), transparent)" }} />
    </section>
  );
}
