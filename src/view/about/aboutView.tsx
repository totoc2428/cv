import React from "react";
import { About } from "../../types/about";
import { getTranslation } from "../../languages/dic";
import { LangNav } from "../../component/nav/langNav";
import { MainNav } from "../../component/nav/mainNav";
import { useLanguage } from "../../context/LanguageContext";

import profileImage from "/public/images/about/profil.jpg";
import "/public/style/view/about.css";

export const AboutView: React.FC = () => {
  const [about, setAbout] = React.useState<About | null>(null);
  const { language } = useLanguage();

  React.useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await fetch("/public/json/about/about.json");
        const aboutData = await response.json();
        setAbout(aboutData);
      } catch (error) {
        console.error("Error loading about data:", error);
      }
    };
    fetchAbout();
  }, []);

  if (!about) {
    return <div>Loading...</div>;
  }

  return (
    <section className="about-container">
      <header className="about-header">
        <h4>{getTranslation("header.note", language)}</h4>
        <h1>{getTranslation("header.title.about", language)}</h1>

        <a
          className="button"
          href="https://drive.google.com/file/d/1bBfqdGNat7DXiHFI7GWanhb0AA7OF2Ix/view?usp=sharing"
        >
          {getTranslation("header.cv", language)}
        </a>
      </header>
      <main className="about-section">
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
          <p>{about.about[language === "fr" ? "fr_value" : "en_value"]}</p>
        </div>
      </main>
      <MainNav />
      <LangNav />
    </section>
  );
};
