const mongoose = require("mongoose");

const SalesSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.Mixed, // Can be an ObjectId (reference) or an embedded object
    required: true,
  },
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stock",
        required: true,
      },
      qty: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  discount: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
  },
  paymentMethod: {
    type: String,
    enum: ["Cash", "Credit Card", "Online"],
    required: true,
  },
  saleDate: { type: Date, default: Date.now },
});

// Handle customer input dynamically
SalesSchema.path("customer").validate(function (value) {
  return (
    (typeof value === "object" && value.name && value.email) || // Manual entry
    mongoose.isValidObjectId(value) // Reference to Customer model
  );
}, "Customer must be an existing reference or a valid manual entry.");

module.exports = mongoose.model("Sale", SalesSchema);
