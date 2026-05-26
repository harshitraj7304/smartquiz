import mongoose from "mongoose";
import bcrypt from "bcrypt";
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name is required!"],
    minLength: [3, "Atleast 3 characters are required!"],
    maxLength: [20, "Atmost 20 characters are allowed !"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email id is required !"],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid Email [abc@gmail.com]!!"],
  },
  password: {
    type: String,
    required: [true, "Password is required !!"],
    minLength: [6, "Alteast 6 characters are required "],
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

// hashing the password__
UserSchema.pre("save", async function (next) {
  //this functions...
  const user = this;
  //only hash if password is modified...

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(15);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
  next();
});

const User = mongoose.model("User", UserSchema);
export default User;
