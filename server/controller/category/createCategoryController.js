import { Category } from "../../model/categoryModel.js";

export const createCategory = async (req, res, next) => {
  const { name } = req.body;
  console.log("req.body", req.body);

  //get different words by space
  const nameArr = name.split(/\s+/);

  const capitalizedWords = nameArr
    .map((word, i) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  const category = capitalizedWords;
  console.log(category);
  const categoryAlreadtExists = await Category.findOne({ name: category });
  if (categoryAlreadtExists) {
    return res
      .status(409)
      .json({ message: "Conflict, Category Already Exists" });
  }

  try {
    const result = await Category.create({ name: category });
    return res.status(200).json({ message: "Category Created.", result });
  } catch (err) {
    return res.status(500).json({ message: "Internal Setver Error." });
  }
};
