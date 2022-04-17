import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  phoneNumber: {
    type: Number,
  },
  landmark: {
    type: String,
  },
});

export default addressSchema;
