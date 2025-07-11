import React, { useState } from "react";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [error, setError] = useState("");

  // TODO: For production, use environment variables or a secure config
  const apiKey = "4b8a76c19e3040e196981f3e979b833a";

  const handleSearch = async () => {
    setError("");
    setRecipes([]);
    setSelectedRecipe(null);
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(query)}&number=5&ranking=1&ignorePantry=true&apiKey=${apiKey}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setRecipes(data);
    } catch {
      setError("Failed to fetch recipes.");
    }
  };

  const handleRecipeClick = async (id) => {
    setError("");
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setSelectedRecipe(data);
    } catch {
      setError("Failed to fetch recipe details.");
    }
  };

  return (
    <div className="flex">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="What's in your fridge?"
        className="px-3 py-2 rounded-l-lg border border-fridgeText text-fridgeText placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fridgeText w-[180px] text-sm"
      />
      <button
        type="button"
        onClick={onSearch}
        className="bg-white text-fridgeText font-semibold px-4 py-2 border border-l-0 border-fridgeText rounded-r-lg hover:bg-gray-100 transition-colors text-sm"
      >
        Let’s take a look
      </button>
    </div>
  );
}

export default SearchBar;
