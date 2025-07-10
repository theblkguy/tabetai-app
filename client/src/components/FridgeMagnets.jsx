import React from "react";
import { Link } from "react-router-dom";

function FridgeMagnets() {
  return (
    <>
      <Link to="/recipe" className="magnet">All Recipes</Link>
      <Link to="/search" className="magnet">My Recipes</Link>
      <Link to="/favorites" className="magnet">Favorites</Link>
      <Link to="/login" className="magnet">Login</Link>
    </>
  );
}

export default FridgeMagnets;
