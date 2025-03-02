import React from "react";
import { LanguageContext } from "../../context/LanguageContext";

import "../../../public/style/components/exp/skills.css";

interface SkillDetailProps {
  skillId: string;
  value: string;
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
}

export class SkillDetail extends React.Component<SkillDetailProps> {
  static contextType = LanguageContext;
  declare context: React.ContextType<typeof LanguageContext>;

  render() {
    const { skillId, value, title, isExpanded, onToggle } = this.props;

    return (
      <div
        className={`skill-detail ${isExpanded ? "expanded" : ""} ${skillId}`}
      >
        <button className="skill-header" onClick={onToggle}>
          <span className="skill-id">{title}</span>
          <span className="expand-icon">{isExpanded ? "−" : "+"}</span>
        </button>
        {isExpanded && (
          <div className="skill-content">
            <p>{value}</p>
          </div>
        )}
      </div>
    );
  }
}
