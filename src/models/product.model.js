import { Schema, model } from "mongoose";

const productSchema = Schema({
  name: String,
  image: String,
  description: String,
  price: Number,
  category: String,
  brand: String,
  rating: Number,
  createdAt: String,
});

const Product = model("Product", productSchema);

export default Product;
