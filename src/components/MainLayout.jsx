import React, { useState, useEffect } from "react";
import HeaderBar from "./HeaderBar";
import EditorPanel from "./EditorPanel";
import ResumePreview from "./ResumePreview";
import ExportControls from "./ExportControls";
import ThemeSelector from "./ThemeSelector";
import "../css/globals.css";
import "../css/resume.css";

const MainLayout = () => {
  const [theme, setTheme] = useState("modern");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const [formData, setFormData] = useState({
    name: "Shivansh Tiwari",
    role: "Full Stack Developer",
    summary:
      "Passionate about creating intelligent systems that bridge AI and human productivity. Experienced in React, Spring Boot, and automation-based architectures.",
    skills: ["React", "Spring Boot", "MySQL", "FastAPI", "AI Integration"],
    projects: [
      { title: "MindivaOS", description: "AI-first personal operating system" },
      { title: "Synthica", description: "AI privacy and productivity platform" },
    ],
  });

  return (
    <div className="main-layout">
      <HeaderBar />
      <ThemeSelector theme={theme} setTheme={setTheme} />

      <div className="content-area">
        <EditorPanel formData={formData} setFormData={setFormData} />
        <ResumePreview formData={formData} />
      </div>

      <ExportControls />
    </div>
  );
};

export default MainLayout;
