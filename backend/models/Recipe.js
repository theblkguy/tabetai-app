//Create the schema for recipes inserted

import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: [String],
  instructions: String,
  image: String,
  source: { type: String, default: 'user' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model('Recipe', recipeSchema);