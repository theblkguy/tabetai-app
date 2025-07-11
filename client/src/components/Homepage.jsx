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
    
      <div className="min-h-screen bg-orange-200 pt-20 flex items-center justify-center">
        {/* Fridge Box */}
        <div className="w-[400px] h-[650px] bg-green-200 rounded-[3rem] border-[12px] border-white shadow-[0_10px_40px_rgba(0,0,0,0.2)] flex flex-col relative px-6 pt-10 pb-6">

          {/* Fridge Handle */}
          <div className="absolute left-[8px] top-1/2 -translate-y-1/2 w-[90px] h-[12px] bg-white border border-gray-800 rounded-full shadow-md" />

          {/* Logo + Tagline */}
          <div className="flex flex-col items-center mb-2">
            <h2 className="text-gray-800 text-6xl font-bold tracking-[0.1em] text-center mb-1">
              TABETAI
            </h2>
            <p className="text-gray-800 text-lg text-center">I want to eat!</p>
          </div>

          {/* Emoji Magnets */}
          {[
            { emoji: "🍣", top: 180, left: 120 },
            { emoji: "🍱", top: 230, left: 160 },
            { emoji: "🍙", top: 210, left: 220 },
            { emoji: "🥠", top: 290, left: 190 },
            { emoji: "🍇", top: 270, left: 140 },
            { emoji: "🧊", top: 180, left: 250 },
            { emoji: "🍮", top: 260, left: 260 },
            { emoji: "🍪", top: 320, left: 150 },
            { emoji: "🍔", top: 160, left: 200 },
            { emoji: "🌮", top: 310, left: 220 },
            { emoji: "🍬", top: 340, left: 180 },
          ].map(({ emoji, top, left }, i) => (
            <span
              key={i}
              className="absolute text-3xl hover:scale-125 transition-transform duration-200"
              style={{ top: `${top}px`, left: `${left}px` }}
            >
              {emoji}
            </span>
          ))}

          {/* Spacer pushes search to the bottom */}
          <div className="flex-20" />

          {/* Search Bar */}
          <div className="flex justify-center mb-6">
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
