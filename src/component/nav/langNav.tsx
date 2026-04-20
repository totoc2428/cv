import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import "/public/style/components/nav/nav.css";
import { Language } from "../../languages/dic";

export function LangNav() {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (newLang: Language) => {
    if (language === newLang) {
      return;
    }

    setLanguage(newLang);
  };

  return (
    <nav className="nav lang-nav">
      <button
        className={"button " + (language === "en" ? "focus" : "")}
        onClick={() => handleLanguageChange("en")}
      >
        🇬🇧
      </button>
      <button
        className={"button " + (language === "fr" ? "focus" : "")}
        onClick={() => handleLanguageChange("fr")}
      >
        🇫🇷
      </button>
    </nav>
  );
}
