import React from "react";
import "../css/globals.css";
import "../css/resume.css";

const ResumePreview = ({ formData, isPDF = false }) => {
  const sanitizeText = (text) => (text ? text.toString().trim() : "—");
  const capitalize = (text) => {
    const safeText = sanitizeText(text);
    if (safeText === "—") return safeText;
    return safeText.replace(/\b\w/g, (l) => l.toUpperCase());
  };
  const renderList = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) return <li>—</li>;
    return arr.map((item, i) => <li key={i}>{capitalize(item)}</li>);
  };
  const renderItems = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) return <p>—</p>;
    return arr.map((item, i) => (
      <div key={i} className="project-item">
        <h4>{capitalize(item.title)}</h4>
        {item.company && <p>{capitalize(item.company)}</p>}
        {item.description && <p>{sanitizeText(item.description)}</p>}
        {item.duration && <p>{sanitizeText(item.duration)}</p>}
        {item.link && (
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            {item.link}
          </a>
        )}
      </div>
    ));
  };

  return (
    <div
      className="resume-preview"
      style={{
        color: "#000",
        background: "#fff",
      }}
    >
      <section className="section header-section">
        <div className="resume-header">
          {formData.photo && (
            <img
              src={formData.photo}
              alt="Profile"
              className="profile-photo"
            />
          )}
          <div className="name-role">
            <input
              type="text"
              readOnly
              value={capitalize(formData.name)}
              className="editor-field"
            />
            <input
              type="text"
              readOnly
              value={capitalize(formData.role)}
              className="editor-field"
            />
            {formData.contact && (
              <input
                type="text"
                readOnly
                value={sanitizeText(formData.contact)}
                className="editor-field"
              />
            )}
          </div>
        </div>
      </section>

      <section className="section summary-section">
        <h3>Professional Summary</h3>
        <textarea
          readOnly
          value={sanitizeText(formData.summary)}
          className="editor-field"
        />
      </section>

      <section className="section skills-section">
        <h3>Skills</h3>
        <ul>{renderList(formData.skills)}</ul>
      </section>

      <section className="section languages-section">
        <h3>Languages Known</h3>
        <ul>{renderList(formData.languages)}</ul>
      </section>

      <div className="page-break"></div>

      <section className="section certificates-section">
        <h3>Certificates</h3>
        <textarea
          readOnly
          value={sanitizeText(formData.certificates)}
          className="editor-field"
        />
      </section>

      <section className="section achievements-section">
        <h3>Achievements</h3>
        <textarea
          readOnly
          value={sanitizeText(formData.achievements)}
          className="editor-field"
        />
      </section>

      <section className="section education-section">
        <h3>Education</h3>
        {(!Array.isArray(formData.education) ||
          formData.education.length === 0) && <p>—</p>}
        {Array.isArray(formData.education) &&
          formData.education.map((edu, idx) => (
            <table key={idx} className="education-table">
              <tbody>
                <tr>
                  <td>Academic Status:</td>
                  <td>{sanitizeText(edu.graduation)}</td>
                </tr>
                <tr>
                  <td>Institute / School:</td>
                  <td>{sanitizeText(edu.schooling)}</td>
                </tr>
                <tr>
                  <td>(GPA Out Of 10):</td>
                  <td>{sanitizeText(edu.scores)}</td>
                </tr>
                <tr>
                  <td>Years:</td>
                  <td>{sanitizeText(edu.years)}</td>
                </tr>
              </tbody>
            </table>
          ))}
      </section>

      <section className="section internships-section">
        <h3>Internships</h3>
        {renderItems(formData.internships)}
      </section>

      <div className="page-break"></div>

      <section className="section projects-section">
        <h3>Projects</h3>
        {renderItems(formData.projects)}
      </section>

      <section className="section awards-section">
        <h3>Awards & Honors</h3>
        <textarea
          readOnly
          value={sanitizeText(formData.awards)}
          className="editor-field"
        />
      </section>
    </div>
  );
};

export default ResumePreview;
