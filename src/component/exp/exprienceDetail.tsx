import React from "react";
import { ExpTranslated } from "../../types/exp/exp";
import { getTranslation, Language } from "../../languages/dic";
import { LanguageContext } from "../../context/LanguageContext";
import { Tag } from "../../types/exp/tag";
import { TagThumbmail } from "./tagThumbmail";
import { SkillDetail } from "./skillDetail";
import { SkillService } from "../../services/skillService";
import { ExpSkill } from "../../types/exp/skill";
import { ExpImage } from "../../types/exp/image";
import { ImageService } from "../../services/imageService";
import { sanitizeHtml } from "../../utils/htmlSanitizer";

interface ExpProps {
  exp: ExpTranslated;
  onClose: () => void;
  onImageClick: (expId: string) => void;
}

interface SkillTitles {
  [key: string]: string;
}

interface ExpState {
  closed: boolean;
  mounted: boolean;
  skillTitles: SkillTitles;
  currentSkillId: string | null;
  images: ExpImage[];
}

export class ExprienceDetail extends React.Component<ExpProps, ExpState> {
  static contextType = LanguageContext;
  declare context: React.ContextType<typeof LanguageContext>;

  state: ExpState = {
    closed: false,
    mounted: false,
    skillTitles: {},
    currentSkillId: null,
    images: [],
  };

  async componentDidMount() {
    this.triggerAnimation();
    await this.loadSkillTitles();
    await this.loadImages();
  }

  getSnapshotBeforeUpdate() {
    return this.context;
  }

  async componentDidUpdate(prevProps: ExpProps, snapshot: any) {
    const prevContext = snapshot;
    const needsUpdate =
      prevProps.exp.id !== this.props.exp.id ||
      prevContext.language !== this.context.language;

    if (needsUpdate) {
      this.setState({ mounted: false }, async () => {
        this.triggerAnimation();
        await this.loadSkillTitles();
        await this.loadImages();
      });
    }
  }

  shouldComponentUpdate(
    nextProps: ExpProps,
    nextState: ExpState,
    nextContext: any
  ) {
    return (
      this.props.exp.id !== nextProps.exp.id ||
      this.context.language !== nextContext.language ||
      this.state.mounted !== nextState.mounted ||
      this.state.closed !== nextState.closed ||
      this.state.currentSkillId !== nextState.currentSkillId ||
      JSON.stringify(this.state.skillTitles) !==
        JSON.stringify(nextState.skillTitles) ||
      this.state.images.length !== nextState.images.length
    );
  }

  // Cache skill titles by language
  private skillTitleCache = new Map<string, Map<Language, string>>();

  async loadSkillTitles() {
    const { exp } = this.props;
    const { language } = this.context;

    if (exp.skills) {
      const titles: SkillTitles = {};
      for (const skillId of Object.keys(exp.skills)) {
        // Check cache first
        if (!this.skillTitleCache.has(skillId)) {
          this.skillTitleCache.set(skillId, new Map());
        }
        const cache = this.skillTitleCache.get(skillId)!;

        if (!cache.has(language)) {
          const title = await SkillService.getSkillTitle(skillId, language);
          cache.set(language, title);
        }

        titles[skillId] = cache.get(language)!;
      }
      this.setState({ skillTitles: titles });
    }
  }

  async loadImages() {
    const images = await ImageService.getExpImages(this.props.exp.id);
    this.setState({ images });
  }

  triggerAnimation = () => {
    requestAnimationFrame(() => {
      this.setState({ mounted: true });
    });
  };

  handleClose = () => {
    this.setState({ closed: true });
    this.props.onClose();
  };

  toggleSkill = (skillId: string) => {
    this.setState((prevState) => ({
      currentSkillId: prevState.currentSkillId === skillId ? null : skillId,
    }));
  };

  render() {
    const { exp } = this.props;
    const { closed, mounted, images } = this.state;

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
              {images.length > 0 && (
                <button
                  className="image-button"
                  onClick={() => this.props.onImageClick(exp.id)}
                >
                  📸 ({images.length})
                </button>
              )}
              <h2
                className="sub-title"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(exp.value) }}
              />
              <div
                className="description"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(exp.description),
                }}
              />
              <div className="skills-section">
                <h3>{getTranslation("exp.skills.title", language)}</h3>
                <div className="skills-list">
                  {exp.skills &&
                    Object.entries(exp.skills as ExpSkill).map(
                      ([skillId, skillValue]) => (
                        <SkillDetail
                          key={skillId}
                          skillId={skillId}
                          value={skillValue[language] || ""}
                          title={this.state.skillTitles[skillId] || skillId}
                          isExpanded={this.state.currentSkillId === skillId}
                          onToggle={() => this.toggleSkill(skillId)}
                        />
                      )
                    )}
                </div>
              </div>
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
