//Made a new component for the navbar so it can display across multiple pages

import React from 'react';
import { NavLink } from 'react-router-dom';   // use NavLink for active styles

function Navbar() {
  return (
    <nav className="bg-peach/40 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo / Title */}
          <NavLink to="/" className="text-2xl font-extrabold text-fridgeText">
            TABETAI
          </NavLink>

          {/* Links */}
          <div className="flex space-x-6">
            {[
              { to: '/', label: 'Home' },
              { to: '/favorites', label: 'Favorites' },
              { to: '/your-recipes', label: 'Your Recipes' },
              { to: '/create-recipe', label: 'Create Recipe' },
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors
                   ${
                     isActive
                       ? 'text-peach bg-lavender/40'
                       : 'text-fridgeText hover:text-peach'
                   }`
                }
              >
                {label}
              </NavLink>
            ))}

            {/* Login / CTA */}
            <NavLink
              to="/login"
              className="bg-yellow text-fridgeText hover:bg-lavender px-4 py-2 rounded-md text-sm font-semibold transition-colors shadow-sm"
            >
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
