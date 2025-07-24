import express from 'express';
import Recipe from '../models/Recipe.js';
import fetch from 'node-fetch'; // Add this at the top if not already imported
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

//POST request (/api/recipes)

router.post('/', async (req, res) => {
  try {
    const newRecipe = await Recipe.create(req.body);
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//GET request (/api/recipes)
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//Patch: give user the ability to update an existing recipe
router.patch("/:id", async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(updatedRecipe);
  } catch (err) {
    console.error("Error updated recipe", err);
    res.status(500).json({ error: "Failed to update recipe" });
  }
});

// Get Spoonacular recipe card by ID
router.get('/:id/card', async (req, res) => {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  const { id } = req.params;

  if (!apiKey) {
    return res.status(500).json({ error: 'Spoonacular API key not set in environment.' });
  }

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/card?apiKey=${apiKey}`
    );
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch recipe card from Spoonacular.' });
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching recipe card.' });
  }
});


export default router;