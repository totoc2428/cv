import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AboutView } from "./view/about/aboutView";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { ContactView } from "./view/contact/contactView";
import WorkView from "./view/work/workView"; // Import du wrapper par défaut
import { getLanguageFromPathname } from "./languages/dic";

const PAGE_TRANSITION_MS = 280;

function AppRoutesWithTransition() {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const [displayLocation, setDisplayLocation] = React.useState(location);
  const [transitionClass, setTransitionClass] = React.useState("route-fade-in");

  const resolvePathFromLanguagePrefix = React.useCallback(
    (pathname: string) => {
      const pathWithoutLang = pathname.replace(/^\/(en|fr)(?=\/|$)/, "");
      const pathSegments = pathWithoutLang.split("/").filter(Boolean);
      const rootSegment = pathSegments[0];

      if (!rootSegment || rootSegment === "about") {
        return "/about";
      }

      if (rootSegment === "contact") {
        return "/contact";
      }

      if (rootSegment === "work") {
        return pathSegments.length > 1
          ? `/work/${pathSegments.slice(1).join("/")}`
          : "/work";
      }

      return "/about";
    },
    [],
  );

  const normalizedPathname = React.useMemo(() => {
    const pathWithoutLang = location.pathname.replace(/^\/(en|fr)(?=\/|$)/, "");
    return pathWithoutLang === "" ? "/" : pathWithoutLang;
  }, [location.pathname]);

  const isWorkRoute = normalizedPathname.startsWith("/work");

  React.useEffect(() => {
    const pathLanguage = getLanguageFromPathname(location.pathname);

    if (pathLanguage && pathLanguage !== language) {
      setLanguage(pathLanguage);
    }

    if (pathLanguage) {
      const targetPathname = resolvePathFromLanguagePrefix(location.pathname);
      const targetPath =
        targetPathname + (location.search || "") + (location.hash || "");
      const currentPath = location.pathname + location.search + location.hash;

      if (currentPath !== targetPath) {
        navigate(targetPath, { replace: true });
      }
    }
  }, [
    location.pathname,
    location.search,
    location.hash,
    language,
    setLanguage,
    navigate,
    resolvePathFromLanguagePrefix,
  ]);

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
    <div
      className={`route-transition ${transitionClass} ${isWorkRoute ? "route-transition--work" : ""}`}
    >
      <Routes location={displayLocation}>
        <Route path="/about" element={<AboutView />} />
        <Route path="/contact" element={<ContactView />} />
        <Route path="/work/:expId?" element={<WorkView />} />
        <Route path="/" element={<Navigate to="/about" replace />} />
        <Route path="*" element={<Navigate to="/about" replace />} />
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
