import express from 'express';
import Recipe from '../models/Recipe.js';
import fetch from 'node-fetch';
const router = express.Router();
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY || 'YOUR_API_KEY';

// Spoonacular Recipe Card endpoint
router.get('/:id/card', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    const title = recipe.title;
    const ingredients = (recipe.ingredients || []).map(ing => ing.name || ing).join(', ');
    const instructions = (recipe.instructions || []).join('. ');
    const params = new URLSearchParams({
      title,
      ingredients,
      instructions,
      apiKey: SPOONACULAR_API_KEY
    });
    const apiUrl = `https://api.spoonacular.com/recipes/visualizeRecipe?${params.toString()}`;
    const apiRes = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    if (!apiRes.ok) {
      return res.status(500).json({ error: 'Failed to generate recipe card' });
    }
    const buffer = await apiRes.buffer();
    res.set('Content-Type', 'image/png');
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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


export default router;