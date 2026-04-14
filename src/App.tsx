import { Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageContext";
import ScrollToTop from "./components/ScrollToTop";
import ContactModal from "./components/ContactModal";
import Navbar from "./components/Navbar";
import Hero from "./components/sections/Hero";
import ProblemSection from "./components/sections/ProblemSection";
import MethodeSection from "./components/sections/MethodeSection";
import FrameworkSection from "./components/sections/FrameworkSection";
import KISection from "./components/sections/KISection";
import ArtefaktSection from "./components/sections/ArtefaktSection";
import UmsetzungSection from "./components/sections/UmsetzungSection";
import SzenarienSection from "./components/sections/SzenarienSection";
import PraxisSection from "./components/sections/PraxisSection";
import PullQuote from "./components/sections/PullQuote";
import StatsStrip from "./components/sections/StatsStrip";
import AngebotSection from "./components/sections/AngebotSection";
import TeamSection from "./components/sections/TeamSection";
import Footer from "./components/sections/Footer";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import AGB from "./pages/AGB";

function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <MethodeSection />
        <FrameworkSection />
        <ArtefaktSection />
        <UmsetzungSection />
        <KISection />
        <PullQuote />
        <SzenarienSection />
        <PraxisSection />
        <StatsStrip />
        <AngebotSection />
        <TeamSection />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <ContactModal />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="/agb" element={<AGB />} />
      </Routes>
    </LanguageProvider>
  );
}
