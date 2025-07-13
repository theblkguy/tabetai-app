import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./Homepage";
import FavoriteRecipes from "./FavoriteRecipes";
import LoginPage from "./LoginPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useUser } from "../UserContext";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;

function App() {
  const { user, setUser } = useUser();
  const [error, setError] = useState(null);

  console.log("Google Client ID:", clientId);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoriteRecipes />} />
          <Route path="/login" element={<LoginPage onLogin={setUser} error={error} setError={setError} />} />
        </Route>
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
