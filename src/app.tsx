import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AboutView } from "./view/about/aboutView";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/about" />} />
          <Route path="/about" element={<AboutView />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
