import { Ingredient } from "../../model/ingredientsModel.js";

export const createIngredient = async (req, res, next) => {
  const { name } = req.body;

  //get different words by space
  const nameArr = name.split(/\s+/);

  const capitalizedWords = nameArr
    .map((word, i) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  const ingredient = capitalizedWords;

  console.log(ingredient);

  const ingredientExists = await Ingredient.findOne({ name: ingredient });

  if (ingredientExists) {
    return res.status(409).json({ message: "Ingredient Already Exists" });
  }

  const newIngredient = { name: ingredient };

  try {
    const result = await Ingredient.create(newIngredient);

    return res.status(201).send({ message: "Ingredient Created", result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
