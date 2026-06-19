"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Loader() {
  const [phase, setPhase] = useState<"hold" | "split" | "done">("hold");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("split"), 1600);
    const t2 = setTimeout(() => setPhase("done"),  2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === "done") return null;

  const splitting = phase === "split";

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none" }}>

      {/* ── LEFT PANEL ── */}
      <motion.div
        animate={{ x: splitting ? "-100%" : "0%" }}
        transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: "absolute",
          top: 0, bottom: 0, left: 0, right: "50%",
          background: "#040608",
          overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "flex-end",
        }}
      >
        <motion.img
          src="/left%20intro%20logo%20(2).PNG"
          alt=""
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: "clamp(140px, 20vw, 260px)",
            width: "auto",
            objectFit: "contain",
            filter: "grayscale(0%) drop-shadow(0 0 40px rgba(232,23,44,0.7))",
            flexShrink: 0,
            animation: "colorReveal 0.9s ease 0.5s both",
          }}
        />
      </motion.div>

      {/* ── RIGHT PANEL ── */}
      <motion.div
        animate={{ x: splitting ? "100%" : "0%" }}
        transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: "absolute",
          top: 0, bottom: 0, left: "50%", right: 0,
          background: "#040608",
          overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "flex-start",
        }}
      >
        <motion.img
          src="/right%20intro%20logo.PNG"
          alt=""
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: "clamp(140px, 20vw, 260px)",
            width: "auto",
            objectFit: "contain",
            filter: "grayscale(0%) drop-shadow(0 0 40px rgba(232,23,44,0.7))",
            flexShrink: 0,
            animation: "colorReveal 0.9s ease 0.5s both",
          }}
        />
      </motion.div>

      {/* Vertical seam line */}
      <motion.div
        animate={{ opacity: splitting ? 0 : 1 }}
        transition={{ duration: 0.25 }}
        style={{
          position: "absolute",
          top: 0, bottom: 0, left: "50%",
          width: 1,
          background: "linear-gradient(180deg, transparent, rgba(232,23,44,0.7) 30%, rgba(232,23,44,0.7) 70%, transparent)",
        }}
      />

      {/* Red centre glow */}
      <motion.div
        animate={{ opacity: splitting ? 0 : 1 }}
        transition={{ duration: 0.35 }}
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "28vw", height: "55vh",
          background: "radial-gradient(ellipse, rgba(232,23,44,0.22) 0%, transparent 65%)",
          filter: "blur(28px)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
