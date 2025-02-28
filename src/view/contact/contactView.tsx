import { MainNav } from "../../component/nav/mainNav";
import { Header } from "../../component/header/headerComponent";
import React from "react";
import { LangNav } from "../../component/nav/langNav";
import { LanguageContext } from "../../context/LanguageContext";
import { getTranslation } from "../../languages/dic";

import "/public/style/view/contact.css";

interface ContactLinks {
  link: {
    email: string;
    twitter: string;
    linkedin: string;
    github: string;
  };
}

interface ContactViewState {
  mailClicked: boolean;
  twitterClicked: boolean;
  linkedInClicked: boolean;
  gitHubClicked: boolean;
  contactData: ContactLinks | null;
}

const TIME_TO_WAIT = 2000;

export class ContactView extends React.Component<{}, ContactViewState> {
  static contextType = LanguageContext;

  state: ContactViewState = {
    mailClicked: false,
    twitterClicked: false,
    linkedInClicked: false,
    gitHubClicked: false,
    contactData: null,
  };

  async componentDidMount() {
    try {
      const response = await fetch("/json/contact/contact.json");
      const contactData = await response.json();
      this.setState({ contactData });
    } catch (error) {
      console.error("Error loading contact data:", error);
    }
  }

  copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  handleMailClick = () => {
    const email = this.state.contactData?.link.email;
    if (email) {
      this.copyToClipboard(email);
      this.setState({ mailClicked: true });
      setTimeout(() => this.setState({ mailClicked: false }), TIME_TO_WAIT);
    }
  };

  handleTwitterClick = () => {
    const twitter = this.state.contactData?.link.twitter;
    if (twitter) {
      window.open(twitter, "_blank");
      this.setState({ twitterClicked: true });
      setTimeout(() => this.setState({ twitterClicked: false }), TIME_TO_WAIT);
    }
  };

  handleLinkedInClick = () => {
    const linkedin = this.state.contactData?.link.linkedin;
    if (linkedin) {
      window.open(linkedin, "_blank");
      this.setState({ linkedInClicked: true });
      setTimeout(() => this.setState({ linkedInClicked: false }), TIME_TO_WAIT);
    }
  };

  handleGitHubClick = () => {
    const github = this.state.contactData?.link.github;
    if (github) {
      window.open(github, "_blank");
      this.setState({ gitHubClicked: true });
      setTimeout(() => this.setState({ gitHubClicked: false }), TIME_TO_WAIT);
    }
  };

  render(): React.ReactNode {
    if (!this.state.contactData) {
      return <div>Loading...</div>;
    }

    return (
      <LanguageContext.Consumer>
        {({ language }) => (
          <section className="contact-container">
            <Header title="contact" />
            <main className="main contact-section">
              <button onClick={this.handleMailClick} className="button">
                {this.state.mailClicked
                  ? getTranslation("button.copied", language)
                  : "✉️ Mail"}
              </button>
              <button onClick={this.handleTwitterClick} className="button">
                {this.state.twitterClicked
                  ? getTranslation("button.copied", language)
                  : "🐦 Twitter"}
              </button>
              <button onClick={this.handleLinkedInClick} className="button">
                {this.state.linkedInClicked
                  ? getTranslation("button.copied", language)
                  : "🟦 LinkedIn"}
              </button>
              <button onClick={this.handleGitHubClick} className="button">
                {this.state.gitHubClicked
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
