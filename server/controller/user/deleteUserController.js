import { User } from "../../model/userModel.js";

export const deleteUserById = async (req, res, next) => {
  const userId = req.params.id;
  const result = await User.findByIdAndDelete(userId);
  if (result) {
    return res.status(204).send({ message: "User Deleted Succesfully" });
  }
};
