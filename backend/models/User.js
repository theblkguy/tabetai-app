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
});

// Hash password before saving (only if password is set/modified)
userSchema.pre("save", async function (next) {
  // call next middleware if the password has NOT been changed or set
  if (!this.isModified("password") || !this.password) return next();
  // if the password is new or changed, hash the password before saving
  this.password = await bcrypt.hash(this.password, 10);
  // call next middleware
  next();

  // Method to compare password
  userSchema.methods.comparePassword = function (candidatePassword) {
    // compares the entered password to the stored password
    return bcrypt.compare(candidatePassword, this.password);
  };
});

export default mongoose.model("User", userSchema);
