import React from "react";
import { Tag } from "../../types/exp/tag";
import { LanguageContext } from "../../context/LanguageContext";

import "../../../public/style/components/exp/tags.css";

interface TagThumbmailProps {
  tag: Tag;
}

export class TagThumbmail extends React.Component<TagThumbmailProps> {
  static contextType = LanguageContext;
  declare context: React.ContextType<typeof LanguageContext>;

  render() {
    const { tag } = this.props;
    const { language } = this.context;

    if (!tag) {
      return null;
    }

    return (
      <span className={`tag-thumbmail ${tag.id}`}>
        {tag.value[language]}
      </span>
    );
  }
}
