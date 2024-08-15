import express from "express";
const router = express.Router();
import productRoutes from './product.js'

router.use("/api/products",productRoutes);

export default router;
