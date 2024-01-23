import { Ingredient } from "../../model/ingredientsModel.js";

export const deleteIngredient = async (req, res, next) => {
  const id = req.params.id;
  try {
    const ingredientExists = await Ingredient.findById({ _id: id });
    if (ingredientExists) {
      const result = await Ingredient.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ message: "Ingredient Successfully Deleted", result });
    } else {
      return res.status(400).json({ message: "Ingredient Doesn't exists." });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
