import React, { useState } from "react";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [error, setError] = useState("");

  // Use API key from .env (must start with REACT_APP_)
  const apiKey = process.env.REACT_APP_SPOONACULAR_KEY;

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
    <div>
      <div className="flex mb-4">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
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
            <img src={selectedRecipe.image} alt={selectedRecipe.title} className="w-40 h-40 object-cover rounded mb-2" />
            {selectedRecipe.instructions ? (
              <div className="prose max-w-xs text-fridgeText mb-2" dangerouslySetInnerHTML={{ __html: selectedRecipe.instructions }} />
            ) : (
              <div className="text-gray-500 mb-2">No instructions available.</div>
            )}
            <button onClick={() => setSelectedRecipe(null)} className="mt-2 px-4 py-2 bg-lavender text-white rounded-lg shadow hover:bg-peach transition-colors">Back to results</button>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-4">
            {recipes.map(recipe => (
              <li key={recipe.id} onClick={() => handleRecipeClick(recipe.id)} className="bg-white rounded-lg shadow p-4 flex flex-col items-center cursor-pointer hover:bg-lavender transition-colors">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "0.5rem", marginBottom: "0.5rem" }}
                />
                <span className="font-semibold text-center">{recipe.title}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
