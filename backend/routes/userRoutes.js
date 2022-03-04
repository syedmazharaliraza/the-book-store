import express from "express";
import { authUser, getUserProfile } from "../controllers/userController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", authUser);
router.route("/profile").get(protectRoute, getUserProfile);

export default router;
