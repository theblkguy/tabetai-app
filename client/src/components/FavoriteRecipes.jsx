import React from "react";


//built out with placeholder fake data until I connect to backend

function FavoriteRecipes() {
  return (
    <div className="min-h-screen bg-yellow-100 pt-20 px-6">
      <h1 className="text-3xl font-bold text-fridgeText mb-6">Your Favorites</h1>
      <p className="text-fridgeText"> No recipes saved yet! 😯 </p>
      {/* Map through favorites here later */}
    </div>
  );
}
export default FavoriteRecipes;
