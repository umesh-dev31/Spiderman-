# Spider-Man: Brand New Day

An interactive, scroll-driven promotional web experience built for "Spider-Man: Brand New Day" (In Cinemas July 31, 2026). Featuring high-performance HTML5 canvas frame scrubbing, GSAP ScrollTrigger animations, interactive character dossiers, dynamic threat assessments, and fluid Framer Motion transitions.

---

## Live Repository

[https://github.com/umesh-dev31/Spiderman-](https://github.com/umesh-dev31/Spiderman-)

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Next.js 16 (App Router) | Core React framework and production build tooling |
| React 19 | Declarative component UI and state management |
| GSAP + ScrollTrigger | High-performance scroll orchestration and canvas frame scrubbing |
| Framer Motion | Fluid spring physics, layout animations, and gesture interactions |
| Tailwind CSS v4 | Utility-first styling with custom dark aesthetic tokens |
| TypeScript | Type safety and strict component props validation |

---

## Project Structure

```
spiderman/
  app/
    globals.css               Global styling, grain overlay, red accent gradients
    layout.tsx                Root layout with metadata and global toast mount
    page.tsx                  Master page composing all interactive sections
    components/
      Loader.tsx              Cinematic split-screen preloader with load tracking
      Navbar.tsx              Fixed glassmorphism navigation with sound effects and drawer
      FrameHero.tsx           134-frame scroll-scrubbed canvas with release countdown
      OriginSection.tsx       Narrative recap of Peter Parker's forgotten identity
      CharactersSection.tsx   Interactive character dossiers (Spider-Man, MJ, Hulk, Ned)
      PowersSection.tsx       Tactical breakdown of powers and suit capabilities
      GallerySection.tsx      High-definition film stills and concept art showcase
      VillainsSection.tsx     Rogues gallery with threat classification dossiers
      CTASection.tsx          Ticket reservations and premier alert subscriptions
      TrailersSection.tsx     Official teasers, trailers, and video modals
      QuoteSection.tsx        Cinematic quote showcase and thematic narrative
      Footer.tsx              Marvel Studios copyright, legal disclosures, and links
      Toast.tsx               Global interactive notification dispatch system
  public/
    frames/                   134 sequential JPEG frames for hero scroll sequence
    characters/               High-resolution character transparent PNG cutouts
    gallery section/          Cinematic production stills and artwork
    footer section/           Footer branding and backdrop elements
```

---

## Key Features and Architecture

### 1. Canvas Scroll Sequence Scrubbing (FrameHero)
- **134-Frame Scrub Engine:** Synchronizes high-resolution photographic frames (frame 67 through frame 200) directly against window scroll progress using GSAP ScrollTrigger.
- **Aspect Ratio Preservation:** Automatically calculates letterboxing and device pixel ratio adjustments to maintain crisp visuals on retina screens.
- **Synchronized Captions:** Timeline triggers fade narrative beats at specific scroll milestones (0.05, 0.28, 0.52, 0.76).
- **Release Countdown:** Live countdown timer calculating days, hours, minutes, and seconds until the cinema release on July 31, 2026.

### 2. Interactive Character Dossiers
- **Multi-Character Switcher:** Detailed profiles for Peter Parker (Tom Holland), Michelle "MJ" Jones (Zendaya), Bruce Banner / Hulk (Mark Ruffalo), and Ned Leeds (Jacob Batalon).
- **Smooth Layout Transitions:** Animated character switching powered by Framer Motion's AnimatePresence.

### 3. Rogues Gallery and Threat Level Assessment
- **Threat Meters:** Detailed dossiers on Green Goblin, Doc Ock, Venom, Electro, Sandman, and Lizard.
- **Dynamic Stats:** Threat ratings, power indicators, and lore descriptions.

### 4. Audio Feedback and Interactive UI
- **Global Toast Alerts:** Built-in toast notifications for user interactions, reservations, and reminders.
- **Custom Sound Effects:** Interactive audio cues mapped to UI clicks and hover events.
- **Mobile Responsive:** Full touch adaptation across all breakpoints, from mobile viewports to ultra-wide displays.

---

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm, pnpm, or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/umesh-dev31/Spiderman-.git
cd Spiderman-
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

---

## Build and Production

To create an optimized production build:

```bash
# Build the production bundle
npm run build

# Start the production server
npm run start
```

---

## Scripts

| Command | Action |
|---|---|
| npm run dev | Starts the Next.js development server on port 3000 |
| npm run build | Compiles and builds the production bundle |
| npm run start | Starts the production server |
| npm run lint | Runs ESLint validation across the codebase |

---

## License

This project is created for educational and portfolio demonstration purposes. All characters and trademarks are property of Marvel Studios and Sony Pictures.
