import mongoose from "mongoose";

const userSchemea = mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

export const User = mongoose.model("User", userSchemea);
