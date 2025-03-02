import React from "react";
import { LanguageContext } from "../../context/LanguageContext";

import "../../../public/style/components/exp/skills.css";

interface SkillDetailProps {
  skillId: string;
  value: string;
  title: string;
}

interface SkillDetailState {
  expanded: boolean;
}

export class SkillDetail extends React.Component<
  SkillDetailProps,
  SkillDetailState
> {
  static contextType = LanguageContext;
  declare context: React.ContextType<typeof LanguageContext>;

  state: SkillDetailState = {
    expanded: false,
  };

  toggleExpand = () => {
    this.setState((prevState) => ({ expanded: !prevState.expanded }));
  };

  render() {
    const { skillId, value, title } = this.props;
    const { expanded } = this.state;

    return (
      <div className={`skill-detail ${expanded ? "expanded" : ""} ${skillId}`}>
        <button className="skill-header" onClick={this.toggleExpand}>
          <span className="skill-id">{title}</span>
          <span className="expand-icon">{expanded ? "−" : "+"}</span>
        </button>
        {expanded && (
          <div className="skill-content">
            <p>{value}</p>
          </div>
        )}
      </div>
    );
  }
}
