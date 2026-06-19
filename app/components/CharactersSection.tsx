"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CHARACTERS = [
  {
    id: "spiderman",
    name: "Spider-Man",
    realName: "Peter Parker",
    actor: "Tom Holland",
    role: "Peter Parker / Spider-Man",
    category: "HERO",
    img: "/characters/spiderman.png",
    desc: 'He is a crime-fighting hero in the Marvel universe. Peter Parker gained his powers by being bitten by a radioactive spider and follows the motto "With great power comes great responsibility."',
    color: "#e8172c",
    glow: "rgba(232,23,44,0.3)",
    imgScale: 0.80,
  },
  {
    id: "mj",
    name: "MJ",
    realName: 'Michelle "MJ" Jones',
    actor: "Zendaya",
    role: 'Michelle "MJ" Jones',
    category: "ALLY",
    img: "/characters/mj.png",
    desc: "Sharp, perceptive, and unafraid to say what others won't. MJ doesn't know Peter Parker — not anymore. But something lingers at the edge of her memory, like a word she can't quite pronounce.",
    color: "#c9880e",
    glow: "rgba(201,136,14,0.3)",
    imgScale: 0.80,
  },
  {
    id: "hulk",
    name: "Hulk",
    realName: "Bruce Banner",
    actor: "Mark Ruffalo",
    role: "Bruce Banner / Hulk",
    category: "AVENGER",
    img: "/characters/hulk.png",
    desc: "The world's foremost gamma radiation expert — and its most powerful living weapon. In Brand New Day, Banner may be the only Avenger willing to search for what everyone else has forgotten.",
    color: "#2aaa4a",
    glow: "rgba(42,170,74,0.3)",
    imgScale: 0.75,
  },
  {
    id: "ned",
    name: "Ned Leeds",
    realName: "Ned Leeds",
    actor: "Jacob Batalon",
    role: "Ned Leeds",
    category: "ALLY",
    img: "/characters/ned.png",
    desc: "Peter Parker's best friend — or at least, he was. In Brand New Day, fate has a way of pulling people back together, even when the universe has done everything it can to keep them apart.",
    color: "#3a7abf",
    glow: "rgba(58,122,191,0.3)",
    imgScale: 0.80,
  },
];

