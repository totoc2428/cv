import React from "react";
import "../../../public/style/components/loader/loader.css";

export const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <div className="loader-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
