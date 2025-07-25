//Create the schema for recipes inserted

import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: [{
    name: { type: String, required: true },
    quantity: { type: String, default: "" },
    unit: { type: String, default: "" }
  }],
  instructions: [{ type: String }],
  image: String,
  readyInMinutes: { type: Number },
  servings: { type: Number },
  source: { type: String, default: 'user' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model('Recipe', recipeSchema);