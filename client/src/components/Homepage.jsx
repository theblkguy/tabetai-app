import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    <div className="min-h-screen bg-yellow flex items-center justify-center">
      {/* Fridge Box */}
      <div className="w-[400px] h-[650px] bg-peach rounded-[3rem] border-[12px] border-white shadow-[0_10px_40px_rgba(0,0,0,0.2)] flex flex-col relative px-6 pt-10 pb-6">
        
        {/* Fridge Handle */}
        <div className="absolute left-[8px] top-1/2 -translate-y-1/2 w-[90px] h-[12px] bg-white border border-fridgeText rounded-full shadow-md" />

        {/* Logo + Tagline */}
        <div className="flex flex-col items-center mb-2">
          <h2 className="text-fridgeText text-6xl font-bold tracking-[0.4em] text-center mb-1">
            TABETAI
          </h2>
          <p className="text-fridgeText text-lg text-center">I want to eat!</p>
        </div>

        {/* Emoji Magnets */}
        <span className="absolute top-[180px] left-[120px] text-3xl hover:scale-125 transition-transform duration-200">🍣</span>
        <span className="absolute top-[230px] left-[160px] text-3xl hover:scale-125 transition-transform duration-200">🍱</span>
        <span className="absolute top-[210px] left-[220px] text-3xl hover:scale-125 transition-transform duration-200">🍙</span>
        <span className="absolute top-[290px] left-[190px] text-3xl hover:scale-125 transition-transform duration-200">🥠</span>
        <span className="absolute top-[270px] left-[140px] text-3xl hover:scale-125 transition-transform duration-200">🍇</span>
        <span className="absolute top-[180px] left-[250px] text-3xl hover:scale-125 transition-transform duration-200">🧊</span>
        <span className="absolute top-[260px] left-[260px] text-3xl hover:scale-125 transition-transform duration-200">🍮</span>
        <span className="absolute top-[320px] left-[150px] text-3xl hover:scale-125 transition-transform duration-200">🍪</span>
        <span className="absolute top-[160px] left-[200px] text-3xl hover:scale-125 transition-transform duration-200">🍔</span>
        <span className="absolute top-[310px] left-[220px] text-3xl hover:scale-125 transition-transform duration-200">🌮</span>
        <span className="absolute top-[340px] left-[180px] text-3xl hover:scale-125 transition-transform duration-200">🍬</span>

        {/* Spacer pushes search + nav to the bottom */}
        <div className="flex-1" />

        {/* Search Bar (now at the bottom, above the buttons) */}
       <div className="flex justify-center mb-6">
        <SearchBar
        value={query}
        onChange={setQuery}
        onSearch={handleSubmit} 
      />
      </div>


        {/* Navigation Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Link
            to="/login"
            className="bg-yellow rounded-[1.25rem] h-[80px] shadow-md flex items-center justify-center hover:scale-105 transition-transform text-fridgeText font-bold text-lg tracking-wide"
          >
            Login
          </Link>
          <Link
            to="/recipes"
            className="bg-lavender rounded-[1.25rem] h-[80px] shadow-md flex items-center justify-center hover:scale-105 transition-transform text-fridgeText font-bold text-lg tracking-wide"
          >
            Recipes
          </Link>
          <Link
            to="/favorites"
            className="bg-white rounded-[1.25rem] h-[80px] shadow-md flex items-center justify-center hover:scale-105 transition-transform text-fridgeText font-bold text-lg tracking-wide"
          >
            Favorites
          </Link>
          <Link
            to="/"
            className="bg-peach rounded-[1.25rem] h-[80px] shadow-md flex items-center justify-center hover:scale-105 transition-transform text-fridgeText font-bold text-lg tracking-wide"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
