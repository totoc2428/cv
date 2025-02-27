import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AboutView } from "./view/about/aboutView";
import { LanguageProvider } from "./context/LanguageContext";
import { ContactView } from "./view/contact/contactView";
import { WorkView } from "./view/work/workView";

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/about" />} />
          <Route path="/about" element={<AboutView />} />
          <Route path="/contact" element={<ContactView />} />
          <Route path="/work" element={<WorkView />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;
