# tabetai-app

**Tabetai** ("I want to eat" in Japanese) is a full-stack food app designed to help users reduce food waste, save time, and discover delicious recipes based on the ingredients they already have at home. It also supports cultural and dietary customization and offers users the chance to contribute their own recipes.

-----

## Project Vision

Tabetai solves these everyday problems:

1. **Reducing Food Waste**
    Helps users make use of what's already in their fridge or pantry.
2. **Saving Time and Mental Energy**
    Skip the endless scrolling - let the app suggest recipes based on what you've got.
3. **Inspiring Creativity**
    Encourages experimenting with what you have - unlock you inner top chef!
4. **Cultural and Dietary Inclusion**
    Users can create and save recipes that reflect their tastes, cultures, and allergy needs.

## Tech Stack

| Layer                | Tech
|----------------------|----------------------
| Project MgMt         | Trello
| Frontend             | React (with Hooks), Tailwind CSS
| Authentication       | Passport (Google OAuth)
| Backend              | Express (RESTful server)
| Database             | MongoDB with Mongoose
| External API         | Spoontacular Ex
| Deployment           | Google Cloud, Compute Engine

## Features
- Search and Filter recipes by ingredients and dietary needs
- Save favorite recipes
- Add custom personal/cultural recipes
- Ingredient-based search
- Smart recipe substitution/editing
- Delete ingredients or recipes as needed
- Google login with secure authentication

## User Stories

### User Story 0.0: Project Setup
- [ ] Task 0.1: Set up ESLint & initial `README.md`
- [ ] Task 0.2: Configure Webpack
- [ ] Task 0.3: Establish database connection with Mongoose
- [ ] Task 0.4: Build server with Express
- [ ] Task 0.5: Set up React client
- [ ] Task 0.6: Deploy to Google Cloud

### User Story 1.0: Google Authentication
- [ ] Task 1.1: Create Login component
- [ ] Task 1.2: Connect to Google OAuth API
- [ ] Task 1.3: Save user info to DB
- [ ] Task 1.4: Redirect user after login

### User Story 2.0: Recipe Search
- [ ] Task 2.1: Create HomePage with Search Bar
- [ ] Task 2.2: Set up routing to query Spoonacular or internal DB

### User Story 3.0: Favorite Recipes
- [ ] Task 3.1: Add React Router navigation
- [ ] Task 3.2: Create Favorites List component
