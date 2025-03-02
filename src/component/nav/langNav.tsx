import React from "react";
import { LanguageContext } from "../../context/LanguageContext";
import "/public/style/components/nav/nav.css";

export class LangNav extends React.Component {
  static contextType = LanguageContext;

  render() {
    return (
      <LanguageContext.Consumer>
        {({ language, setLanguage }) => (
          <nav className="nav lang-nav">
            <button
              className={"button " + (language === "en" ? "focus" : "")}
              onClick={() => setLanguage("en")}
            >
              🇬🇧
            </button>
            <button
              className={"button " + (language === "fr" ? "focus" : "")}
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
