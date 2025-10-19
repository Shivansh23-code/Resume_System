import html2pdf from "html2pdf.js";
import "../css/globals.css";
import "../css/resume.css";

const ExportControls = ({ formData }) => {
  const exportPDF = () => {
    const preview = document.querySelector(".resume-preview");
    if (!preview) return alert("No resume preview found");

    // Clone resume preview to avoid altering live DOM
    const clone = preview.cloneNode(true);

    // Inject clean, print-safe light mode styles
    const style = document.createElement("style");
    style.textContent = `
      .resume-export-light {
        background: #ffffff !important;
        color: #000000 !important;
        font-family: 'Roboto', 'Open Sans', Arial, sans-serif !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        padding: 24px !important;
        box-shadow: none !important;
      }
      .resume-export-light * {
        background: transparent !important;
        color: #000000 !important;
        box-shadow: none !important;
        filter: none !important;
        text-shadow: none !important;
      }

      /* Section headings */
      .resume-export-light h1,
      .resume-export-light h2,
      .resume-export-light h3 {
        font-weight: 600 !important;
        color: #111 !important;
        margin-bottom: 6px !important;
      }

      /* Section layout */
      .resume-export-light section {
        margin-bottom: 12px !important;
      }

      /* Tables (Education section) */
      .resume-export-light table {
        width: 100% !important;
        border-collapse: collapse !important;
        margin-top: 8px !important;
        table-layout: fixed !important;
      }
      .resume-export-light table td,
      .resume-export-light table th {
        border: 1px solid #ddd !important;
        padding: 6px 8px !important;
        vertical-align: top !important;
      }

      /* Lists */
      .resume-export-light ul,
      .resume-export-light ol {
        margin: 0 0 8px 18px !important;
        padding: 0 !important;
      }

      /* Page breaks */
      .resume-export-light .page-break {
        page-break-before: always !important;
        break-before: page !important;
        height: 0 !important;
        margin: 0 !important;
        border: 0 !important;
      }

      /* Hide undefined or placeholder-like text */
      .resume-export-light input[readonly],
      .resume-export-light textarea[readonly] {
        border: none !important;
        background: transparent !important;
        padding: 0 !important;
        font-size: 0.95rem !important;
      }
    `;
    clone.prepend(style);
    clone.classList.add("resume-export-light");

    // Clean up dark theme artifacts
    clone.querySelectorAll("*").forEach((el) => {
      el.style.background = "transparent";
      el.style.color = "#000";
      el.style.boxShadow = "none";
      el.style.filter = "none";
    });

    // Replace <!-- PageBreak --> comments with divs
    clone.querySelectorAll("*").forEach((el) => {
      if (el.innerHTML && typeof el.innerHTML === "string") {
        el.innerHTML = el.innerHTML.replace(
          /<!--\s*PageBreak\s*-->/gi,
          '<div class="page-break"></div>'
        );
      }
    });

    // Remove undefined or ☐ text
    clone.querySelectorAll("*").forEach((el) => {
      if (el.childNodes && el.childNodes.length) {
        el.childNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = node.textContent.replace(/undefined|☐/g, "");
          }
        });
      }
    });

    // PDF export configuration
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: "Resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(clone).save();
  };

  const exportJSON = () => {
    if (!formData) return alert("No data found!");
    const blob = new Blob([JSON.stringify(formData, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Resume.json";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="export-controls glass-card">
      <button onClick={exportPDF} className="export-btn pdf">
        📄 Export PDF
      </button>
      <button onClick={exportJSON} className="export-btn json">
        🗂 Export JSON
      </button>
    </div>
  );
};

export default ExportControls;
