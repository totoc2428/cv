import React from "react";
import { ExpTranslated } from "../../types/exp/exp";
import { LanguageContext } from "../../context/LanguageContext";
import { TagThumbmail } from "./tagThumbmail";

import "../../../public/style/components/exp/exps.css";

interface ExperienceThumbMailProps {
  exp: ExpTranslated;
  handleOnClick: () => void;
}

export class ExperienceThumbMail extends React.Component<ExperienceThumbMailProps> {
  static contextType = LanguageContext;

  shouldComponentUpdate(nextProps: ExperienceThumbMailProps) {
    return (
      this.props.exp.id !== nextProps.exp.id ||
      this.props.exp.title !== nextProps.exp.title ||
      JSON.stringify(this.props.exp.tags) !== JSON.stringify(nextProps.exp.tags)
    );
  }

  render() {
    const { exp, handleOnClick } = this.props;

    return (
      <button onClick={handleOnClick} className="exp-thumbmail">
        <h1>{exp.title}</h1>
        <div className="exp-thumbmail-tags">
          {exp.tags.map((tag) => (
            <TagThumbmail key={tag.id} tag={tag} />
          ))}
        </div>
      </button>
    );
  }
}
