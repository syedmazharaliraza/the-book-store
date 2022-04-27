import express from "express";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} from "../controllers/orderController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/", protectRoute, addOrderItems);
router.get("/myorders", protectRoute, getMyOrders);
router.get("/:id", protectRoute, getOrderById);
router.route("/:id/pay").put(protectRoute, updateOrderToPaid);

export default router;
