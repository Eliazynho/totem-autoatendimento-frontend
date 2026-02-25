"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Language, TranslationKeys } from "./translations";

interface i18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
}

const i18nContext = createContext<i18nContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt");

  useEffect(() => {
    const savedLang = sessionStorage.getItem("totem_language") as Language;
    if (savedLang && translations[savedLang]) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    sessionStorage.setItem("totem_language", lang);
  };

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return <i18nContext.Provider value={value}>{children}</i18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(i18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within a LanguageProvider");
  }
  return context;
}
