import express from "express";
import { addOrderItems } from "../controllers/orderController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/", protectRoute, addOrderItems);

export default router;
