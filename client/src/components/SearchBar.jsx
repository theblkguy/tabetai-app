import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";

function SearchBar({ userId }) {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!userId) return;
    fetch(`/api/users/${userId}/favorites`)
      .then((res) => res.json())
      .then(setFavorites);
  }, [userId]);

  const handleSearch = async () => {
    setError("");
    setRecipes([]);
    setSelectedRecipe(null);
    try {
      const res = await fetch(
        `/api/spoonacular/recipes?ingredients=${encodeURIComponent(query)}`
      );
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setRecipes(data);
    } catch {
      setError("Failed to fetch recipes.");
    }
  };

  const handleRecipeClick = async (id) => {
    setError("");
    try {
      const res = await fetch(`/api/spoonacular/recipes/${id}`);
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setSelectedRecipe(data);
    } catch {
      setError("Failed to fetch recipe details.");
    }
  };

  const handleFavorite = async (recipe) => {
    if (!userId) return;
    await fetch(`/api/users/${userId}/favorites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipe }),
    });
    // Refresh favorites
    fetch(`/api/users/${userId}/favorites`)
      .then((res) => res.json())
      .then(setFavorites);
  };

  return (
    <div>
      <div className="flex mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What's in your fridge?"
          className="px-3 py-2 rounded-l-lg border border-fridgeText text-fridgeText placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fridgeText w-[180px] text-sm"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="bg-white text-fridgeText font-semibold px-4 py-2 border border-l-0 border-fridgeText rounded-r-lg hover:bg-gray-100 transition-colors text-sm"
        >
          Let’s take a look
        </button>
      </div>
      <div className="mt-4">
        {error && <div className="text-red-500 text-center mb-2">{error}</div>}
        {selectedRecipe ? (
          <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-2">{selectedRecipe.title}</h2>
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.title}
              className="w-40 h-40 object-cover rounded mb-2"
            />
            {selectedRecipe.instructions ? (
              <div
                className="prose max-w-xs text-fridgeText mb-2"
                dangerouslySetInnerHTML={{
                  __html: selectedRecipe.instructions,
                }}
              />
            ) : (
              <div className="text-gray-500 mb-2">
                No instructions available.
              </div>
            )}
            <button
              onClick={() => setSelectedRecipe(null)}
              className="mt-2 px-4 py-2 bg-lavender text-white rounded-lg shadow hover:bg-peach transition-colors"
            >
              Back to results
            </button>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-4">
            {recipes.map((recipe) => (
              <li key={recipe.id}>
                <RecipeCard
                  recipe={recipe}
                  isFavorite={favorites.some((fav) => fav.id === recipe.id)}
                  onFavoriteToggle={handleFavorite}
                  onClick={() => handleRecipeClick(recipe.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
