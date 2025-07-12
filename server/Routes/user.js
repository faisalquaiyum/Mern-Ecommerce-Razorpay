import express from "express";
import { login, profile, register, users } from "../Controllers/user.js";
import { isAuthenticated } from "../Middlewares/auth.js";

const router = express.Router();

//regitser route
router.post("/register", register);
//login route
router.post("/login", login);
// get all users
router.get("/all", users);
// get user profile
router.get("/profile", isAuthenticated, profile);

export default router;
