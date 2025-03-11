import React from "react";
import { LanguageContext } from "../../context/LanguageContext";
import "/public/style/components/nav/nav.css";

export class LangNav extends React.Component {
  static contextType = LanguageContext;

  handleLanguageChange = (
    setLanguage: (lang: "en" | "fr") => void,
    newLang: "en" | "fr"
  ) => {
    setLanguage(newLang);
    window.location.reload(); // Force page reload
  };

  render() {
    return (
      <LanguageContext.Consumer>
        {({ language, setLanguage }) => (
          <nav className="nav lang-nav">
            <button
              className={"button " + (language === "en" ? "focus" : "")}
              onClick={() => this.handleLanguageChange(setLanguage, "en")}
            >
              🇬🇧
            </button>
            <button
              className={"button " + (language === "fr" ? "focus" : "")}
              onClick={() => this.handleLanguageChange(setLanguage, "fr")}
            >
              🇫🇷
            </button>
          </nav>
        )}
      </LanguageContext.Consumer>
    );
  }
}
