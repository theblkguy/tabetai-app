import React, { useEffect, useState } from "react";
import CustomRecipeCard from "./CustomRecipeCard";
import { Link } from "react-router-dom";

function YourRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/recipes")
      .then(res => res.json())
      .then(data => {
        setRecipes(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!recipes.length) return <div className="text-center mt-8">No recipes found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {recipes.map(recipe => (
        <Link key={recipe._id} to={`/recipe-card/${recipe._id}`}>
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1 text-fridgeText">{recipe.title}</h3>
              <div className="text-gray-600 text-sm mb-2">
                ⏱ {recipe.readyInMinutes} min &nbsp;|&nbsp; 🍽 {recipe.servings} servings
              </div>
              <div className="truncate text-xs text-gray-500 mb-2">
                {recipe.ingredients && recipe.ingredients.map(ing => ing.name).join(", ")}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default YourRecipes;
