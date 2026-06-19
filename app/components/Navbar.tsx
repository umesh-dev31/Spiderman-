"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINKS = ["Story", "Cast", "Trailer", "Tickets"];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    ScrollTrigger.create({
      start: "top -60",
      onUpdate: (self) => {
        if (!navRef.current) return;
        if (self.scroll() > 60) {
          navRef.current.style.background = "rgba(4,6,8,0.94)";
          navRef.current.style.borderBottomColor = "rgba(232,23,44,0.2)";
        } else {
          navRef.current.style.background = "transparent";
          navRef.current.style.borderBottomColor = "transparent";
        }
      },
    });
  }, []);

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-50 border-b transition-all duration-500"
      style={{ borderBottomColor: "transparent" }}
    >
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/spider-logo.png" alt="Spider-Man" style={{ width: 36, height: 36, objectFit: "contain", filter: "drop-shadow(0 0 8px rgba(232,23,44,0.8))" }} />
          </div>
          <div className="hidden md:block">
            <div className="text-[10px] tracking-[0.5em] uppercase font-light"
              style={{ color: "rgba(240,240,240,0.5)" }}>Spider-Man</div>
            <div className="text-[9px] tracking-[0.35em] uppercase"
              style={{ color: "var(--red)" }}>Brand New Day</div>
          </div>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-10">
          {LINKS.map((l) => (
            <a key={l} href="#"
              className="text-xs tracking-[0.25em] uppercase transition-colors duration-300"
              style={{ color: "rgba(240,240,240,0.4)" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--red)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(240,240,240,0.4)")}
            >{l}</a>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(232,23,44,0.35)" }}
          whileTap={{ scale: 0.96 }}
          className="text-xs tracking-[0.25em] uppercase px-6 py-2.5 transition-all duration-300"
          style={{ background: "var(--red)", color: "#fff" }}
        >
          Get Tickets
        </motion.button>
      </div>
    </motion.nav>
  );
}
