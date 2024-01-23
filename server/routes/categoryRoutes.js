import express from "express";
import {
  allCategory,
  categoryById,
} from "../controller/category/getCategoryController.js";
import { editCategory } from "../controller/category/editCategoryController.js";
import { deleteCategory } from "../controller/category/deleteCategoryController.js";
import { createCategory } from "../controller/category/createCategoryController.js";

export const categoryRoutes = express.Router();

categoryRoutes.post("/create", createCategory);

categoryRoutes.get("/allCategory", allCategory);

categoryRoutes.get("/:id", categoryById);

categoryRoutes.put("/:id", editCategory);

categoryRoutes.delete("/:id", deleteCategory);
