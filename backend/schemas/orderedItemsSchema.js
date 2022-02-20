import mongoose from "mongoose";

const orderedItemsSchema = mongoose.Schema({
  sku: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  preTax: {
    type: Number,
    required: true,
  },
  postTax: {
    type: Number,
    required: true,
  },
});

export default orderedItemsSchema;
