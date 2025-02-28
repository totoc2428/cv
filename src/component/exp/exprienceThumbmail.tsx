import { Exp } from "../../types/exp/exp";
import React from "react";

interface ExperienceThumbMailProps {
  exp: Exp;
  handleOnClick: () => void;
}

export class ExperienceThumbMail extends React.Component<ExperienceThumbMailProps>{
  render() {
    const { exp, handleOnClick } = this.props;
    return (
      <button onClick={handleOnClick} className="exp-thumbmail">
        <h1>{exp.title}</h1>
        <div className="exp-thumbmail-tags">
          {exp.tags.map((tag) => {
            return <span key={tag}>{tag}</span>;
          })}
        </div>
      </button>
    );
  }
}
