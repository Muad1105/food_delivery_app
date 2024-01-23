import { Ingredient } from "../../model/ingredientsModel";

export const editIngredient = async (req, res, next) => {
  const id = req.params.id;
  const { name } = req.body;
  try {
    const result = await Ingredient.findByIdAndUpdate(id, { name });
    return res.status(200).json({ message: "Product Updated", result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
