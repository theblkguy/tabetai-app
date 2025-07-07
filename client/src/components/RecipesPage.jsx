// RecipesPage.jsx
import React from 'react';

//built out recipes component with placeholder fake data until I connect to backend
const sampleRecipe = {
  title: 'Jazzed-Up Gumbo',
  image: 'https://via.placeholder.com/200',
  ingredients: ['chicken', 'andouille sausage', 'okra', 'spices'],
  instructions: 'Brown meat, build the roux, add veggies, and simmer to deliciousness.'
};

const RecipesPage = () => {
  return (
    <div>
      <h1>All Recipes</h1>
      <Recipe recipe={sampleRecipe} />
    </div>
  );
};

export default RecipesPage;
