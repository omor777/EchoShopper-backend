import Product from "../models/product.model.js";

const getAllProductsController = async (req, res, next) => {
  const page = parseInt(req.query?.page) || 1;
  const limit = parseInt(req.query?.limit) || 9;
  const search = req.query?.search || "";

  const query = {
    name: { $regex: search, $options: "i" },
  };

  try {
    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    const productsCount = await Product.countDocuments(query);

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
