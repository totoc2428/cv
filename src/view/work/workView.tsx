import React from "react";
import { ExperienceThumbMail } from "../../component/exp/exprienceThumbmail";
import { Header } from "../../component/header/headerComponent";
import { LangNav } from "../../component/nav/langNav";
import { MainNav } from "../../component/nav/mainNav";
import { ExpService } from "../../services/expService";
import { ExpTranslated } from "../../types/exp/exp";
import { LanguageContext } from "../../context/LanguageContext";
import { ExprienceDetail } from "../../component/exp/exprienceDetail";
import { Loader } from "../../component/loader/loaderComponent";

import "../../../public/style/view/work.css";

interface WorkViewState {
  exps: ExpTranslated[];
  currentExp: ExpTranslated | null;
  error: string | null;
}

export class WorkView extends React.Component<{}, WorkViewState> {
  static contextType = LanguageContext;
  declare context: React.ContextType<typeof LanguageContext>;

  state: WorkViewState = {
    exps: [],
    currentExp: null,
    error: null,
  };

  async componentDidMount(): Promise<void> {
    try {
      const { language } = this.context;
      const experiences = await ExpService.getExps(language);
      this.setState({ exps: experiences, error: null });
    } catch (error) {
      this.setState({
        error:
          this.context.language === "fr"
            ? "Erreur lors du chargement des expériences"
            : "Error loading experiences",
      });
      console.error("Error loading experiences:", error);
    }
  }

  async componentDidUpdate(
    prevContext: React.ContextType<typeof LanguageContext>
  ): Promise<void> {
    if (this.context.language !== prevContext?.language) {
      try {
        const experiences = await ExpService.getExps(this.context.language);
        this.setState({
          exps: experiences,
          currentExp: this.state.currentExp
            ? experiences.find((exp) => exp.id === this.state.currentExp?.id) ||
              null
            : null,
          error: null,
        });
      } catch (error) {
        this.setState({
          error:
            this.context.language === "fr"
              ? "Erreur lors du chargement des expériences"
              : "Error loading experiences",
        });
      }
    }
  }

  render() {
    const { exps, currentExp, error } = this.state;

    if (error) {
      return (
        <section className="work-container">
          <Header title="work" />
          <main className="main work-section">
            <div className="error-message">{error}</div>
          </main>
          <MainNav />
          <LangNav />
        </section>
      );
    }

    if (exps.length === 0) {
      return (
        <section className="work-container">
          <Header title="work" />
          <Loader />
          <MainNav />
          <LangNav />
        </section>
      );
    }

    return (
      <section className="work-container">
        <Header title="work" />
        <main className={`main work-section ${currentExp ? "open" : ""}`}>
          <div className="exp-list">
            {exps.map((exp) => (
              <ExperienceThumbMail
                key={exp.id}
                exp={exp}
                handleOnClick={() => this.setState({ currentExp: exp })}
              />
            ))}
          </div>
          {currentExp && (
            <ExprienceDetail
              exp={currentExp}
              onClose={() => this.setState({ currentExp: null })}
            />
          )}
        </main>
        <MainNav />
        <LangNav />
      </section>
    );
  }
}
