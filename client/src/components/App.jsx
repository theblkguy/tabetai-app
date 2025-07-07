import React from 'react';
import { Routes, Route } from 'react-router-dom';
//make a homepage component
import HomePage from './Homepage';
//make a recipe page component
import recipesPage from './RecipesPage';
//perhaps make a profile page component
import ProfilePage from './ProfilePage';
//import search component
import Search from './Search';

//refactored to React with hooks, we no longer need to make class components

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Profile" element={<ProfilePage />} />
      <Route path="/Recipes" element={<RecipesPage/>} />
      <Route path="/Search" element={<Search/>} />
    </Routes>
  );
}

export default App;