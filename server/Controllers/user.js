import { User } from "../Models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

// user register
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      res.json({ message: "User already exits", success: true });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 5);

    user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    res
      .status(200)
      .json({ message: "You are signed Up!", user, success: true });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//user login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email: email,
    });
    if (!user) {
      res.status(403).json({ message: "User not found!", success: false });
      return;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(403).json({ message: "Password invalid!", success: false });
      return;
    }

    //token generation
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "365d",
    });
    res
      .status(200)
      .json({ message: `Welcome ${user.name}`, token, success: true });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

// get all users
export const users = async (req, res) => {
  try {
    let user = await User.find().sort({ createdAt: -1 });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// user profile
export const profile = async (req, res) => {
  res.json({ user: req.user });
};
