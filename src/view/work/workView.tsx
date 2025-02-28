import React from "react";
import { ExperienceThumbMail } from "../../component/exp/exprienceThumbmail";
import { Header } from "../../component/header/headerComponent";
import { LangNav } from "../../component/nav/langNav";
import { MainNav } from "../../component/nav/mainNav";
import { ExpService } from "../../services/expService";
import { ExpTranslated } from "../../types/exp/exp";
import { LanguageContext } from "../../context/LanguageContext";
import { ExprienceDetail } from "../../component/exp/exprienceDetail";

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
    currentExp: null,
  };

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
    const { exps, currentExp } = this.state;
    return (
      <section className="work-container">
        <Header title="work" />
        <main className={`main work-section ${currentExp ? "open" : ""}`}>
          <div className="exp-list">
            {exps.map((exp) => (
              <ExperienceThumbMail
                exp={exp}
                handleOnClick={() => this.setState({ currentExp: exp })}
              />
            ))}
          </div>
          {currentExp && <ExprienceDetail exp={currentExp} />}
        </main>
        <MainNav />
        <LangNav />
      </section>
    );
  }
}
