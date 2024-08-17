import Product from "../models/product.model.js";

const getAllProductsController = async (req, res, next) => {
  const page = parseInt(req.query?.page) || 1;
  const limit = parseInt(req.query?.limit) || 6;
  const search = req.query?.search;
  const sort = req.query?.sort;
  let categories = req.query?.categories;
  let brands = req.query?.brands;
  let priceRange = req.query?.priceRange;
  console.log(priceRange);

  if (categories) {
    categories = categories.split(",");
  }

  if (brands) {
    brands = brands.split(",");
  }

  if (priceRange) {
    priceRange = priceRange.split(",").map((item) => parseFloat(item));
  }

  console.log(priceRange);

  // Filter query
  const filterQuery = {};

  // Search query
  if (search) {
    filterQuery.name = { $regex: search, $options: "i" };
  }

  // Filter by brands and categories
  if (brands?.length > 0) {
    filterQuery.brand = { $in: brands };
  }

  if (categories?.length > 0) {
    filterQuery.category = { $in: categories };
  }

  if (Array.isArray(priceRange)) {
    filterQuery.price = { $gte: priceRange[0], $lte: priceRange[1] };
  }

  // Sort query
  let sortQuery = {};

  // Sort by price or default to sorting by the newest products (assuming createdAt exists)
  if (sort === "price-high-to-low" || sort === "price-low-to-high") {
    sortQuery.price = sort === "price-high-to-low" ? -1 : 1;
  } else if (sort === "new") {
    // Sort by date, newest products first
    sortQuery.createdAt = -1;
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
