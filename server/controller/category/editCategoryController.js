import { Category } from "../../model/categoryModel.js";

export const editCategory = async (req, res, next) => {
  const { name } = req.body;
  try {
    const categoryUpdate = await Category.findByIdAndUpdate(id, { name });
    return res
      .status(200)
      .json({ message: "Category Updated.", categoryUpdate });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
