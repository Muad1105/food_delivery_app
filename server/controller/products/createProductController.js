import { Products } from "../../model/productModel.js";

export const createProduct = async (req, res, next) => {
  const { name, ingrediants, category, price } = req.body;
  if (!name || !price || !category) {
    return res.status(400).json({
      message: "Required Data : Name, Ingredients, Products, Category",
    });
  }

  const imageBuffer = req.file.buffer;

  //Convert the buffer to Base64-encoded string
  const base64String = imageBuffer.toString("base64");

  const newProduct = {
    name,
    category,
    ingrediants,
    price,
    image: base64String,
  };

  try {
    const result = await new Products.create(newProduct);
    return res
      .status(201)
      .json({ message: "Product Successfully Created", result });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
