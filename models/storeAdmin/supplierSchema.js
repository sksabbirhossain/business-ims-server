const mongoose = require("mongoose");

const supplierSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    storeName: {
      type: String,
      lowercase: true,
      trim: true,
    },
    website: {
      type: String,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;
