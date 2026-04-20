import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import "/public/style/components/nav/nav.css";

// Convert to function component to use hooks
export function MainNav() {
  const location = useLocation();
  const [navigation, setNavigation] = React.useState<string | null>(null);

  const handleNavigation = (path: string) => {
    if (location.pathname !== path) {
      setNavigation(path);
    }
  };

  if (navigation) {
    return <Navigate to={navigation} />;
  }

  return (
    <nav className="nav main-nav fixed bottom-0 left-0 right-0 w-full md:left-1/2 md:right-auto md:w-auto md:-translate-x-1/2 flex justify-center gap-4 py-2 bg-transparent z-[999] hover:scale-105 md:hover:scale-105 transition-transform">
      <button
        className={(location.pathname === "/about" ? "focus" : "") + " button"}
        onClick={() => handleNavigation("/about")}
      >
        🏠
      </button>
      <button
        className={
          (location.pathname === "/contact" ? "focus" : "") + " button"
        }
        onClick={() => handleNavigation("/contact")}
      >
        👤
      </button>
      <button
        className={
          (location.pathname === "/work" ||
          location.pathname.startsWith("/work/")
            ? "focus"
            : "") + " button"
        }
        onClick={() => handleNavigation("/work")}
      >
        💼
      </button>
    </nav>
  );
}
