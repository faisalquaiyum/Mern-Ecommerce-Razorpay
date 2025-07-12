import { Payment } from "../Models/Payment.js";
import Razorpay from "razorpay";
import "dotenv/config";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

//checkout
export const checkout = async (req, res) => {
  const { amount, cartItems, userShipping, userId } = req.body;

  var options = {
    amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };
  const order = await razorpay.orders.create(options);
  res.json({
    order: order.id,
    amount,
    cartItems,
    userShipping,
    userId,
    payStatus: "created",
  });
};

//verify & save to db
export const verifyPayment = async (req, res) => {
  const {
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
  } = req.body;

  const orderConfirm = await Payment.create({
    user: userId,
    items: orderItems,
    shippingInfo: userShipping,
    totalAmount: amount,
    paymentMethod: "Razorpay",
    paymentStatus: "Paid",
    isPaid: true,
    isCOD: false,
    razorpay: {
      orderId,
      paymentId,
      signature,
    },
  });

  res.json({ message: "Payment successful", success: true, orderConfirm });
};

// POST /payment/cod
export const codOrder = async (req, res) => {
  try {
    const {
      orderItems,
      userId,
      userShipping,
      amount,
      paymentMethod = "COD",
    } = req.body;

    // Create and save your order in DB
    const order = await Payment.create({
      user: userId,
      items: orderItems,
      shippingInfo: userShipping,
      totalAmount: amount,
      paymentStatus: "Pending",
      paymentMethod,
      isPaid: false,
      isCOD: true,
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error("COD order creation failed:", error);
    res.status(500).json({ success: false, message: "COD order failed." });
  }
};

// user specific order
export const userOrder = async (req, res) => {
  const userId = req.user;
  let orders = await Payment.find({ user: userId }).sort({ createdAt: -1 });
  res.json({ orders });
};

// all orders for admin
export const allOrders = async (req, res) => {
  // const userId = req.user;
  let orders = await Payment.find().sort({ createdAt: -1 });
  res.json({ orders });
};
