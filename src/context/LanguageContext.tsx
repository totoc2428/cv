import React, { createContext, useContext, useState } from "react";
import { Language } from "../languages/dic";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: "fr",
  setLanguage: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Lire depuis localStorage au montage initial
    return (localStorage.getItem("language") as Language) || "fr";
  });

  const setLanguage = (newLang: Language) => {
    // Sauvegarder dans localStorage et mettre à jour l'état
    localStorage.setItem("language", newLang);
    setLanguageState(newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
