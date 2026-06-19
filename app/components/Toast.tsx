"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type ToastMsg = { id: number; text: string; sub?: string };

let _id = 0;
export function showToast(text: string, sub?: string) {
  window.dispatchEvent(new CustomEvent("spidey-toast", { detail: { text, sub } }));
}

export default function Toast() {
  const [toasts, setToasts] = useState<ToastMsg[]>([]);

  useEffect(() => {
    const h = (e: Event) => {
      const { text, sub } = (e as CustomEvent).detail;
      const id = ++_id;
      setToasts(prev => [...prev, { id, text, sub }]);
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3400);
    };
    window.addEventListener("spidey-toast", h);
    return () => window.removeEventListener("spidey-toast", h);
  }, []);

  return (
    <div style={{ position: "fixed", bottom: 28, right: 24, zIndex: 99999, display: "flex", flexDirection: "column", gap: 10, pointerEvents: "none" }}>
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div key={t.id}
            initial={{ opacity: 0, x: 60, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.92 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: "#0d0e10",
              border: "1px solid rgba(232,23,44,0.35)",
              borderLeft: "3px solid #e8172c",
              padding: "12px 18px",
              minWidth: 240,
              maxWidth: 320,
              boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 0 20px rgba(232,23,44,0.08)",
              pointerEvents: "auto",
            }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/spider-logo.png" alt="" style={{ width: 18, height: 18, objectFit: "contain", filter: "drop-shadow(0 0 4px rgba(232,23,44,0.8))", flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#fff", fontFamily: "sans-serif", letterSpacing: "0.01em" }}>{t.text}</p>
                {t.sub && <p style={{ fontSize: 10, color: "rgba(240,240,240,0.4)", fontFamily: "sans-serif", marginTop: 2, letterSpacing: "0.02em" }}>{t.sub}</p>}
              </div>
            </div>
            {/* Progress bar */}
            <motion.div
              initial={{ scaleX: 1 }} animate={{ scaleX: 0 }}
              transition={{ duration: 3.2, ease: "linear" }}
              style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "rgba(232,23,44,0.5)", transformOrigin: "left" }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
