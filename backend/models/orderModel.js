import mongoose from "mongoose";
import orderedItemsSchema from "../schemas/orderedItemsSchema.js";
import addressSchema from "../schemas/addressSchema.js";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    orderItems: [orderedItemsSchema],

    preTax: {
      type: Number,
      required: true,
    },

    postTax: {
      type: Number,
      required: true,
    },

    shippingPrice: {
      type: Number,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    orderStatus: {
      type: String,
      required: true,
      default: "Order yet to confirm",
    },

    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },

    paidAt: {
      type: Date,
      // required: true,
    },

    paymentMethod: {
      type: String,
      required: true,
    },

    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email: { type: String },
    },

    shippingAddress: addressSchema,

    billingAddress: addressSchema,

    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Billing and shipping adress is missing yet

const Order = mongoose.model("Order", orderSchema);

export default Order;
