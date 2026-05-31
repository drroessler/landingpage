import { Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageContext";
import ScrollToTop from "./components/ScrollToTop";
import RedesignLanding from "./components/RedesignLanding";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import AGB from "./pages/AGB";

export default function App() {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<RedesignLanding />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="/agb" element={<AGB />} />
      </Routes>
    </LanguageProvider>
  );
}
