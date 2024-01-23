import express from "express";
import signupController from "../controller/user/signUpController.js";
import { loginController } from "../controller/user/loginController.js";
import { getAllUsers, getUserById } from "../controller/user/getUser.js";
import { deleteUserById } from "../controller/user/deleteUserController.js";

const userRoutes = express.Router();

userRoutes.post("/signup", signupController);

userRoutes.post("/login", loginController);

userRoutes.get("/all", getAllUsers);

userRoutes.get("/:id", getUserById);

userRoutes.delete("/:id", deleteUserById);

export default userRoutes;
