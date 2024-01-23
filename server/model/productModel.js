import mongoose from "mongoose";

const adminProductSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  ingredients: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Ingredient", required: true },
  ],

  price: { type: Number, required: true },
  image: { type: String, required: true },
});

export const Products = mongoose.model("Products", adminProductSchema);
