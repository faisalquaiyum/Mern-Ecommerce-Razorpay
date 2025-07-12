import { Products } from "../Models/Product.js";

//add products
export const addProduct = async (req, res) => {
  const { title, description, price, category, qty, imgSrc } = req.body;

  try {
    const product = await Products.create({
      title,
      description,
      price,
      category,
      qty,
      imgSrc,
    });
    res.status(200).json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get products
export const getProducts = async (req, res) => {
  try {
    const products = await Products.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "All products", products });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get product by id
export const getProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Products.findById(id);
    if (!product) return res.json({ message: "Invalid id" });
    res.status(200).json({ message: "product of given id", product });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//update product by id
export const updateProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Products.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!product) return res.json({ message: "Invalid id" });
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//delete product by id
export const deleteProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Products.findByIdAndDelete(id);
    if (!product) return res.json({ message: "Invalid id" });
    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
