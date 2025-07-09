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
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

//refactored to React with hooks, we no longer need to make class components

function App() {
  // useState hook to store user info
  const [user, setUser] = useState(null);
  // useState hook to store error message
  const [error, setError] = useState(null);
  return (
<GoogleOAuthProvider clientId={clientId}>
      {/* Google Login button and error message */}
      {!user && (
        <>
          <GoogleLogin
            onSuccess={credentialResponse => {
              // Save user info
              setUser(credentialResponse);
              setError(null); // clear error on success
            }}
            onError={() => {
              // log error to console
              console.error('Google login failed');
              // set error message for user
              setError('Google login failed. Please try again.');
            }}
          />
          {/* show error message if present */}
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </>
      )}
      {/* show user info if logged in */}
      {user && (() => {
  const userInfo = jwtDecode(user.credential);
  return <div>Hello, {userInfo.name || userInfo.email}! Itadakimasu!</div>;
})()}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/favorites" element={<FavoriteRecipes />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </GoogleOAuthProvider>  );
}

export default App;
