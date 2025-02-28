import React from "react";
import { Exp } from "../../types/exp/exp";
import { getTranslation } from "@/languages/dic";
import { LanguageContext } from "@/context/LanguageContext";
import { Tag } from "@/types/exp/tag";
import { TagThumbmail } from "./tagThumbmail";

interface ExpProps {
  exp: Exp;
}

export class ExprienceDetail extends React.Component<ExpProps> {

  state = {
    closed: false
  }

  handleClose = () =>{
    this.setState({closed: true});
  }
  
  render() {
    const { exp } = this.props;
    const { closed } = this.state;

    if (closed) {
      return null;
    }

    return (
      <LanguageContext.Consumer>
        {({ language }) => (
          <section id={exp.id} className="exp-detail">
            <ExprienceDetailHeader title={exp.title} handleClose={this.handleClose} tags={exp.tags}/>
            <main>
              <div className="value">{exp.value}</div>
              <div className="location">
                <h1>📍</h1>
                <span>{exp.location}</span>
              </div>
              <div className="specialization">
                {exp.specialization.map((specialization) => {
                  return <span key={specialization}>{specialization}</span>;
                })}
              </div>
              <div className="date">
                <h1>📅</h1>
                <span>
                  {exp.startDate} {getTranslation("exp.date_link_btw", language)} {exp.endDate}
                </span>
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
    const {title, tags } = this.props;

    return ( 
      <LanguageContext.Consumer>
        {({ language }) => (
            <header>
              <nav>
                <h1>{getTranslation("exp.header.nav.title",language)}</h1>
                <button>❌</button>
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