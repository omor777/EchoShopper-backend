import express from 'express'
import { getAllProductsController } from '../controller/product.js'

const router = express.Router()


router.get('/',getAllProductsController)

export default router