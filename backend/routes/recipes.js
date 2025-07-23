import express from 'express';
import Recipe from '../models/Recipe.js';

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


export default router;