import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import productRoutes from "./routes/productRoutes.js";
import OrderRoutes from "./routes/OrderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import {
  notFoundHandler,
  errorHandler,
} from "./middlewares/errorMiddleware.js";
import path from "path";

dotenv.config();

// Connecting to MongoDB
connectDB();

// Express specific
const app = express();

// Middlewares
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/products/:id", productRoutes);

app.use("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
