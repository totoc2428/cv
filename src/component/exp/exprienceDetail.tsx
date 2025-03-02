import React from "react";
import { ExpTranslated } from "../../types/exp/exp";
import { getTranslation } from "../../languages/dic";
import { LanguageContext } from "../../context/LanguageContext";
import { Tag } from "../../types/exp/tag";
import { TagThumbmail } from "./tagThumbmail";

interface ExpProps {
  exp: ExpTranslated;
  onClose: () => void; // New prop
}

export class ExprienceDetail extends React.Component<ExpProps> {
  state = {
    closed: false,
    mounted: false,
  };

  componentDidMount() {
    this.triggerAnimation();
  }

  componentDidUpdate(prevProps: ExpProps) {
    if (prevProps.exp.id !== this.props.exp.id) {
      // Reset and retrigger animation when experience changes
      this.setState({ mounted: false }, () => {
        this.triggerAnimation();
      });
    }
  }

  triggerAnimation() {
    requestAnimationFrame(() => {
      this.setState({ mounted: true });
    });
  }

  handleClose = () => {
    this.setState({ closed: true });
    this.props.onClose(); // Call parent callback
  };

  render() {
    const { exp } = this.props;
    const { closed, mounted } = this.state;

    if (closed) {
      console.log("closed");
      return null;
    }

    return (
      <LanguageContext.Consumer>
        {({ language }) => (
          <section
            id={exp.id}
            className={`exp-detail ${mounted ? "exp-detail-enter" : ""}`}
          >
            <ExprienceDetailHeader
              title={exp.title}
              handleClose={this.handleClose}
              tags={exp.tags}
            />
            <main className="main-exp-detail">
              <div className="item location">
                <h1 className="icon">📍</h1>
                <span className="value">{exp.location}</span>
              </div>
              <div className="item date">
                <h1 className="icon">📅</h1>
                <span className="value">
                  {getTranslation("exp.date_link_from", language)}{" "}
                  {exp.startDate} {exp.endDate}
                </span>
              </div>
              <h2 className="sub-title">{exp.value}</h2>
              <div className="description">{exp.description}</div>
            </main>
          </section>
        )}
      </LanguageContext.Consumer>
    );
  }
}

interface ExpHeaderProps {
  title: string;
  tags: Tag[];
  handleClose: () => void;
}

class ExprienceDetailHeader extends React.Component<ExpHeaderProps> {
  render() {
    const { title, tags, handleClose } = this.props;

    return (
      <LanguageContext.Consumer>
        {({ language }) => (
          <header className="header-exp-detail">
            <nav className="nav-exp-detail">
              <h1 className="title">
                {getTranslation("exp.header.nav.title", language)}
              </h1>
              <button className="exp-button" onClick={handleClose}>
                ❌
              </button>
            </nav>
            <div className="content">
              <h1>{title}</h1>
              <div className="tags-list">
                {tags.map((tag) => {
                  return <TagThumbmail key={tag.id} tag={tag} />;
                })}
              </div>
            </div>
          </header>
        )}
      </LanguageContext.Consumer>
    );
  }
}
