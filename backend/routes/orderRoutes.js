import express from "express";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} from "../controllers/orderController.js";
import { isAdmin, protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();
router
  .route("/")
  .post(protectRoute, addOrderItems)
  .get(protectRoute, isAdmin, getOrders);
router.get("/myorders", protectRoute, getMyOrders);
router.get("/:id", protectRoute, getOrderById);
router.route("/:id/pay").put(protectRoute, updateOrderToPaid);
router.route("/:id/deliver").put(protectRoute, isAdmin, updateOrderToDelivered);

export default router;
