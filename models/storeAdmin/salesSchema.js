const mongoose = require("mongoose");
const Stock = require("./stockSchema");
const generateTrxId = require("../../utils/generateTrxId");
const Financial = require("./financialSchema");

const SalesSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.Mixed,
      ref: "Customer",
      required: true,
      validate: {
        validator: function (value) {
          return (
            (typeof value === "object" && value.name) || // Manual entry
            mongoose.isValidObjectId(value) // Reference to Customer model
          );
        },
        message:
          "Customer must be an existing reference or a valid manual entry.",
      },
    },
    cart: {
      type: [
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
      required: true,

      validate: {
        validator: function (val) {
          // Allow empty cart only if the sale has at least one return entry
          return val.length > 0 || this.hasReturns;
        },
        message: "Cart cannot be empty unless a return is processed.",
      },
    },
    hasReturns: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    due: {
      type: Number,
      required: true,
    },
    cash: {
      type: Number,
      required: true,
    },
    bank: {
      type: Number,
      required: true,
    },
    bankInfo: {
      type: mongoose.Types.ObjectId,
      ref: "Bank",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Completed",
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Credit Card", "Online"],
      default: "Cash",
    },
    storeInfo: {
      type: mongoose.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    trxid: {
      type: String,
      required: true,
      unique: true,
      default: generateTrxId,
    },
  },
  { timestamps: true }
);

// **Reduce stock when a sale is created**
SalesSchema.pre("save", async function (next) {
  try {
    if (this.hasReturns === false) {
      for (const item of this.cart) {
        const product = await Stock.findById(item.product);
        if (!product) {
          throw new Error(`Product with ID ${item.product} not found`);
        }

        if (product.quantity < item.qty) {
          throw new Error(`Not enough stock for ${product.name}`);
        }

        product.quantity -= item.qty; // Reduce stock
        await product.save(); // Update the product stock in the database
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

//calculate financial when a sale is created
SalesSchema.pre("save", async function (next) {
  try {
    const financial = await Financial.findOne({ storeInfo: this.storeInfo });

    if (!financial) {
      throw new Error("Financial record not found for this store");
    }

    let totalSalesRevenue = this.totalPrice;

    financial.totalSalesRevenue += totalSalesRevenue;
    //calculete profit
    financial.totalProfit =
      financial.totalSalesRevenue -
      (financial.totalPurchaseCost + financial.totalExpenses);

    //calculete due
    financial.totalDue += this.due;

    await financial.save();
    next();
  } catch (error) {
    next(error);
  }
});

const Sales = mongoose.model("Sales", SalesSchema);

module.exports = Sales;
