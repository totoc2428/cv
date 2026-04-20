import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AboutView } from "./view/about/aboutView";
import { LanguageProvider } from "./context/LanguageContext";
import { ContactView } from "./view/contact/contactView";
import WorkView from "./view/work/workView"; // Import du wrapper par défaut

const PAGE_TRANSITION_MS = 280;

function AppRoutesWithTransition() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = React.useState(location);
  const [transitionClass, setTransitionClass] = React.useState("route-fade-in");

  React.useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionClass("route-fade-out");
      const timeoutId = window.setTimeout(() => {
        setDisplayLocation(location);
        setTransitionClass("route-fade-in");
      }, PAGE_TRANSITION_MS);

      return () => window.clearTimeout(timeoutId);
    }
  }, [location, displayLocation]);

  return (
    <div className={`route-transition ${transitionClass}`}>
      <Routes location={displayLocation}>
        <Route path="/about" element={<AboutView />} />
        <Route path="/contact" element={<ContactView />} />
        <Route path="/work/:expId?" element={<WorkView />} />
        <Route path="/" element={<Navigate to="/about" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AppRoutesWithTransition />
      </LanguageProvider>
    </BrowserRouter>
  );
}
