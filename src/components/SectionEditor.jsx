import React, { useState } from "react";
import FieldInput from "./FieldInput";
import "../css/resume.css";

const SectionEditor = ({ title, fields }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="section-editor glass-card">
      <div className="section-header" onClick={() => setOpen(!open)}>
        <h3>{title}</h3>
        <span className={`arrow ${open ? "open" : ""}`}>▼</span>
      </div>

      {open && (
        <div className="section-body">
          {fields.map((field, index) => (
            <FieldInput
              key={index}
              label={field.label}
              type={field.type}
              value={field.value}
              onChange={field.onChange}
              placeholder={field.placeholder}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionEditor;
