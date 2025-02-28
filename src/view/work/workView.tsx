import React from "react";
import { ExperienceThumbMail } from "../../component/exp/exprienceThumbmail";
import { Header } from "../../component/header/headerComponent";
import { LangNav } from "../../component/nav/langNav";
import { MainNav } from "../../component/nav/mainNav";
import { ExpService } from "../../services/expService";
import { Exp } from "../../types/exp/exp";

interface WorkViewState {
  exp: Exp[];
  currentExp: Exp | null;
}

export class WorkView extends React.Component<{}, WorkViewState> {
  state: WorkViewState = {
    exp: [],
    currentExp: null
  }

  async componentDidMount(): Promise<void> {
    const experiences = await ExpService.getExps();
    this.setState({ exp: experiences });
  }

  render() {
    const { exp } = this.state;
    return (
      <section className="wokr-container">
        <Header title="work" />
        <main className="work-section">
          {exp.map((exp) => {
            return (
              <ExperienceThumbMail 
                key={exp.id}
                exp={exp} 
                handleOnClick={() => {}} 
              />
            );
          })}
        </main>
        <MainNav />
        <LangNav />
      </section>
    );
  }
}
