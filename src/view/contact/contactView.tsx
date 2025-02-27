import { MainNav } from "../../component/nav/mainNav";
import { Header } from "../../component/header/headerComponent";
import React from "react";
import { LangNav } from "../../component/nav/langNav";
import { LanguageContext } from "../../context/LanguageContext";
import { getTranslation } from "../../languages/dic";

import "/public/style/view/contact.css";

const time_to_wait = 4000;

export class ContactView extends React.Component {
  static contextType = LanguageContext;

  state = {
    mailClicked: false,
    twitterClicked: false,
    linkedInClicked: false,
    gitHubCliked: false,
  };

  copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  handleMailClick = () => {
    this.copyToClipboard("charles.coude@example.com");
    this.setState({ mailClicked: true });
    setTimeout(() => this.setState({ mailClicked: false }), time_to_wait);
  };

  handleTwitterClick = () => {
    window.open("https://x.com/CharlesCoude", "_blank");
    this.setState({ twitterClicked: true });
    setTimeout(() => this.setState({ twitterClicked: false }), time_to_wait);
  };

  handleLinkedInClick = () => {
    window.open(
      "https://www.linkedin.com/in/charles-coud%C3%A9-a4a076284/",
      "_blank"
    );
    this.setState({ linkedInClicked: true });
    setTimeout(() => this.setState({ linkedInClicked: false }), time_to_wait);
  };

  handleGitHubClick = () => {
    window.open("https://github.com/totoc2428", "_blank");
    this.setState({ gitHubClicked: true });
    setTimeout(() => this.setState({ gitHubClicked: false }), time_to_wait);
  };

  render(): React.ReactNode {
    return (
      <LanguageContext.Consumer>
        {({ language }) => (
          <section className="contact-container">
            <Header title="contact" />
            <main className="contact-section">
              <button onClick={this.handleMailClick} className="button">
                {this.state.mailClicked
                  ? getTranslation("button.copied", language)
                  : "✉️ Mail"}
              </button>
              <button onClick={this.handleTwitterClick} className="button">
                {this.state.mailClicked
                  ? getTranslation("button.copied", language)
                  : "🐦 Twitter"}
              </button>
              <button onClick={this.handleLinkedInClick} className="button">
                {this.state.mailClicked
                  ? getTranslation("button.copied", language)
                  : "🟦 LinkedIn"}
              </button>
              <button onClick={this.handleGitHubClick} className="button">
                {this.state.mailClicked
                  ? getTranslation("button.copied", language)
                  : "😺 GitHub"}
              </button>
            </main>
            <MainNav />
            <LangNav />
          </section>
        )}
      </LanguageContext.Consumer>
    );
  }
}
