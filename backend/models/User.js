//create Schema for the user log in

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true }, //google O-Authentication
  name: String,
  email: String,
  pantry: [String], //[] because we are leaving this open for options that are user specific
});

export default mongoose.model('User', userSchema);