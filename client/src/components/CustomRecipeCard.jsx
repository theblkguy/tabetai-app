import React from "react";

function CustomRecipeCard({ recipe }) {
  if (!recipe) return null;

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover"
        />
      )}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-fridgeText">{recipe.title}</h2>
        <div className="flex gap-4 mb-2 text-gray-600">
          <span>⏱ {recipe.readyInMinutes} min</span>
          <span>🍽 {recipe.servings} servings</span>
        </div>
        <h3 className="font-semibold mt-4 mb-1">Ingredients</h3>
        <ul className="list-disc list-inside mb-4">
          {recipe.ingredients.map((ing, idx) => (
            <li key={idx}>
              {ing.quantity} {ing.unit} {ing.name}
            </li>
          ))}
        </ul>
        <h3 className="font-semibold mb-1">Instructions</h3>
        <ol className="list-decimal list-inside space-y-1">
          {recipe.instructions.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default CustomRecipeCard;