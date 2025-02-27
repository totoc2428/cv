import React from "react";
import { LanguageContext } from "../../context/LanguageContext";
import "/public/style/components/nav/nav.css";

export class LangNav extends React.Component {
  static contextType = LanguageContext;

  render() {
    return (
      <LanguageContext.Consumer>
        {({ language, setLanguage }) => (
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
        )}
      </LanguageContext.Consumer>
    );
  }
}
