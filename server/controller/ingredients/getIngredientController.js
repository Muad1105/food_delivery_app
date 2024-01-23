import { Ingredient } from "../../model/ingredientsModel.js";

export const allIngredients = async (req, res, next) => {
  try {
    const allIngredients = await Ingredient.find();
    return res.status(200).send(allIngredients);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

export const ingredientById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const ingredient = await Ingredient.findById(id);
    return res.status(200).send(ingredient);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};
