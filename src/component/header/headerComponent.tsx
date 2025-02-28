import { getTranslation } from "../../languages/dic";
import { LanguageContext } from "../../context/LanguageContext";
import React from "react";

interface HeaderProps {
  title: string;
}

export class Header extends React.Component<HeaderProps> {
  render() {
    return (
      <LanguageContext.Consumer>
        {({ language }) => (
          <header className={"main-header " + this.props.title}>
            <h4>{getTranslation("header.note", language)}</h4>
            <h1>
              {getTranslation(`header.title.${this.props.title}`, language)}
            </h1>
            <a
              className="button"
              href="https://drive.google.com/file/d/1bBfqdGNat7DXiHFI7GWanhb0AA7OF2Ix/view?usp=sharing"
            >
              {getTranslation("header.cv", language)}
            </a>
          </header>
        )}
      </LanguageContext.Consumer>
    );
  }
}
