import Product from "../models/product.model.js";

const getAllProductsController = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (e) {
    next(e);
  }
};

export { getAllProductsController };
