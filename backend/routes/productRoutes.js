import express from "express";
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createReviewOfProduct,
} from "../controllers/productController.js";
import { protectRoute, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.route("/").get(getProducts).post(protectRoute, isAdmin, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .delete(protectRoute, isAdmin, deleteProduct)
  .put(protectRoute, isAdmin, updateProduct);
router.put("/:id/review", protectRoute, createReviewOfProduct);

export default router;
