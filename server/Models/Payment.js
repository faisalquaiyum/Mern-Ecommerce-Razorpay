import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: { type: String },
        title: { type: String },
        imgSrc: { type: String },
        qty: { type: Number },
        price: { type: Number },
      },
    ],
    shippingInfo: {
      fullName: String,
      phoneNumber: String,
      address: String,
      city: String,
      state: String,
      country: String,
      pincode: String,
      email: String,
    },
    totalAmount: Number,
    paymentMethod: {
      type: String,
      enum: ["COD", "Razorpay"],
      default: "COD",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    isCOD: {
      type: Boolean,
      default: true,
    },
    razorpay: {
      orderId: String,
      paymentId: String,
      signature: String,
    },
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);


// import mongoose from "mongoose";
// const paymentSchema = new mongoose.Schema(
//   {
//     orderData: { type: Date, default: Date.now },
//     payStatus: { type: String },
//   },
//   { strict: false }
// );
// export const Payment = mongoose.model("Payment", paymentSchema);

