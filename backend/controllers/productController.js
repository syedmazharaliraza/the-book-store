import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import path from "path";
import { unlinkSync } from "fs";

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    if (product.image.includes("/uploads")) {
      const __dirname = path.resolve();
      const filePath = path.join(__dirname, product.image);
      unlinkSync(filePath);
    }
    await product.deleteOne();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export const createProduct = asyncHandler(async (req, res) => {
  const createdProduct = await Product.create({
    user: req.user._id,
    name: "Sample Book",
    image: "/images/sample.jpg",
    sku: [
      {
        feature: "Sample feature",
        price: 0,
        quantity: 0,
      },
    ],
    description: "Sample description",
    author: "Sample",
    genre: "Sample",
    rating: 0,
    numOfRatings: 0,
  });

  if (createdProduct) {
    res.status(201).json(createdProduct);
  } else {
    res.status(400);
    throw new Error("Invalid product details");
  }
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const { user, name, sku, image, description, author, genre } = req.body;
  if (product) {
    product.user = user || product.user;
    product.name = name || product.name;
    product.sku = sku || product.sku;
    product.image = image || product.image;
    product.description = description || product.description;
    product.author = author || product.author;
    product.genre = genre || product.genre;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export const createReviewOfProduct = asyncHandler(async (req, res) => {
  const { comment, rating } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    if (!product.reviews.find((review) => review.user === req.user._id)) {
      const newReview = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
      };
      product.reviews.push(newReview);
      product.numOfRatings = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.json("Review added successfully");
    } else {
      res.status(404);
      throw new Error("User has already reviewed");
    }
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
