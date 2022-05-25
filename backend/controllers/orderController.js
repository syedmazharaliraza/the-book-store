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
    paymentMethod,
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
      paymentMethod,
    });
    res.status(201).json(placedOrder);
  }
});

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    res.status(404);
    throw new Error("No order found");
  } else {
    res.status(201).json(order);
  }
});

export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };
    const updatedOrder = await order.save();
    res.status(201).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("No order found");
  }
});

export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    await order.save();
    res.status(201).json("updated order");
  } else {
    res.status(404);
    throw new Error("No order found");
  }
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(201).json(orders);
});

export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.status(201).json(orders);
});
