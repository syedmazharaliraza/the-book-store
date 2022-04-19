import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    billingAddress,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (orderItems.length === 0) {
    res.status(404);
    throw new Error("No order items");
  } else {
    const placedOrder = await Order.create({
      user: req.user._id,
      orderItems,
      preTax: itemsPrice,
      postTax: itemsPrice + taxPrice,
      shippingPrice,
      totalPrice,
      shippingAddress,
      billingAddress,
    });
    res.status(201).json(placedOrder);
  }
});
