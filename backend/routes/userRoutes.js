import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
} from "../controllers/userController.js";
import { protectRoute, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protectRoute, isAdmin, getUsers);
router.post("/login", authUser);
router.route("/:id").delete(protectRoute, isAdmin, deleteUser);
router
  .route("/profile/:id")
  .get(protectRoute, getUserProfile)
  .put(protectRoute, updateUserProfile);

export default router;
