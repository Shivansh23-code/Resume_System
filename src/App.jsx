import React, { useState, useEffect } from "react";
import HeaderBar from "./components/HeaderBar";
import EditorPanel from "./components/EditorPanel";
import ResumePreview from "./components/ResumePreview";
import ExportControls from "./components/ExportControls";
import sampleData from "./data/sampleResume.json";
import { loadResumeState, saveResumeState } from "./utils/storage";
import "./css/globals.css";
import "./css/resume.css";

const App = () => {
  const savedState = loadResumeState();
  const initialData = savedState?.formData || {
    name: sampleData.basics?.name || "",
    role: sampleData.basics?.title || "",
    contact: sampleData.basics?.contact || "",
    summary: sampleData.basics?.summary || "",
    skills: sampleData.sections?.find(s => s.id === "skills")?.items || [],
    projects:
      sampleData.sections
        ?.find(s => s.id === "projects")
        ?.items.map(p => ({ title: p.title, description: p.summary, link: p.link || "" })) || [],
    internships: [],
    languages: [],
    education: "",
    certificates: "",
    achievements: "",
    awards: "",
    photo: "",
  };

  const initialTheme = savedState?.theme || localStorage.getItem("theme") || "light";

  const [formData, setFormData] = useState(initialData);
  const [theme, setTheme] = useState(initialTheme);

  // Apply theme to root element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Save state
  useEffect(() => {
    saveResumeState({ formData, theme });
  }, [formData, theme]);

  // Determine preview mode based on theme
  const previewTheme = theme === "light" ? "light" : "dark";

  return (
    <>
      <HeaderBar />
      <div className="container">
        <EditorPanel
          formData={formData}
          setFormData={setFormData}
          theme={theme}
          setTheme={setTheme}
        />
        <ResumePreview
          formData={formData}
          theme={previewTheme}
          isPDF={false}
        />
      </div>
      <ExportControls formData={formData} theme={theme} />
    </>
  );
};

export default App;
