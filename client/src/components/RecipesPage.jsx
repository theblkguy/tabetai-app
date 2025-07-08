import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

// Sample fallback recipe in case no real data is passed
const sampleRecipe = {
  id: '1',
  name: 'Jazzed-Up Gumbo',
  image: 'https://via.placeholder.com/200',
  ingredients: ['chicken', 'andouille sausage', 'okra', 'spices'],
  instructions: 'Brown meat, build the roux, add veggies, and simmer to deliciousness.'
};

const RecipesPage = ({ allRecipes = [sampleRecipe] }) => {
  const query = useQuery().get('search') || '';
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    const results = allRecipes.filter(recipe =>
      recipe.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRecipes(results);
  }, [query, allRecipes]);

  return (
    <div>
      <h2>Recipes</h2>
      {query && <p>Showing results for: <strong>{query}</strong></p>}
      <ul>
        {filteredRecipes.map(recipe => (
          <li key={recipe.id}>{recipe.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipesPage;

