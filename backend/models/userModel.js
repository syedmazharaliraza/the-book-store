import mongoose from "mongoose";
import addressSchema from "../schemas/addressSchema.js";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    billingAddress: addressSchema,
    shippingAddress: addressSchema,
  },
  {
    timestamps: true,
  }
);

// Billing and shipping adress is missing yet

const User = mongoose.model("User", userSchema);

export default User;
