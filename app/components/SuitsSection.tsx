"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const CAST = [
  { n: "01", actor: "Tom Holland",    role: "Peter Parker / Spider-Man",  note: "Returning for his fourth solo outing — this time with no safety net." },
  { n: "02", actor: "Zendaya",       role: "MJ",                         note: "She doesn't know his name. But something about him feels achingly familiar." },
  { n: "03", actor: "Jacob Batalon", role: "Ned Leeds",                  note: "A stranger on the street. Or was he once something more?" },
  { n: "04", actor: "Mark Ruffalo",  role: "Bruce Banner / The Hulk",    note: "He remembers everything about the spell. And he has never forgiven himself." },
];

const CREW = [
  { name: "Destin Daniel Cretton", role: "Director" },
  { name: "Amy Pascal",            role: "Producer" },
  { name: "Kevin Feige",           role: "Executive Producer" },
  { name: "Michael Giacchino",     role: "Composer" },
];

export default function SuitsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: "#040608" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 80px, rgba(255,255,255,0.007) 81px)" }} />
      <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(232,23,44,0.25), transparent)" }} />

      <div className="relative z-10 py-28">
        {/* Header */}
        <div className="mb-16" style={{ paddingLeft: "clamp(24px, 5vw, 80px)", paddingRight: "clamp(24px, 5vw, 80px)" }}>
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <motion.p initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}
                style={{ fontSize: 10, letterSpacing: "0.7em", textTransform: "uppercase", color: "var(--red)", fontFamily: "sans-serif", marginBottom: 14 }}>
                The Cast
              </motion.p>
              <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.85, delay: 0.08 }}
                style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 900, fontFamily: "sans-serif", color: "#fff", letterSpacing: "-0.03em", lineHeight: 0.92 }}>
                Who<br /><span className="red-gradient">Returns.</span>
              </motion.h2>
            </div>
          </div>
        </div>

        {/* Horizontal cast cards */}
        <div
          className="flex gap-4 overflow-x-auto pb-6"
          style={{
            paddingLeft: "clamp(24px, 5vw, 80px)",
            paddingRight: "clamp(24px, 5vw, 80px)",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {CAST.map((c, i) => (
            <motion.div
              key={c.actor}
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 * i }}
              className="group flex-shrink-0"
              style={{
                scrollSnapAlign: "start",
                width: "clamp(260px, 28vw, 360px)",
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)",
                padding: "36px 32px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top accent */}
              <div className="absolute inset-x-0 top-0 h-0.5"
                style={{ background: "linear-gradient(90deg, var(--red), transparent)", opacity: 0.5 }} />

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(232,23,44,0.08) 0%, transparent 70%)" }} />

              {/* Number */}
              <div style={{ fontSize: 10, fontWeight: 700, fontFamily: "sans-serif", letterSpacing: "0.25em", color: "rgba(232,23,44,0.3)", marginBottom: 28 }}>
                {c.n}
              </div>

              {/* Actor name */}
              <h3 style={{ fontSize: "clamp(22px, 2.8vw, 34px)", fontWeight: 900, fontFamily: "sans-serif", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 10 }}>
                {c.actor}
              </h3>

              {/* Role */}
              <p style={{ fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(232,23,44,0.5)", fontFamily: "sans-serif", marginBottom: 24 }}>
                {c.role}
              </p>

              {/* Note */}
              <p style={{ fontSize: 12, color: "rgba(240,240,240,0.32)", fontFamily: "sans-serif", lineHeight: 1.85 }}>
                {c.note}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Scroll hint */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center gap-3 mt-6"
          style={{ paddingLeft: "clamp(24px, 5vw, 80px)" }}>
          <div style={{ height: 1, width: 40, background: "rgba(232,23,44,0.3)" }} />
          <span style={{ fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(240,240,240,0.2)", fontFamily: "sans-serif" }}>
            Scroll to explore
          </span>
        </motion.div>

        {/* Crew */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 pt-16"
          style={{
            borderTop: "1px solid rgba(232,23,44,0.08)",
            paddingLeft: "clamp(24px, 5vw, 80px)",
            paddingRight: "clamp(24px, 5vw, 80px)",
          }}>
          <p style={{ fontSize: 9, letterSpacing: "0.7em", textTransform: "uppercase", color: "rgba(232,23,44,0.4)", fontFamily: "sans-serif", marginBottom: 20, textAlign: "center" }}>
            The Crew
          </p>
          <div className="flex flex-wrap justify-center gap-x-16 gap-y-8">
            {CREW.map(cr => (
              <div key={cr.name} className="text-center">
                <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(240,240,240,0.7)", fontFamily: "sans-serif" }}>{cr.name}</div>
                <div style={{ fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(232,23,44,0.35)", fontFamily: "sans-serif", marginTop: 5 }}>{cr.role}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(232,23,44,0.2), transparent)" }} />
    </section>
  );
}
