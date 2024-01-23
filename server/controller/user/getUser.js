import { User } from "../../model/userModel.js";

export const getAllUsers = async (req, res, next) => {
  const allUsers = await User.find();

  return res.status(200).send(allUsers);
};

export const getUserById = async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);
  return res.status(200).json({ message: "user found", user });
};
