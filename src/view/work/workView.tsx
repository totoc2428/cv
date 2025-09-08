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
import { useParams, useNavigate } from "react-router-dom";

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

interface WorkViewProps {
  params?: {
    expId?: string;
  };
  navigate?: (path: string) => void;
}

export class WorkView extends React.Component<WorkViewProps, WorkViewState> {
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

  shouldComponentUpdate(
    nextProps: WorkViewProps,
    nextState: WorkViewState,
    nextContext: any
  ) {
    return (
      this.state.exps.length !== nextState.exps.length ||
      this.state.currentExp?.id !== nextState.currentExp?.id ||
      this.state.error !== nextState.error ||
      this.state.carousel.isOpen !== nextState.carousel.isOpen ||
      this.context.language !== nextContext.language ||
      this.props.params?.expId !== nextProps.params?.expId
    );
  }

  async componentDidMount(): Promise<void> {
    try {
      const { language } = this.context;
      const experiences = await ExpService.getExps(language);

      // Préchargement des images pour une meilleure expérience utilisateur
      experiences.forEach((exp) => {
        ImageService.preloadExpImages(exp.id);
      });

      // Gestion explicite du undefined avec ??
      const currentExp = this.props.params?.expId
        ? experiences.find((exp) => exp.id === this.props.params?.expId) ?? null
        : null;

      this.setState({
        exps: experiences,
        currentExp,
        error: null,
      });
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

  async componentDidUpdate(
    prevProps: WorkViewProps,
    prevState: WorkViewState,
    snapshot: any
  ): Promise<void> {
    const prevContext = snapshot.context;
    const languageChanged = this.context.language !== prevContext?.language;
    const expIdChanged =
      this.props.params?.expId !== snapshot.prevProps.params?.expId;

    if (languageChanged) {
      try {
        ExpService.clearCache();
        const experiences = await ExpService.getExps(this.context.language);

        // Update current experience with new translation if one is selected
        const updatedCurrentExp = this.state.currentExp
          ? experiences.find((exp) => exp.id === this.state.currentExp?.id) ??
            null
          : null;

        this.setState({
          exps: experiences,
          currentExp: updatedCurrentExp,
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

    // Handle URL parameter changes
    if (expIdChanged && this.state.exps.length > 0) {
      const expId = this.props.params?.expId;
      if (expId) {
        const foundExp = this.state.exps.find((exp) => exp.id === expId);
        if (foundExp) {
          ImageService.preloadExpImages(foundExp.id);
          this.setState({ currentExp: foundExp });
        } else {
          // If expId doesn't exist, redirect to /work
          this.props.navigate?.("/work");
          this.setState({ currentExp: null });
        }
      } else {
        // If no expId in URL, close detail view
        this.setState({ currentExp: null });
      }
    }
  }

  getSnapshotBeforeUpdate(prevProps: WorkViewProps) {
    return {
      context: this.context,
      prevProps: prevProps,
    };
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

  handleExpClick = (exp: ExpTranslated) => {
    // Précharger les images de l'expérience sélectionnée
    ImageService.preloadExpImages(exp.id);
    this.props.navigate?.(`/work/${exp.id}`);
    this.setState({ currentExp: exp });
  };

  handleClose = () => {
    this.props.navigate?.("/work");
    this.setState({ currentExp: null });
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
                isActive={currentExp?.id === exp.id}
                handleOnClick={() => this.handleExpClick(exp)}
              />
            ))}
          </div>
          {currentExp && (
            <ExprienceDetail
              exp={currentExp}
              onClose={this.handleClose}
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

// Wrapper pour obtenir les paramètres d'URL
export default function WorkViewWrapper() {
  const params = useParams();
  const navigate = useNavigate();
  return <WorkView params={params} navigate={navigate} />;
}
