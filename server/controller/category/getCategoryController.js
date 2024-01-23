import { Category } from "../../model/categoryModel.js";

export const allCategory = async (req, res, next) => {
  try {
    const allCategories = await Category.find();
    return res.status(200).send(allCategories);
  } catch (err) {
    return res.status(200).json({ message: "Internal Server Error." });
  }
};

export const categoryById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const category = await Category.findById(id);
    return res.status(200).send(category);
  } catch (err) {
    return res.status(200).json({ message: "Internal Server Error." });
  }
};
