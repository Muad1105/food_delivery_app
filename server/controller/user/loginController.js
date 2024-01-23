import { User } from "../../model/userModel.js";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  console.log("existing user", existingUser);
  if (!existingUser) {
    console.log("user doesnt exists");
    return res.status(404).json({ message: "User Not found" });
  }
  console.log("user Logged in");

  const passwordIsCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!passwordIsCorrect) {
    return res.status(401).json({ message: "Invalid Email/password" });
  }

  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  res.cookie(String(existingUser._id), token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    httpOnly: true,
    sameSite: "lax",
  });

  return res
    .status(200)
    .json({ message: "User signed in", user: existingUser, token });
};
