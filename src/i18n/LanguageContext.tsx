import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { de } from "./de";
import { en } from "./en";
import type { Translations } from "./de";

type Lang = "de" | "en";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem("narratec-lang");
    return stored === "en" ? "en" : "de";
  });

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("narratec-lang", newLang);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = lang === "de" ? de : en;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
