import React from "react";
import { ExperienceThumbMail } from "../../component/exp/exprienceThumbmail";
import { Header } from "../../component/header/headerComponent";
import { LangNav } from "../../component/nav/langNav";
import { MainNav } from "../../component/nav/mainNav";
import { ExpService } from "../../services/expService";
import { ExpTranslated } from "../../types/exp/exp";
import { LanguageContext } from "../../context/LanguageContext";
import { ExprienceDetail } from "../../component/exp/exprienceDetail";
import { Loader } from "../../component/loader/loaderComponent";

import "../../../public/style/view/work.css";
import { ImageService } from "@/services/imageService";
import { Carousel } from "../../component/exp/carousel";

interface CarouselState {
  isOpen: boolean;
  images: string[];
  expId: string | null;
}

interface WorkViewState {
  exps: ExpTranslated[];
  currentExp: ExpTranslated | null;
  error: string | null;
  carousel: CarouselState;
}

export class WorkView extends React.Component<{}, WorkViewState> {
  static contextType = LanguageContext;
  declare context: React.ContextType<typeof LanguageContext>;

  state: WorkViewState = {
    exps: [],
    currentExp: null,
    error: null,
    carousel: {
      isOpen: false,
      images: [],
      expId: null,
    },
  };

  async componentDidMount(): Promise<void> {
    try {
      const { language } = this.context;
      if (this.state.exps.length === 0) {
        const experiences = await ExpService.getExps(language);
        this.setState({
          exps: experiences,
          error: null,
        });
      }
    } catch (error) {
      this.setState({
        error:
          this.context.language === "fr"
            ? "Erreur lors du chargement des expériences"
            : "Error loading experiences",
      });
      console.error("Error loading experiences:", error);
    }
  }

  async componentDidUpdate(snapshot: any): Promise<void> {
    const prevContext = snapshot;
    if (
      this.context.language !== prevContext?.language &&
      this.state.exps.length === 0
    ) {
      try {
        const experiences = await ExpService.getExps(this.context.language);
        this.setState({
          exps: experiences,
          error: null,
        });
      } catch (error) {
        this.setState({
          error:
            this.context.language === "fr"
              ? "Erreur lors du chargement des expériences"
              : "Error loading experiences",
        });
      }
    }
  }

  getSnapshotBeforeUpdate() {
    return this.context;
  }

  handleCarouselOpen = async (expId: string) => {
    try {
      const images = await ImageService.getExpImages(expId);
      this.setState({
        carousel: {
          isOpen: true,
          images: images.map((img) => img.url), // Convert ExpImage[] to string[]
          expId,
        },
      });
    } catch (error) {
      console.error("Error loading images:", error);
    }
  };

  handleCarouselClose = () => {
    this.setState({
      carousel: {
        isOpen: false,
        images: [],
        expId: null,
      },
    });
  };

  render() {
    const { exps, currentExp, error, carousel } = this.state;

    if (error) {
      return (
        <section className="work-container">
          <Header title="work" />
          <main className="main work-section">
            <div className="error-message">{error}</div>
          </main>
          <MainNav />
          <LangNav />
        </section>
      );
    }

    if (exps.length === 0) {
      return (
        <section className="work-container">
          <Header title="work" />
          <Loader />
          <MainNav />
          <LangNav />
        </section>
      );
    }

    return (
      <section className="work-container">
        <Header title="work" />
        <main className={`main work-section ${currentExp ? "open" : ""}`}>
          <div className="exp-list">
            {exps.map((exp) => (
              <ExperienceThumbMail
                key={exp.id}
                exp={exp}
                handleOnClick={() => this.setState({ currentExp: exp })}
              />
            ))}
          </div>
          {currentExp && (
            <ExprienceDetail
              exp={currentExp}
              onClose={() => this.setState({ currentExp: null })}
              onImageClick={this.handleCarouselOpen}
            />
          )}
          {carousel.isOpen && carousel.images.length > 0 && (
            <Carousel
              images={carousel.images}
              onClose={this.handleCarouselClose}
            />
          )}
        </main>
        <MainNav />
        <LangNav />
      </section>
    );
  }
}
