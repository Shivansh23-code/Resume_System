import React, { useState } from "react";
import "../css/globals.css";
import "../css/resume.css";
import { saveResumeState, loadResumeState } from "../utils/storage";

const EditorPanel = ({ formData = {}, setFormData, theme, setTheme }) => {
  const projects = formData.projects || [];
  const skills = formData.skills || [];
  const internships = formData.internships || [];
  const languages = formData.languages || [];
  const educationList = formData.education || [];

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setFormData({ ...formData, photo: reader.result });
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillsChange = (e) => {
    setFormData({ ...formData, skills: e.target.value.split(",").map(s => s.trim()) });
  };

  const handleLanguagesChange = (e) => {
    setFormData({ ...formData, languages: e.target.value.split(",").map(l => l.trim()) });
  };

  const handleProjectChange = (index, key, value) => {
    const newProjects = [...projects];
    newProjects[index][key] = value;
    setFormData({ ...formData, projects: newProjects });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...projects, { title: "", description: "", link: "" }],
    });
  };

  const removeProject = (index) => {
    const newProjects = projects.filter((_, i) => i !== index);
    setFormData({ ...formData, projects: newProjects });
  };

  const handleInternshipChange = (index, key, value) => {
    const newInternships = [...(formData.internships || [])];
    newInternships[index][key] = value;
    setFormData({ ...formData, internships: newInternships });
  };

  const addInternship = () => {
    setFormData({
      ...formData,
      internships: [...(formData.internships || []), { title: "", company: "", duration: "" }],
    });
  };

  const removeInternship = (index) => {
    const newInternships = (formData.internships || []).filter((_, i) => i !== index);
    setFormData({ ...formData, internships: newInternships });
  };

  const handleEducationChange = (index, key, value) => {
    const newEducation = [...educationList];
    newEducation[index][key] = value;
    setFormData({ ...formData, education: newEducation });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...educationList, { graduation: "", schooling: "", scores: "", years: "" }],
    });
  };

  const removeEducation = (index) => {
    const newEducation = educationList.filter((_, i) => i !== index);
    setFormData({ ...formData, education: newEducation });
  };

  const handleSave = () => {
    saveResumeState(formData);
    alert("Changes saved successfully!");
  };

  const handleClear = () => {
    const emptyData = {
      name: "", role: "", contact: "", summary: "",
      skills: [], languages: [], projects: [], internships: [], education: [],
      certificates: "", achievements: "", awards: "", photo: ""
    };
    setFormData(emptyData);
    saveResumeState(emptyData);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="editor-panel glass-card">
      <input type="file" accept="image/*" onChange={handlePhotoUpload} />
      <h2 className="panel-title">Customize Your Resume</h2>

      <div className="form-group">
        <label>Name</label>
        <input type="text" name="name" value={formData.name || ""} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Role / Title</label>
        <input type="text" name="role" value={formData.role || ""} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Contact Info</label>
        <input type="text" name="contact" value={formData.contact || ""} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Professional Summary</label>
        <textarea name="summary" value={formData.summary || ""} onChange={handleChange} rows="4" />
      </div>

      <div className="form-group">
        <label>Skills (comma separated)</label>
        <input type="text" value={skills.join(", ")} onChange={handleSkillsChange} />
      </div>

      <div className="form-group">
        <label>Languages (comma separated)</label>
        <input type="text" value={languages.join(", ")} onChange={handleLanguagesChange} />
      </div>

      {/* Projects Section */}
      <div className="form-group">
        <label>Projects</label>
        {projects.length === 0 && <p className="empty-text">No projects added yet</p>}
        {projects.map((p, i) => (
          <div key={i} className="project-item-editor">
            <input type="text" placeholder="Project Title" value={p.title || ""} onChange={(e) => handleProjectChange(i, "title", e.target.value)} />
            <input type="text" placeholder="Project Description" value={p.description || ""} onChange={(e) => handleProjectChange(i, "description", e.target.value)} />
            <input type="url" placeholder="Project Link" value={p.link || ""} onChange={(e) => handleProjectChange(i, "link", e.target.value)} />
            <button className="btn-remove-project" onClick={() => removeProject(i)}>Remove Project</button>
          </div>
        ))}
        <button className="btn-add-project" onClick={addProject}>+ Add Project</button>
      </div>

      {/* Internships Section */}
      <div className="form-group">
        <label>Internships</label>
        {internships.length === 0 && <p className="empty-text">No internships added yet</p>}
        {internships.map((i, idx) => (
          <div key={idx} className="project-item-editor">
            <input type="text" placeholder="Internship Title" value={i.title || ""} onChange={(e) => handleInternshipChange(idx, "title", e.target.value)} />
            <input type="text" placeholder="Company" value={i.company || ""} onChange={(e) => handleInternshipChange(idx, "company", e.target.value)} />
            <input type="text" placeholder="Duration" value={i.duration || ""} onChange={(e) => handleInternshipChange(idx, "duration", e.target.value)} />
            <button className="btn-remove-project" onClick={() => removeInternship(idx)}>Remove Internship</button>
          </div>
        ))}
        <button className="btn-add-project" onClick={addInternship}>+ Add Internship</button>
      </div>

      {/* Education Section */}
      <div className="form-group">
        <label>Education</label>
        {educationList.length === 0 && <p className="empty-text">No education added yet</p>}
        {educationList.map((edu, idx) => (
          <div key={idx} className="education-item-editor">
            <input type="text" placeholder="Academic Status" value={edu.graduation || ""} onChange={(e) => handleEducationChange(idx, "graduation", e.target.value)} className="editor-field"/>
            <input type="text" placeholder="Institute / School" value={edu.schooling || ""} onChange={(e) => handleEducationChange(idx, "schooling", e.target.value)} className="editor-field"/>
            <input type="text" placeholder="Scores (GPA Out Of 10)" value={edu.scores || ""} onChange={(e) => handleEducationChange(idx, "scores", e.target.value)} className="editor-field"/>
            <input type="text" placeholder="Years" value={edu.years || ""} onChange={(e) => handleEducationChange(idx, "years", e.target.value)} className="editor-field"/>
            <button className="btn-remove-project" onClick={() => removeEducation(idx)}>Remove</button>
          </div>
        ))}
        <button className="btn-add-project" onClick={addEducation}>+ Add Education</button>
      </div>

      {/* Certificates */}
      <div className="form-group">
        <label>Certificates</label>
        <textarea name="certificates" value={formData.certificates || ""} onChange={handleChange} rows="2" />
      </div>

      {/* Achievements */}
      <div className="form-group">
        <label>Achievements</label>
        <textarea name="achievements" value={formData.achievements || ""} onChange={handleChange} rows="2" />
      </div>

      {/* Awards */}
      <div className="form-group">
        <label>Awards</label>
        <textarea name="awards" value={formData.awards || ""} onChange={handleChange} rows="2" />
      </div>

      <div className="editor-footer">
        <button className="btn-gradient save-btn" onClick={handleSave}>Save Changes</button>
        <button className="btn-clear" onClick={handleClear}>Clear Form</button>
        <button className="btn-theme" onClick={toggleTheme}>
          Toggle Theme ({theme === "dark" ? "Dark" : "Light"})
        </button>
      </div>
    </div>
  );
};

export default EditorPanel;
