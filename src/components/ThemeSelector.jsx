import React from "react";
import "../css/resume.css";

const ThemeSelector = ({ theme, setTheme }) => {
  const themes = ["classic", "modern", "elegant"];

  const handleThemeChange = (t) => {
    setTheme(t);
    localStorage.setItem("theme", t);
    document.documentElement.setAttribute("data-theme", t);
  };

  return (
    <div className="theme-selector glass-card">
      <h3>🎨 Theme</h3>
      <div className="theme-options">
        {themes.map((t) => (
          <button
            key={t}
            className={`theme-btn ${theme === t ? "active" : ""}`}
            onClick={() => handleThemeChange(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
