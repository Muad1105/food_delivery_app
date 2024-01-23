import bcrypt from "bcrypt";
const saltrounds = 10;

import { User } from "../../model/userModel.js";

const signupController = async (req, res) => {
  console.log("signup");
  try {
    // console.log("signup", req.body);
    const { name, password, email } = req.body;
    if (!name || !password || !email) {
      return res
        .status(400)
        .json({ message: "Required Field : Name, Password, Email" });
    }
    const existingUser = await User.findOne({ email });
    console.log("existing user");
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User Already exists with same email" });
    }
    console.log("hash password");
    //Hash password
    const hashedPassword = await bcrypt.hash(password, saltrounds);

    const newUser = {
      name,
      password: hashedPassword,
      email,
    };

    await User.create(newUser);

    return res
      .status(201)
      .json({ message: "User Created Successfully", newUser });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default signupController;
