import { Category } from "../../model/categoryModel.js";

export const deleteCategory = async (req, res, next) => {
  const id = req.params.id;

  try {
    const result = await Category.findByIdAndDelete(id);
    return res.status(200).json({ message: "Category Deleted.", result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Setver Error." });
  }
};
