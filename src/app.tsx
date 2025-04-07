import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AboutView } from "./view/about/aboutView";
import { LanguageProvider } from "./context/LanguageContext";
import { ContactView } from "./view/contact/contactView";
import { WorkView } from "./view/work/workView";

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Routes>
          <Route path="/about" element={<AboutView />} />
          <Route path="/contact" element={<ContactView />} />
          <Route path="/work/:expId?" element={<WorkView />} />
          <Route path="/" element={<Navigate to="/about" replace />} />
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  );
}
