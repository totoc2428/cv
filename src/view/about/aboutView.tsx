import React from "react";
import { About } from "../../types/about";
import { LangNav } from "../../component/nav/langNav";
import { MainNav } from "../../component/nav/mainNav";
import { LanguageContext } from "../../context/LanguageContext";
import { Language } from "../../languages/dic";
import { Loader } from "../../component/loader/loaderComponent";

const profileImage = "/images/about/profil.jpg";
import "/public/style/view/about.css";
import { Header } from "../../component/header/headerComponent";

interface AboutViewState {
  about: About | null;
}

export class AboutView extends React.Component<{}, AboutViewState> {
  state: AboutViewState = {
    about: null,
  };

  async componentDidMount() {
    try {
      const response = await fetch("/json/about/about.json");
      const aboutData = await response.json();
      this.setState({ about: aboutData });
    } catch (error) {
      console.error("Error loading about data:", error);
    }
  }

  renderContent(language: Language) {
    const { about } = this.state;

    if (!about) {
      return <Loader />;
    }

    return (
      <section className="about-container">
        <Header title="about" />
        <main className="main about-section">
          <div className="about-title">
            <img src={profileImage} alt="about" className="profile-image" />
            <h2>
              {about.firstName} {about.name}
            </h2>
          </div>
          <div className="about-content">
            <p>
              {about.introduction[language === "fr" ? "fr_value" : "en_value"]}
            </p>
            <p className="content">
              {about.about[language === "fr" ? "fr_value" : "en_value"]}
            </p>
          </div>
        </main>
        <MainNav />
        <LangNav />
      </section>
    );
  }

  render() {
    return (
      <LanguageContext.Consumer>
        {({ language }) => this.renderContent(language)}
      </LanguageContext.Consumer>
    );
  }
}
