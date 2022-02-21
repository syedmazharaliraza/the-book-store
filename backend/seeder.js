import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import products from "./data/products.js";
import users from "./data/users.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";

dotenv.config();

const importData = async () => {
  try {
    await connectDB();
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    const createdUsers = await User.insertMany(users);
    const admin = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return {
        ...product,
        user: admin,
      };
    });
    await Product.insertMany(sampleProducts);
    console.log("Data imported successfully".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data destroyed successfully".red.inverse);
  } catch (error) {
    console.log(`${error}`.red);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
