import { Tag } from "../../types/exp/tag";
import React from "react";

interface TagThumbmailProps {
  tag: Tag;
}

export class TagThumbmail extends React.Component<TagThumbmailProps> {
  render() {
    const { tag } = this.props;

    if (!tag) {
      return null;
    }

    return (
      <span id="tag-thumbmail" className={`tag-thumbmail ${tag.id}`}>
        {tag.value}
      </span>
    );
  }
}
