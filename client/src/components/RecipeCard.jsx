import React from "react";

function RecipeCard({ recipe, isFavorite, onFavoriteToggle, onClick }) {
  console.log('isFavorite:', isFavorite, 'for recipe:', recipe);
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center hover:bg-lavender transition-colors w-32 h-32">
      <img
        src={recipe.image}
        alt={recipe.title}
        style={{
          width: "32px",
          height: "32px",
          objectFit: "cover",
          borderRadius: "0.5rem",
          marginBottom: "0.5rem",
          cursor: "pointer"
        }}
        onClick={onClick}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${recipe.title}`}
      />
      <span
        className="font-semibold text-center"
        style={{ cursor: "pointer" }}
        onClick={onClick}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${recipe.title}`}
      >
        {recipe.title}
      </span>
      <button
        type="button"
        onClick={e => {
          e.stopPropagation();
          onFavoriteToggle(recipe, isFavorite);
        }}
        className={`mt-2 text-2xl ${isFavorite ? "text-lavender" : "text-gray-300"}`}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        tabIndex={0}
        style={{ cursor: "pointer" }}
      >
        ★
      </button>
    </div>
  );
}

export default RecipeCard;
