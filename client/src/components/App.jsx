import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
//make a homepage component
import HomePage from "./Homepage";
//make a recipe page component
import RecipesPage from "./RecipesPage";
//perhaps make a profile page component
import FavoriteRecipes from "./FavoriteRecipes";
//made a login component
import LoginPage from "./LoginPage";
//Google oAuth
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

//refactored to React with hooks, we no longer need to make class components

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  console.log("Google Client ID:", clientId);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/favorites" element={<FavoriteRecipes />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
