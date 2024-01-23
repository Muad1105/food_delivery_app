import express from "express";
import { Products } from "../../model/productModel.js";

export const deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await Products.findByIdAndDelete(id);
    return res.status(200).json({ message: "Category Deleted.", result });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