const SOCIALS = [
  { label: "Facebook", url: "https://www.facebook.com/MarvelStudios",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  { label: "Instagram", url: "https://www.instagram.com/marvelstudios",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  { label: "X", url: "https://x.com/MarvelStudios",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  { label: "YouTube", url: "https://www.youtube.com/@MarvelEntertainment",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon fill="#040608" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
];

const imgVariants = {
  enter:  (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit:   (dir: number) => ({ opacity: 0, x: dir > 0 ? -25 : 25 }),
};

const textVariants = {
  enter:  (dir: number) => ({ opacity: 0, y: dir > 0 ? 24 : -24 }),
  center: { opacity: 1, y: 0 },
  exit:   (dir: number) => ({ opacity: 0, y: dir > 0 ? -16 : 16 }),
};

export default function CharactersSection() {
  const [index, setIndex]         = useState(0);
  const [direction, setDirection] = useState(1);
  const [imgError, setImgError]   = useState<Record<string, boolean>>({});
  const [imgReady, setImgReady]   = useState(false);
  const [isMobile, setIsMobile]   = useState(false);
  const char = CHARACTERS[index];

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const h = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setImgReady(false); // hide immediately on switch
    setIndex(prev => (prev + dir + CHARACTERS.length) % CHARACTERS.length);
  }, []);

  // Reset visibility whenever index changes
  useEffect(() => { setImgReady(false); }, [index]);

  // Preload all images into browser cache so onLoad fires near-instantly
  useEffect(() => {
    CHARACTERS.forEach(c => {
      const img = new window.Image();
      img.src = c.img;
    });
  }, []);

  // Auto-advance every 2 seconds; resets when user navigates manually
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => go(1), 2000);
  }, [go]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const goManual = useCallback((dir: number) => {
    go(dir);
    startTimer(); // reset timer on manual nav
  }, [go, startTimer]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goManual(1);
      if (e.key === "ArrowLeft")  goManual(-1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [goManual]);

  // Render functions (not components) — avoids unmount/remount on parent re-render
  const charImgEl = !imgError[char.id] ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={char.img}
      alt={char.realName}
      onLoad={() => setImgReady(true)}
      onError={() => setImgError(prev => ({ ...prev, [char.id]: true }))}
      style={{
        height: `${(char.imgScale ?? 1) * 100}%`,
        width: `${(char.imgScale ?? 1) * 100}%`,
        objectFit: "contain",
        objectPosition: "bottom center",
        display: "block",
        filter: `drop-shadow(-20px 0 60px ${char.color}44)`,
        opacity: imgReady ? 1 : 0,
        transition: "opacity 0.25s ease",
      }}
    />
  ) : null;

  const navDotsEl = (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 20px" }}>
      {CHARACTERS.map((c, i) => (
        <button key={c.id}
          onClick={() => { const d = i > index ? 1 : -1; setDirection(d); setIndex(i); startTimer(); }}
          style={{ height: 3, width: i === index ? 28 : 8, background: i === index ? char.color : "rgba(255,255,255,0.2)", border: "none", cursor: "pointer", transition: "all 0.4s" }}
        />
      ))}
    </div>
  );

  if (isMobile) {
    return (
      <section id="cast" className="relative overflow-hidden" style={{ height: "100vh", background: "#040608", display: "flex", flexDirection: "column" }}>

        {/* Background glow */}
        <AnimatePresence>
          <motion.div key={`bg-${index}`} className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9 }}
            style={{ background: `radial-gradient(ellipse 100% 60% at 60% 20%, ${char.glow} 0%, transparent 70%)` }} />
        </AnimatePresence>
        <div className="absolute inset-0 web-bg opacity-10 pointer-events-none" />

        {/* ── TOP: Character image (55% of height) ── */}
        <div style={{ position: "relative", height: "55%", overflow: "hidden", flexShrink: 0 }}>
          {/* Right colour stripe */}
          <AnimatePresence>
            <motion.div key={`stripe-${index}`} className="absolute top-0 right-0 h-full pointer-events-none"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
              style={{ width: "14%", clipPath: "polygon(40% 0%, 100% 0%, 100% 100%, 0% 100%)", background: `linear-gradient(160deg, ${char.color} 0%, ${char.color}bb 100%)` }} />
          </AnimatePresence>

          {/* MARVEL logo over image */}
          <div className="absolute top-0 inset-x-0 flex items-center justify-between z-20" style={{ padding: "18px 20px 0" }}>
            <span className="font-black select-none" style={{ fontSize: 18, color: char.color, fontFamily: "sans-serif", transition: "color 0.4s", letterSpacing: "0.05em" }}>
              MARVEL
            </span>
            <div className="flex flex-col gap-1">
              {[20, 14, 10].map(w => (
                <div key={w} style={{ width: w, height: 2, background: "rgba(240,240,240,0.5)" }} />
              ))}
            </div>
          </div>

          {/* Character image */}
          <AnimatePresence>
            <motion.div key={`img-${index}`} custom={direction} variants={imgVariants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
              {charImgEl}
            </motion.div>
          </AnimatePresence>

          {/* Fade bottom of image into info panel */}
          <div style={{ position: "absolute", inset: "auto 0 0 0", height: 60, background: "linear-gradient(to top, #040608, transparent)", pointerEvents: "none" }} />
        </div>

        {/* ── BOTTOM: Info + Nav (45% of height) ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "16px 20px 0", background: "#040608", position: "relative", zIndex: 10 }}>

          {/* Thin accent line at top of panel */}
          <div style={{ position: "absolute", top: 0, left: 20, right: 20, height: 1, background: `linear-gradient(90deg, ${char.color}60, transparent)` }} />

          <div>
            <AnimatePresence mode="wait">
              <motion.p key={`crumb-${index}`} custom={direction} variants={textVariants}
                initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}
                style={{ fontSize: 10, color: "rgba(240,240,240,0.35)", fontFamily: "sans-serif", marginBottom: 4 }}>
                Home / <span style={{ color: "rgba(240,240,240,0.6)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>CHARACTERS</span>
              </motion.p>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.h2 key={`name-${index}`} custom={direction} variants={textVariants}
                initial="enter" animate="center" exit="exit" transition={{ duration: 0.35, delay: 0.04 }}
                style={{ fontSize: 30, fontWeight: 900, fontFamily: "sans-serif", color: char.color, letterSpacing: "-0.01em", lineHeight: 1, marginBottom: 8, textShadow: `0 0 30px ${char.glow}`, transition: "color 0.4s" }}>
                {char.name}
              </motion.h2>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p key={`desc-${index}`} custom={direction} variants={textVariants}
                initial="enter" animate="center" exit="exit" transition={{ duration: 0.35, delay: 0.08 }}
                style={{ fontSize: 12, lineHeight: 1.65, color: "rgba(240,240,240,0.45)", fontFamily: "sans-serif", marginBottom: 12, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {char.desc}
              </motion.p>
            </AnimatePresence>
            <div className="flex items-center gap-4">
              {SOCIALS.map(s => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" title={s.label} style={{ color: "rgba(240,240,240,0.35)" }}>{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Nav bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "stretch", borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: 8 }}>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => goManual(-1)}
              style={{ flex: 1, height: 48, background: "rgba(255,255,255,0.05)", border: "none", color: "rgba(240,240,240,0.7)", fontSize: 18, cursor: "pointer" }}>
              ←
            </motion.button>
            <div style={{ display: "flex", alignItems: "center", borderLeft: "1px solid rgba(255,255,255,0.06)", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
              {navDotsEl}
            </div>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => goManual(1)}
              style={{ flex: 1, height: 48, background: char.color, border: "none", color: "#fff", fontSize: 18, cursor: "pointer", transition: "background 0.4s" }}>
              →
            </motion.button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="cast"
      className="relative overflow-hidden"
      style={{ height: "100vh", background: "#040608" }}
    >
      {/* ── Background glow ── */}
      <AnimatePresence>
        <motion.div
          key={`bg-${index}`}
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          style={{ background: `radial-gradient(ellipse 60% 80% at 70% 50%, ${char.glow} 0%, transparent 65%)` }}
        />
      </AnimatePresence>

      {/* Web grid */}
      <div className="absolute inset-0 web-bg opacity-10 pointer-events-none" />

      {/* ── Far-right diagonal accent stripe ── */}
      <AnimatePresence>
        <motion.div
          key={`stripe-${index}`}
          className="absolute top-0 right-0 h-full pointer-events-none"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            width: "18%",
            clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)",
            background: `linear-gradient(160deg, ${char.color} 0%, ${char.color}bb 100%)`,
          }}
        />
      </AnimatePresence>

      {/* ── MARVEL watermark ── */}
      <div
        className="absolute pointer-events-none select-none"
        aria-hidden
        style={{
          top: "50%", left: "-2%",
          transform: "translateY(-50%)",
          fontSize: "clamp(100px, 22vw, 260px)",
          fontWeight: 900,
          fontFamily: "sans-serif",
          letterSpacing: "-0.04em",
          color: "rgba(255,255,255,0.03)",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        MARVEL
      </div>

      {/* ── TOP BAR ── */}
      <div className="absolute top-0 inset-x-0 flex items-center justify-between z-20" style={{ padding: "clamp(20px, 4vw, 40px) clamp(16px, 5vw, 40px) 0" }}>
        <span className="font-black tracking-wider select-none"
          style={{ fontSize: 26, color: char.color, fontFamily: "sans-serif", transition: "color 0.4s", letterSpacing: "0.05em" }}>
          MARVEL
        </span>
        <div className="flex flex-col gap-1.5">
          {[28, 20, 14].map(w => (
            <div key={w} style={{ width: w, height: 2, background: "rgba(240,240,240,0.5)" }} />
          ))}
        </div>
      </div>

      {/* ── CHARACTER IMAGE ── */}
      <AnimatePresence>
        <motion.div
          key={`img-${index}`}
          custom={direction}
          variants={imgVariants}
          initial="enter" animate="center" exit="exit"
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute pointer-events-none"
          style={{ top: 0, bottom: 0, left: "32%", right: "14%", display: "flex", alignItems: "flex-end", justifyContent: "center" }}
        >
          {charImgEl}
        </motion.div>
      </AnimatePresence>

      {/* ── BOTTOM LEFT: character info ── */}
      <div className="absolute z-20"
        style={{ bottom: 80, left: 40, maxWidth: 420 }}>
        <AnimatePresence mode="wait">
          <motion.p key={`crumb-${index}`} custom={direction} variants={textVariants}
            initial="enter" animate="center" exit="exit" transition={{ duration: 0.35 }}
            className="mb-3 text-xs" style={{ color: "rgba(240,240,240,0.35)", fontFamily: "sans-serif" }}>
            Home / <span style={{ color: "rgba(240,240,240,0.65)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>CHARACTERS</span>
          </motion.p>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.h2 key={`name-${index}`} custom={direction} variants={textVariants}
            initial="enter" animate="center" exit="exit" transition={{ duration: 0.4, delay: 0.04 }}
            style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 900, fontFamily: "sans-serif", color: char.color, letterSpacing: "-0.01em", lineHeight: 1, marginBottom: 12, textShadow: `0 0 40px ${char.glow}`, transition: "color 0.4s" }}>
            {char.name}
          </motion.h2>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.p key={`desc-${index}`} custom={direction} variants={textVariants}
            initial="enter" animate="center" exit="exit" transition={{ duration: 0.4, delay: 0.08 }}
            style={{ fontSize: 13, lineHeight: 1.8, color: "rgba(240,240,240,0.45)", fontFamily: "sans-serif", marginBottom: 20 }}>
            {char.desc}
          </motion.p>
        </AnimatePresence>
        <div className="flex items-center gap-5">
          {SOCIALS.map(s => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" title={s.label}
              className="transition-all duration-300"
              style={{ color: "rgba(240,240,240,0.35)" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = char.color)}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(240,240,240,0.35)")}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* ── BOTTOM: Navigation arrows ── */}
      <div className="absolute z-20" style={{ bottom: 0, left: "32%", right: "14%", display: "flex", justifyContent: "space-between", alignItems: "stretch" }}>
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => goManual(-1)}
          style={{ width: 80, height: 56, background: "rgba(255,255,255,0.06)", border: "none", borderTop: "1px solid rgba(255,255,255,0.1)", color: "rgba(240,240,240,0.7)", fontSize: 18, cursor: "pointer", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          ←
        </motion.button>
        {navDotsEl}
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => goManual(1)}
          style={{ width: 80, height: 56, background: char.color, border: "none", color: "#fff", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.4s" }}>
          →
        </motion.button>
      </div>

      {/* Top/bottom dark fades */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#040608] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#040608] to-transparent pointer-events-none z-10" />
    </section>
  );
}
