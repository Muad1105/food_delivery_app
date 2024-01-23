import { Products } from "../../model/productModel.js";

export const allProducts = async (req, res, next) => {
  const allProducts = await Products.find();

  return res.status(200).send(allProducts);
};

export const productById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Products.findById(id);
    return res.status(200).send(product);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
