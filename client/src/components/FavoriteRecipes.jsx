import React, { useEffect, useState } from "react";
import { useUser } from "../UserContext";
import RecipeCard from "./RecipeCard";

function Modal({ open, onClose, onConfirm, recipe }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-xs w-full">
        <h2 className="text-lg font-bold mb-2 text-fridgeText">Remove Favorite?</h2>
        <p className="mb-4 text-fridgeText">Are you sure you want to remove <span className="font-semibold">{recipe?.title}</span> from your favorites?</p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 text-fridgeText hover:bg-gray-300">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded bg-red-400 text-white hover:bg-red-500">Remove</button>
        </div>
      </div>
    </div>
  );
}

function FavoriteRecipes() {
  const { user } = useUser();
  const [favorites, setFavorites] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingUnfavorite, setPendingUnfavorite] = useState(null);

  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/users/${user.id}/favorites`)
      .then(res => res.json())
      .then(data => setFavorites(data || []));
  }, [user]);

  const handleUnfavorite = (recipe) => {
    setPendingUnfavorite(recipe);
    setModalOpen(true);
  };

  const confirmUnfavorite = async () => {
    if (!user?.id || !pendingUnfavorite) return;
    await fetch(`/api/users/${user.id}/favorites/${pendingUnfavorite.id}`, {
      method: "DELETE"
    });
    setFavorites(favs => favs.filter(f => f.id !== pendingUnfavorite.id));
    setModalOpen(false);
    setPendingUnfavorite(null);
  };

  return (
    <div className="min-h-screen bg-yellow-100 pt-20 px-6">
      <h1 className="text-3xl font-bold text-fridgeText mb-6">Your Favorites</h1>
      {favorites.length === 0 ? (
        <p className="text-fridgeText"> No recipes saved yet! 😯 </p>
      ) : (
        <ul className="grid grid-cols-2 gap-4">
          {favorites.map(recipe => (
            <li key={recipe.id}>
              <RecipeCard
                recipe={recipe}
                isFavorite={true}
                onFavoriteToggle={() => handleUnfavorite(recipe)}
                onClick={() => {}}
              />
            </li>
          ))}
        </ul>
      )}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmUnfavorite}
        recipe={pendingUnfavorite}
      />
    </div>
  );
}

export default FavoriteRecipes;
