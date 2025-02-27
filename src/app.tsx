import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AboutView } from "./view/about/aboutView";
import { LanguageProvider } from "./context/LanguageContext";
import { ContactView } from "./view/contact/contactView";

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/about" />} />
          <Route path="/about" element={<AboutView />} />
          <Route path="/contact" element={<ContactView />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;
