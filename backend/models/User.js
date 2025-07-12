//create Schema for the user log in

import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  googleId: { type: String }, // optional for non-Google users
  username: { type: String, unique: true, sparse: true }, // optional for Google users
  password: { type: String }, // hashed password, only for non-Google users
  name: String,
  email: String,
  pantry: [String], //[] because we are leaving this open for options that are user specific
   favorites: [
    {
      id: String,         // Spoonacular recipe ID
      title: String,      // Recipe title
      image: String,      // Recipe image URL
    }
  ],
});


// Hash password before saving (only if password is set/modified)
// If the password field is new or has been changed, hash it before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  // Hash the password with bcrypt
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare password
// Compares the entered password to the stored hashed password
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema);
