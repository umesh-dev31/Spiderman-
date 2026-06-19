"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

function useCountdown(target: Date) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    function update() {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return;
      setTime({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
}

const RELEASE = new Date("2026-07-31T00:00:00");

function TimeUnit({ val, label }: { val: number; label: string }) {
  const display = String(val).padStart(2, "0");
  const [prev, setPrev] = useState(display);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (display !== prev) {
      setFlip(true);
      const t = setTimeout(() => { setPrev(display); setFlip(false); }, 250);
      return () => clearTimeout(t);
    }
  }, [display, prev]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Card */}
      <div style={{
        position: "relative",
        width: "clamp(100px, 14vw, 180px)",
        overflow: "hidden",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}>
        {/* Red top bar */}
        <div style={{ position: "absolute", inset: "0 0 auto 0", height: 2, background: "var(--red)", zIndex: 2 }} />

        {/* Number */}
        <div style={{
          padding: "clamp(20px, 3vw, 40px) 0 clamp(16px, 2vw, 28px)",
          textAlign: "center",
          transform: flip ? "scaleY(0.88)" : "scaleY(1)",
          transition: "transform 0.15s ease",
        }}>
          <span style={{
            fontSize: "clamp(52px, 9vw, 110px)",
            fontWeight: 900,
            fontFamily: "sans-serif",
            color: "#fff",
            letterSpacing: "-0.05em",
            lineHeight: 1,
            display: "block",
            textShadow: "0 0 60px rgba(232,23,44,0.25), 0 2px 20px rgba(0,0,0,0.8)",
            fontVariantNumeric: "tabular-nums",
          }}>
            {display}
          </span>
        </div>

        {/* Horizontal split line across middle */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: 0, right: 0,
          height: 1,
          background: "rgba(0,0,0,0.6)",
          zIndex: 3,
          boxShadow: "0 0 0 0.5px rgba(255,255,255,0.04)",
        }} />

        {/* Subtle inner glow */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(232,23,44,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Label */}
      <p style={{
        marginTop: 14,
        fontSize: 9,
        letterSpacing: "0.55em",
        textTransform: "uppercase",
        color: "rgba(232,23,44,0.45)",
        fontFamily: "sans-serif",
      }}>
        {label}
      </p>
    </div>
  );
}

function Colon() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingBottom: 32, alignSelf: "center" }}>
      <div style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(232,23,44,0.4)" }} />
      <div style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(232,23,44,0.4)" }} />
    </div>
  );
}

export default function QuoteSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const time = useCountdown(RELEASE);

  const units = [
    { label: "Days",    val: time.days },
    { label: "Hours",   val: time.hours },
    { label: "Minutes", val: time.minutes },
    { label: "Seconds", val: time.seconds },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: "#040608" }}>

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(232,23,44,0.08) 0%, transparent 65%)" }} />

      {/* Diagonal web lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.035 }} preserveAspectRatio="xMidYMid slice">
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={i} x1={`${i * 12}%`} y1="0" x2={`${30 + i * 12}%`} y2="100%"
            stroke="#e8172c" strokeWidth="0.8" />
        ))}
      </svg>

      <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(232,23,44,0.25), transparent)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-center">

        {/* Label */}
        <motion.p initial={{ opacity: 0, y: -10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ fontSize: 10, letterSpacing: "0.8em", textTransform: "uppercase", color: "rgba(232,23,44,0.5)", fontFamily: "sans-serif", marginBottom: 52 }}>
          Releasing In
        </motion.p>

        {/* Timer */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: "clamp(6px, 1.5vw, 16px)", marginBottom: 80 }}>
          {units.map((u, i) => (
            <div key={u.label} style={{ display: "flex", alignItems: "flex-start", gap: "clamp(6px, 1.5vw, 16px)" }}>
              <TimeUnit val={u.val} label={u.label} />
              {i < units.length - 1 && <Colon />}
            </div>
          ))}
        </motion.div>

        {/* Quote block */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          style={{ maxWidth: 860, margin: "0 auto", textAlign: "left", position: "relative", padding: "0 24px" }}>

          {/* Decorative giant quote mark */}
          <div aria-hidden style={{
            position: "absolute", top: -20, left: 0,
            fontSize: "clamp(100px, 18vw, 220px)",
            fontFamily: "Georgia, serif",
            color: "rgba(232,23,44,0.1)",
            lineHeight: 1,
            fontWeight: 900,
            userSelect: "none",
            pointerEvents: "none",
          }}>
            "
          </div>

          {/* Line 1 — bold white */}
          <motion.p initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.45 }}
            style={{
              fontSize: "clamp(26px, 4.5vw, 62px)",
              fontWeight: 700,
              fontFamily: "sans-serif",
              color: "#fff",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginBottom: 6,
            }}>
            The world forgot Peter Parker.
          </motion.p>

          {/* Line 2 — huge bold red */}
          <motion.p initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.58 }}
            style={{
              fontSize: "clamp(32px, 6vw, 80px)",
              fontWeight: 900,
              fontFamily: "sans-serif",
              color: "var(--red)",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              marginBottom: 6,
              textShadow: "0 0 60px rgba(232,23,44,0.45)",
            }}>
            But Spider-Man
          </motion.p>

          {/* Line 3 — light weight white */}
          <motion.p initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.71 }}
            style={{
              fontSize: "clamp(24px, 3.8vw, 54px)",
              fontWeight: 300,
              fontFamily: "sans-serif",
              color: "rgba(240,240,240,0.75)",
              letterSpacing: "-0.01em",
              lineHeight: 1.15,
            }}>
            remembers everything."
          </motion.p>

          {/* Bottom rule + attribution */}
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 40 }}>
            <div style={{ width: 40, height: 1, background: "rgba(232,23,44,0.4)" }} />
            <p style={{ fontSize: 10, letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(232,23,44,0.4)", fontFamily: "sans-serif" }}>
              Spider-Man: Brand New Day &nbsp;·&nbsp; July 31, 2026
            </p>
          </motion.div>
        </motion.div>
      </div>

      <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(232,23,44,0.2), transparent)" }} />
    </section>
  );
}
