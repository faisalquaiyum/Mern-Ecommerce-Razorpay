import express from "express";
import {
  allOrders,
  checkout,
  codOrder,
  userOrder,
  verifyPayment,
} from "../Controllers/payment.js";
import { isAuthenticated } from "../Middlewares/auth.js";
const router = express.Router();

//checkout
router.post("/checkout", checkout);
//verify and save to db
router.post("/verify-payment", verifyPayment);
// cod order
router.post("/cod", codOrder);
//user order
router.get("/userorder", isAuthenticated, userOrder);
//all orders
router.get("/orders", allOrders);

export default router;
