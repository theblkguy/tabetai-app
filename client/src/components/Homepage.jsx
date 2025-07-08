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
    <div className="homepage">
      <h1>🍱 Welcome to Tabetai 🍱</h1>

      <p><strong>Tabetai</strong> means "I want to eat" in Japanese and that's exactly what this app is here for!</p>

      <p>This app helps you:</p>
      <ul>
        <li>✅ Reduce food waste by using what you already have</li>
        <li>✅ Save time by skipping endless recipe scrolls</li>
        <li>✅ Stay creative and inspired in the kitchen</li>
        <li>✅ Cook meals that reflect your culture and dietary needs</li>
      </ul>

      <hr />

      <h2>🔎 Start by searching for recipes</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter an ingredient (i.e. eggs, tofu)..."
        />
        <button type="submit">Search</button>
      </form>

      <hr />

      <h2>📂 Explore the app</h2>
      <nav>
        <ul>
          <li><Link to="/recipe">Search All Recipes</Link></li>
          <li><Link to="/search">My Recipes</Link></li>
          <li><Link to="/favorites">Favorite Recipes</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default HomePage;
