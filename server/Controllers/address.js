import { Address } from "../Models/Address.js";

//add address
export const addAddress = async (req, res) => {
  const { fullName, address, city, state, country, pincode, phoneNumber } =
    req.body;
  let userId = req.user;

  try {
    let userAddress = await Address.create({
      userId,
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber,
    });

    if (!userAddress) return res.json({ message: "Invalid address" });

    res.json({
      message: "Address added successfully!",
      userAddress,
      success: true,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//get address
export const getAddress = async (req, res) => {
  const userId = req.user;
  try {
    let address = await Address.find({ userId }).sort({ createdAt: -1 });
    res.json({ message: "Address is", userAddress: address[0] });
  } catch (error) {
    res.json({ message: error.message });
  }
};
