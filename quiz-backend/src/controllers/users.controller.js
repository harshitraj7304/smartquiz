import User from "../models/user.model.js";

export const listUsers = async (req, resp) => {
  const users = await User.find({}, "-password");
  return resp.json(users);
};

export const createUser = (req, resp) => {
  const { userId, email, password, name, about, age } = req.body;
  const user = { userId, email, password, name, about, age };
  resp.status(201).json(user);
};

export const deleteUser = async (req, resp) => {
  const { userId } = req.params;
  await User.findByIdAndDelete(userId);
  resp.json({ message: "User deleted successfully" });
};

export const updateUser = async (req, resp) => {
  const { name } = req.body;
  const userId = req.userId;

  if (!name || name.trim() === "") {
    return resp.status(400).json({ message: "Name is required" });
  }

  const updated = await User.findByIdAndUpdate(
    userId,
    { name: name.trim() },
    { new: true, select: "-password" }
  );

  if (!updated) {
    return resp.status(404).json({ message: "User not found" });
  }

  return resp.json({ message: "Profile updated successfully", user: updated });
};

export const getProfile = async (req, resp) => {
  const user = await User.findById(req.userId, "-password");
  if (!user) {
    return resp.status(404).json({ message: "User not found" });
  }
  return resp.json(user);
};
