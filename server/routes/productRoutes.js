import express from "express";
import { createProduct } from "../controller/products/createProductController.js";
import {
  allProducts,
  productById,
} from "../controller/products/getProductController.js";
import { deleteProduct } from "../controller/products/deleteProductController.js";

export const productRoutes = express.Router();

productRoutes.post("/create", createProduct);

productRoutes.get("/allProducts", allProducts);

productRoutes.get("/product/:id", productById);

productRoutes.delete("/:id", deleteProduct);
