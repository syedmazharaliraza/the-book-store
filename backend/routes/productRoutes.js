import express from "express";
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";
import { protectRoute, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.route("/").get(getProducts).post(protectRoute, isAdmin, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .delete(protectRoute, isAdmin, deleteProduct)
  .put(protectRoute, isAdmin, updateProduct);

export default router;
