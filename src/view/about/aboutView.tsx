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
  mounted: boolean;
}

export class AboutView extends React.Component<{}, AboutViewState> {
  state: AboutViewState = {
    about: null,
    mounted: false,
  };

  async componentDidMount() {
    try {
      const response = await fetch("/json/about/about.json");
      const aboutData = await response.json();
      this.setState({ about: aboutData }, () => {
        window.requestAnimationFrame(() => {
          this.setState({ mounted: true });
        });
      });
    } catch (error) {
      console.error("Error loading about data:", error);
    }
  }

  renderContent(language: Language) {
    const { about, mounted } = this.state;

    if (!about) {
      return <Loader />;
    }

    return (
      <section className="about-container">
        <Header title="about" />
        <main className={`main about-section ${mounted ? "open" : ""}`}>
          <div className="about-title">
            <img
              src={profileImage}
              alt="about"
              className="profile-image mx-auto w-25 sm:w-48 md:w-42 lg:w-50 rounded-3xl neumorphic-small"
            />
            <h2 className="text-2xl font-bold text-center m-4">
              {about.firstName} {about.name}
            </h2>
          </div>
          <div className="about-content leading-relaxed text-lg">
            <p className="mb-4">
              {about.introduction[language === "fr" ? "fr_value" : "en_value"]}
            </p>
            <p className="content mb-4 sm:mb-40">
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
