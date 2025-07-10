import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/recipe?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-6">
      <div className="relative w-full max-w-3xl bg-mint rounded-[2rem] border-[12px] border-fridgeOutline p-6 sm:p-12 shadow-xl flex flex-col items-center">

        {/* 🧊 Fridge Handle */}
        <div className="absolute left-4 top-1/3 w-3 sm:w-4 h-24 sm:h-32 bg-white/80 rounded-full shadow-inner z-10"></div>

        {/* Fridge Text */}
        <h1 className="text-3xl sm:text-4xl font-bold text-fridgeText mb-4 tracking-wider uppercase">
          Tabetai
        </h1>

        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What's in your fridge?"
            className="flex-grow border border-gray-300 rounded-lg p-2"
          />
          <button
            type="submit"
            className="bg-fridgeText text-white px-4 py-2 rounded-lg shadow hover:bg-pink-600 transition"
          >
            Search
          </button>
        </form>

        {/* Fridge Magnet Buttons */}
        <div className="w-full flex flex-wrap justify-center gap-4 bg-cream p-6 rounded-2xl">
          <Link to="/recipe" className="magnet magnet-peach">All Recipes</Link>
          <Link to="/search" className="magnet magnet-yellow">My Recipes</Link>
          <Link to="/favorites" className="magnet magnet-lavender">Favorites</Link>
          <Link to="/login" className="magnet magnet-cream">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
