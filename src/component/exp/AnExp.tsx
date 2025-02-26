import React from "react";
import { exp } from "../../types/exp/exp";

interface ExpProps {
  exp: exp;
  isHidden: boolean;
}

export class Exprience extends React.Component<ExpProps> {
  state = {
    isHidden: this.props.isHidden,
  };

  render() {
    const { exp } = this.props;
    const { isHidden } = this.state;

    return (
      <button id={exp.id} className={"exp" + isHidden ? "hidden" : ""}>
        <header>
          <h1>{exp.title}</h1>
          <div>tags</div>
        </header>
        <main>
          <div className="value">{exp.value}</div>
          <div className="location">
            <h1>📍</h1>
            <span>{exp.location}</span>
          </div>
          <div className="specialization">
            {exp.specialization.map((specialization) => {
              return <span>{specialization}</span>;
            })}
          </div>
          <div className="date">
            <h1>📅</h1>
            <span>
              {exp.startDate} à {exp.endDate}
            </span>
          </div>
        </main>
      </button>
    );
  }
}
