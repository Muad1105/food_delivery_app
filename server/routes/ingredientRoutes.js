import express from "express";

import { Ingredient } from "../model/ingredientsModel.js";
import { createIngredient } from "../controller/ingredients/createIngredientController.js";
import {
  allIngredients,
  ingredientById,
} from "../controller/ingredients/getIngredientController.js";
import { deleteIngredient } from "../controller/ingredients/deleteIngredientController.js";

export const ingredentRoutes = express.Router();

ingredentRoutes.post("/create", createIngredient);

ingredentRoutes.get("/allIngredients", allIngredients);

ingredentRoutes.get("/:id", ingredientById);

ingredentRoutes.delete("/:id", deleteIngredient);
