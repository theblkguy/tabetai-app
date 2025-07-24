import React from 'react';
import { useParams } from 'react-router-dom';
import RecipeCardPage from './RecipeCardPage';

function RecipeCardRouteWrapper() {
  const { id } = useParams();
  return <RecipeCardPage recipeId={id} />;
}

export default RecipeCardRouteWrapper;
