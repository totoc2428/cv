import React from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { sanitizeHtml } from "../../utils/htmlSanitizer";

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
  private containerRef = React.createRef<HTMLDivElement>();
  private scrollTimeoutId: number | null = null;

  componentDidUpdate(prevProps: SkillDetailProps) {
    if (!prevProps.isExpanded && this.props.isExpanded) {
      this.scheduleParentScroll();
    }
  }

  componentWillUnmount() {
    if (this.scrollTimeoutId !== null) {
      window.clearTimeout(this.scrollTimeoutId);
      this.scrollTimeoutId = null;
    }
  }

  private scheduleParentScroll() {
    if (this.scrollTimeoutId !== null) {
      window.clearTimeout(this.scrollTimeoutId);
    }

    // Match the CSS transition duration to avoid layout jump during expansion.
    this.scrollTimeoutId = window.setTimeout(() => {
      this.scrollParentToBottom();
      this.scrollTimeoutId = null;
    }, 320);
  }

  private scrollParentToBottom() {
    const skillContainer = this.containerRef.current;
    if (!skillContainer) {
      return;
    }

    const parent = skillContainer.closest(
      ".main-exp-detail",
    ) as HTMLElement | null;

    if (!parent) {
      return;
    }

    parent.scrollTo({
      top: parent.scrollHeight,
      behavior: "smooth",
    });
  }

  render() {
    const { skillId, value, title, isExpanded, onToggle } = this.props;

    return (
      <div
        ref={this.containerRef}
        className={`skill-detail ${isExpanded ? "expanded" : ""} ${skillId}`}
      >
        <button className="skill-header" onClick={onToggle}>
          <span className="skill-id">{title}</span>
          <span className="expand-icon">{isExpanded ? "−" : "+"}</span>
        </button>
        {isExpanded && (
          <div className="skill-content">
            <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(value) }} />
          </div>
        )}
      </div>
    );
  }
}
