import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../Models/Users.js";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.header("Auth");
    if (!token) {
      return res.status(401).json({ message: "Login first" });
    }

    const decoded = jwt.verify(token, JWT_SECRET); 
    const id = decoded.userId;

    const user = await User.findById(id); // correct query

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // optionally attach user to request
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token", error: err.message });
  }
};
