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

  state: CategoryNavState = { isOpen: false };

  private navRef = React.createRef<HTMLElement>();

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
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

  getGroups(): Map<string, Category[]> {
    const groups = new Map<string, Category[]>();
    this.props.categories.forEach((cat) => {
      if (!groups.has(cat.tag)) groups.set(cat.tag, []);
      groups.get(cat.tag)!.push(cat);
    });
    return groups;
  }

  render() {
    const { selectedFilter, onFilterChange } = this.props;
    const { language } = this.context;
    const { isOpen } = this.state;
    const groups = this.getGroups();

    return (
      <nav ref={this.navRef} className={`category-nav${isOpen ? " open" : ""}`}>
        <button
          className={`button category-nav-toggle${isOpen ? " focus" : ""}`}
          onClick={() => this.setState({ isOpen: !isOpen })}
        >
          🌪️ {language === "fr" ? "Filtre" : "Filter"}
        </button>

        {isOpen && (
          <div className="category-nav-options">
            <label className="category-nav-item">
              <input
                type="radio"
                name="category-filter"
                checked={selectedFilter === null}
                onChange={() => onFilterChange(null)}
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
                      onChange={() => onFilterChange(groupFilterId)}
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
                          onChange={() => onFilterChange(cat.id)}
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
