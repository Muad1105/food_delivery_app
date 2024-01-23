import { Products } from "../../model/productModel";

const editProduct = async (req, res, next) => {
  const id = req.params.id;
  const { name, ingrediants, category, price } = req.body;
  if (!name || !price || !category) {
    return res
      .status(400)
      .json({ message: "Required Data : Name, Ingredients, Products" });
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
    const result = await new AdminProduct.findByIdAndUpdate(id, newProduct);
    return res
      .status(201)
      .json({ message: "Prduct Successfully Created", result });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
