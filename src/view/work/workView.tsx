import React from "react";
import { ExperienceThumbMail } from "../../component/exp/exprienceThumbmail";
import { Header } from "../../component/header/headerComponent";
import { LangNav } from "../../component/nav/langNav";
import { MainNav } from "../../component/nav/mainNav";
import { ExpService } from "../../services/expService";
import { ExpTranslated } from "../../types/exp/exp";
import { LanguageContext } from "../../context/LanguageContext";

import "../../../public/style/view/work.css";

interface WorkViewState {
  exps: ExpTranslated[];
  currentExp: ExpTranslated | null;
}

export class WorkView extends React.Component<{}, WorkViewState> {
  static contextType = LanguageContext;
  declare context: React.ContextType<typeof LanguageContext>;

  state: WorkViewState = {
    exps: [],
    currentExp: null
  }

  async componentDidMount(): Promise<void> {
    try {
      const { language } = this.context;
      const experiences = await ExpService.getExps(language);
      this.setState({ exps: experiences });
    } catch (error) {
      console.error("Error loading experiences:", error);
    }
  }

  render() {
    const { exps } = this.state;
    return (
      <section className="work-container">
        <Header title="work" />
        <main className="work-section">
          {exps.map((exp) => (
            <ExperienceThumbMail 
              exp={exp} 
              handleOnClick={() => this.setState({ currentExp: exp })} 
            />
          ))}
        </main>
        <MainNav />
        <LangNav />
      </section>
    );
  }
}
