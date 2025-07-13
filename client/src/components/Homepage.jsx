import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

function HomePage() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (query.trim()) {
      navigate(`/recipes?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <>
      {/* ----- Full‑screen “kitchen” backdrop ----- */}
      <div className="min-h-screen bg-orange-200 pt-20 flex items-center justify-center">
        {/* ----- Fridge box ----- */}
        <div className="w-[400px] h-[650px] bg-green-200 rounded-[3rem] border-[12px] border-white shadow-[0_10px_40px_rgba(0,0,0,0.2)] flex flex-col relative px-6 pt-10 pb-6">

          {/* Fridge handle */}
          <div className="absolute left-[8px] top-1/2 -translate-y-1/2 w-[90px] h-[12px] bg-white border border-gray-800 rounded-full shadow-md" />

          {/* Logo + Tagline */}
          <div className="flex flex-col items-center mb-2">
            <h2 className="text-gray-800 text-6xl font-bold tracking-[0.1em] text-center mb-1">
              TABETAI
            </h2>
            <p className="text-gray-800 text-lg text-center">I want to eat!</p>
          </div>

          {/* ----------  RANDOM EMOJI MAGNETS ---------- */}
          {["🍣", "🍱", "🍙", "🥠", "🍇", "🧊", "🍮", "🍪", "🍔", "🌮", "🍬"].map(
            (emoji, i) => {
              // Random positions inside the fridge
              const top = Math.floor(Math.random() * 380) + 80;   // 80–460 px
              const left = Math.floor(Math.random() * 260) + 40;   // 40–300 px
              // Random font size for playful scaling
              const size = Math.floor(Math.random() * 16) + 20;    // 20–36 px

              return (
                <span
                  key={i}
                  className="absolute hover:scale-125 transition-transform duration-200"
                  style={{
                    top: `${top}px`,
                    left: `${left}px`,
                    fontSize: `${size}px`,
                  }}
                >
                  {emoji}
                </span>
              );
            }
          )}

          {/* Spacer pushes search + phrase toward the bottom */}
          <div className="flex-20" />

          {/* Phrase + SearchBar */}
          <div className="flex flex-col items-center gap-2 mb-6">
            <p className="text-fridgeText text-sm md:text-base text-center font-medium">
              Tell me what you have, I’ll do the rest.
            </p>
            <SearchBar
              value={query}
              onChange={setQuery}
              onSearch={handleSubmit}
            />
          </div>

        </div>
      </div>
    </>
  );
}

export default HomePage;
