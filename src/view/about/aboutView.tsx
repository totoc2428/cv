import React from "react";
import { About } from "../../types/about";
import { getTranslation, Language } from "../../languages/dic";

interface AboutViewState {
  about: About | null;
  language: Language;
}

export class AboutView extends React.Component<{}, AboutViewState> {
  state: AboutViewState = {
    about: null,
    language: "fr",
  };

  async componentDidMount() {
    try {
      const response = await fetch("/public/json/about/about.json");
      const aboutData = await response.json();
      this.setState({ about: aboutData });
    } catch (error) {
      console.error("Error loading about data:", error);
    }
  }

  render() {
    const { about, language } = this.state;

    if (!about) {
      return <div>Loading...</div>;
    }

    return (
      <section className="about">
        <header>
          <h1>{getTranslation("about.title", language)}</h1>
        </header>
        <main>
          <h2>
            {about.firstName} {about.name}
          </h2>
          <p>
            {about.introduction[language === "fr" ? "fr_value" : "en_value"]}
          </p>
          <p>{about.about[language === "fr" ? "fr_value" : "en_value"]}</p>
        </main>
      </section>
    );
  }
}
