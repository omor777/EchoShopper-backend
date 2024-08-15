import Product from "../models/product.model.js";

const getAllProductsController = async (req, res, next) => {
  const page = parseInt(req.query?.page) || 1;
  const limit = parseInt(req.query?.limit) || 9;

  try {
    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const productsCount = await Product.countDocuments();

    const totalPages = Math.ceil(productsCount / limit);
    const hasMore = page * limit < productsCount;

    res.status(200).json({
      products,
      totalPages,
      hasMore,
    });
  } catch (e) {
    next(e);
  }
};

export { getAllProductsController };
