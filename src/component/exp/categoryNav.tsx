import React from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { Category } from "../../types/exp/category";
import "/public/style/components/exp/categoryNav.css";

interface CategoryNavProps {
  categories: Category[];
  selectedFilter: string | null;
  onFilterChange: (filter: string | null) => void;
}

interface CategoryNavState {
  isOpen: boolean;
  isRendered: boolean;
}

const GROUP_LABELS: Record<string, { fr: string; en: string }> = {
  school: { fr: "Formation", en: "Education" },
  "work-project": { fr: "Professionnel", en: "Professional" },
};

export class CategoryNav extends React.Component<
  CategoryNavProps,
  CategoryNavState
> {
  static contextType = LanguageContext;
  declare context: React.ContextType<typeof LanguageContext>;

  private closeTimer: number | null = null;

  state: CategoryNavState = { isOpen: false, isRendered: false };

  private navRef = React.createRef<HTMLElement>();

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
    if (this.closeTimer !== null) {
      window.clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }

  handleClickOutside = (event: MouseEvent) => {
    if (
      this.state.isOpen &&
      this.navRef.current &&
      !this.navRef.current.contains(event.target as Node)
    ) {
      this.setState({ isOpen: false });
    }
  };

  closeMenu = () => {
    this.setState({ isOpen: false });

    if (this.closeTimer !== null) {
      window.clearTimeout(this.closeTimer);
    }

    this.closeTimer = window.setTimeout(() => {
      this.setState({ isRendered: false });
      this.closeTimer = null;
    }, 300);
  };

  openMenu = () => {
    if (this.closeTimer !== null) {
      window.clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }

    this.setState({ isRendered: true }, () => {
      window.requestAnimationFrame(() => {
        this.setState({ isOpen: true });
      });
    });
  };

  handleFilterSelect = (filter: string | null) => {
    this.props.onFilterChange(filter);
    this.closeMenu();
  };

  getGroups(): Map<string, Category[]> {
    const groups = new Map<string, Category[]>();
    this.props.categories.forEach((cat) => {
      if (!groups.has(cat.tag)) groups.set(cat.tag, []);
      groups.get(cat.tag)!.push(cat);
    });
    return groups;
  }

  render() {
    const { selectedFilter } = this.props;
    const { language } = this.context;
    const { isOpen, isRendered } = this.state;
    const groups = this.getGroups();

    return (
      <nav
        ref={this.navRef}
        className={`category-nav${isOpen ? " open" : ""}${isRendered ? " rendered" : ""}`}
      >
        <button
          className={`button category-nav-toggle${isOpen ? " focus" : ""}`}
          onClick={() => (isOpen ? this.closeMenu() : this.openMenu())}
        >
          🌪️ {language === "fr" ? "Filtre" : "Filter"}
        </button>

        {isRendered && (
          <div className="category-nav-mobile-header">
            <span className="category-nav-mobile-title">
              🌪️ {language === "fr" ? "Filtre" : "Filter"}
            </span>
            <button
              className="button category-nav-close"
              onClick={this.closeMenu}
              aria-label={language === "fr" ? "Fermer" : "Close"}
            >
              ✕
            </button>
          </div>
        )}

        {isRendered && (
          <div className="category-nav-options">
            <label className="category-nav-item">
              <input
                type="radio"
                name="category-filter"
                checked={selectedFilter === null}
                onChange={() => this.handleFilterSelect(null)}
              />
              <span>{language === "fr" ? "Tout" : "All"}</span>
            </label>

            {Array.from(groups.entries()).map(([tag, cats]) => {
              const groupLabel = GROUP_LABELS[tag];
              const groupFilterId = `group:${tag}`;

              return (
                <div key={tag} className="category-group">
                  <label className="category-nav-item category-group-header">
                    <input
                      type="radio"
                      name="category-filter"
                      checked={selectedFilter === groupFilterId}
                      onChange={() => this.handleFilterSelect(groupFilterId)}
                    />
                    <span>{groupLabel ? groupLabel[language] : tag}</span>
                  </label>
                  <div className="category-subgroup">
                    {cats.map((cat) => (
                      <label
                        key={cat.id}
                        className="category-nav-item category-sub-item"
                      >
                        <input
                          type="radio"
                          name="category-filter"
                          checked={selectedFilter === cat.id}
                          onChange={() => this.handleFilterSelect(cat.id)}
                        />
                        <span>{cat.title[language]}</span>
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </nav>
    );
  }
}
