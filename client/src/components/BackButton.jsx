import React from "react";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="mb-4 px-4 py-2 bg-lavender rounded shadow hover:bg-peach transition-colors"
      style={{ alignSelf: "flex-start", color: "black" }}
      aria-label="Go back"
    >
      ← <span style={{ marginLeft: '4px' }}>Back</span>
    </button>
  );
}

export default BackButton;
