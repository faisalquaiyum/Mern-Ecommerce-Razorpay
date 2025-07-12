import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from 'cors';
import userRoute from "./Routes/user.js";
import productRoute from "./Routes/product.js";
import cartRoute from "./Routes/cart.js";
import addressRoute from "./Routes/address.js";
import paymentRouter from './Routes/payment.js'

const app = express();
app.use(express.json());

app.use(cors({
   origin: 'http://localhost:5173', // Replace with your frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
})); // Use the CORS middleware with the specified options

//user route
app.use("/api/user", userRoute);
//product route
app.use("/api/product", productRoute);
//cart route
app.use("/api/cart", cartRoute);
//address route
app.use("/api/address", addressRoute);
//payment route
app.use('/api/payment', paymentRouter)

mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "MERN_E_COMMERCE",
  })
  .then(() => console.log("MongoDB connected successfully..."))
  .catch((err) => console.log(err));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}!`);
});
