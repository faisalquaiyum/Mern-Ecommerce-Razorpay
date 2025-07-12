import express from "express";
import { addAddress, getAddress } from "../Controllers/address.js";
import { isAuthenticated } from "../Middlewares/auth.js";

const router = express.Router();

//add address
router.post("/add", isAuthenticated, addAddress);
//get address
router.get("/get", isAuthenticated, getAddress);

export default router;
