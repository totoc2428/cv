import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import "/public/style/components/nav/nav.css";

export const LangNav: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <nav className="lang-nav">
      <button
        className={(language === "en" ? "focus" : "") + " button"}
        onClick={() => setLanguage("en")}
      >
        🇬🇧
      </button>
      <button
        className={(language === "fr" ? "focus" : "") + " button"}
        onClick={() => setLanguage("fr")}
      >
        🇫🇷
      </button>
    </nav>
  );
};
