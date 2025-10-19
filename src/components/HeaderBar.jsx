import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/globals.css";
import "../css/resume.css";

const HeaderBar = () => {
  const navigate = useNavigate();

  return (
    <header className="header-bar glass-card">
      <div className="header-left">
        <h1 className="brand">
          Resume<span>System</span>
        </h1>
      </div>

      <nav className="nav-links">
        <Link to="/preview">Preview</Link>
        <Link to="/customize">Customize</Link>
        <Link to="/export">Export</Link>
      </nav>

      <div className="header-right">
        <button
          className="btn-gradient"
          onClick={() => navigate("/login")}
        >
          Join Us
        </button>
      </div>
    </header>
  );
};

export default HeaderBar;
