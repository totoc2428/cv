import React from "react";
import { Navigate } from "react-router-dom";

import "/public/style/components/nav/nav.css";

export class MainNav extends React.Component {
  state = {
    isAboutClicked: false,
    isContactClicked: false,
    isWorkClicked: false,
    isProjectClicked: false,
  };

  render() {
    const {
      isAboutClicked,
      isContactClicked,
      isProjectClicked,
      isWorkClicked,
    } = this.state;

    if (isAboutClicked) {
      return <Navigate to="/about" />;
    }
    if (isContactClicked) {
      return <Navigate to="/contact" />;
    }
    if (isWorkClicked) {
      return <Navigate to="/work" />;
    }
    if (isProjectClicked) {
      return <Navigate to="/project" />;
    }

    return (
      <nav className="nav main-nav">
        <button
          className={isAboutClicked ? "focus" : "" + " button"}
          onClick={() => {
            this.setState({ isAboutClicked: true });
          }}
        >
          🏠
        </button>
        <button
          className={isContactClicked ? "focus" : "" + " button"}
          onClick={() => {
            this.setState({ isContactClicked: true });
          }}
        >
          👤
        </button>
        <button
          className={isWorkClicked ? "focus" : "" + " button"}
          onClick={() => {
            this.setState({ isWorkClicked: true });
          }}
        >
          💼
        </button>
        <button
          className={isProjectClicked ? "focus" : "" + " button"}
          onClick={() => {
            this.setState({ isProjectClicked: true });
          }}
        >
          🪁
        </button>
      </nav>
    );
  }
}
