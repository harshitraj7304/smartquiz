import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { createToken } from "../services/jwt.service.js";
// register
export const registerUser = async (req, resp) => {
  const { name, email, password } = req.body;

  const savedUser = await User.create({
    name,
    email,
    password,
  });

  return resp.status(201).json({
    messsage: "user created successfully...",
    user: savedUser,
  });
};

export const loginUser = async (req, resp) => {
  const { email, password } = req.body;
  //check the email and password
  if (!email || !password) {
    return resp.status(400).json({
      message: "Invalid Credentials !!",
    });
  }

  ///user fetch jiski emailhai:

  const user = await User.findOne({ email });
  if (!user) {
    return resp.status(400).json({
      message: "Invalid Email or Password !",
    });
  }

  // match the passwords
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return resp.status(400).json({
      message: "Invalid Username or Password !!",
    });
  }

  // token____

  //we have to create token
  const accessToken = createToken(user);
  resp.json({
    accessToken,
    user,
  });
};
