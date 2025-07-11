import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Fake data
const allRecipes = [
  { id: 1, name: "Spaghetti", ingredients: ["noodles", "tomato"] },
  { id: 2, name: "Tuna Salad", ingredients: ["tuna", "mayo", "lettuce"] },
  { id: 3, name: "Avocado Toast", ingredients: ["bread", "avocado", "egg"] },
];

const useQuery = () => new URLSearchParams(useLocation().search);

const RecipesPage = () => {
  const query = useQuery().get("search") || "";
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    const results = allRecipes.filter((recipe) =>
      recipe.ingredients.some((ing) =>
        ing.toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredRecipes(results);
  }, [query]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Recipes</h2>
      {query && <p>Showing results for: <strong>{query}</strong></p>}
      <ul>
        {filteredRecipes.map((recipe) => (
          <li key={recipe.id} className="mt-2">{recipe.name}</li>
        ))}
        {filteredRecipes.length === 0 && <li>No recipes found 😢</li>}
      </ul>
    </div>
  );
};

export default RecipesPage;
