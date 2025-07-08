import React from 'react';
import { Routes, Route } from 'react-router-dom';
//make a homepage component
import HomePage from './Homepage';
//make a recipe page component
import RecipesPage from './RecipesPage';
//perhaps make a profile page component
import FavoriteRecipes from './FavoriteRecipes';
//made a login component
import LoginPage from './LoginPage';


//refactored to React with hooks, we no longer need to make class components

function App() {
  return (
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/favorites" element={<FavoriteRecipes />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    
  );
}


export default App;