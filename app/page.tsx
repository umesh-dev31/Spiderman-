import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import FrameHero from "./components/FrameHero";
import OriginSection from "./components/OriginSection";
import CharactersSection from "./components/CharactersSection";
import PowersSection from "./components/PowersSection";
import QuoteSection from "./components/QuoteSection";
import TrailersSection from "./components/TrailersSection";
import GallerySection from "./components/GallerySection";
import VillainsSection from "./components/VillainsSection";
import CTASection from "./components/CTASection";

export default function Home() {
  return (
    <main className="grain" style={{ background: "#040608" }}>
      <Loader />
      <Navbar />
      <FrameHero />
      <OriginSection />
      <CharactersSection />
      <PowersSection />
      <GallerySection />
      <VillainsSection />
      <CTASection />
      <TrailersSection />
      <QuoteSection />
    </main>
  );
}
