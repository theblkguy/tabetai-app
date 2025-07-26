import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function RecipeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/recipes/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Recipe not found");
        return res.json();
      })
      .then(data => {
        setRecipe(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (!recipe) return null;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-8">
      {recipe.image && (
        <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded mb-4" />
      )}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold text-fridgeText">{recipe.title}</h1>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          onClick={() => navigate(`/edit-recipe/${recipe._id}`)}
        >
          Edit
        </button>
      </div>
      <div className="text-gray-600 text-sm mb-4">
        ⏱ {recipe.readyInMinutes} min &nbsp;|&nbsp; 🍽 {recipe.servings} servings
      </div>
      <h2 className="font-semibold text-lg mb-2">Ingredients</h2>
      <ul className="list-disc list-inside mb-4">
        {recipe.ingredients && recipe.ingredients.map((ing, i) => (
          <li key={i}>{ing.name || ing}</li>
        ))}
      </ul>
      <h2 className="font-semibold text-lg mb-2">Instructions</h2>
      <ol className="list-decimal list-inside space-y-1">
        {recipe.instructions && recipe.instructions.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </div>
  );
}

export default RecipeDetailPage;
