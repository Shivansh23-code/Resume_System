import React from "react";
import "../css/globals.css";
import "../css/resume.css";

const FieldInput = ({ label, type = "text", value, onChange, placeholder }) => {
  return (
    <div className="field-input">
      <label>{label}</label>
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows="3"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default FieldInput;
