import Product from "../models/product.model.js";

const getAllProductsController = async (req, res, next) => {
  const page = parseInt(req.query?.page) || 1;
  const limit = parseInt(req.query?.limit) || 9;
  const search = req.query?.search;
  const sort = req.query?.sort;

  // filter related query
  const filterQuery = {
    name: { $regex: search, $options: "i" },
  };

  // sort related query
  // TODO: sort by date newest product first appear
  let sortQuery;
  if (sort === "price-high-to-low" || sort === "price-low-to-high") {
    sortQuery = { price: sort === "price-high-to-low" ? -1 : 1 };
  }

  try {
    const products = await Product.find(filterQuery)
      .sort(sortQuery)
      .skip((page - 1) * limit)
      .limit(limit);

    const productsCount = await Product.countDocuments(filterQuery);

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
