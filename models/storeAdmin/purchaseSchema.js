const mongoose = require("mongoose");
const Financial = require("./financialSchema");

const purchaseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    purchasePrice: {
      type: Number,
      required: true,
    },

    sellingPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    supplierInfo: {
      type: mongoose.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    storeInfo: {
      type: mongoose.Types.ObjectId,
      ref: "Store",
      required: true,
    },

    sku: {
      type: String,
      // required: true,
      trim: true,
    },
    Barcode: {
      type: String,
      //   required: true,
      trim: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    uom: {
      type: String,
      enum: ["KG", "PIECE", "LITER"],
      required: true,
      uppercase: true,
    },
    picture: String,
    picture_info: {
      public_key: String,
    },
  },
  { timestamps: true }
);

// Middleware to update financial model after purchase
purchaseSchema.post("save", async function (doc, next) {
  try {
    const finance = await Financial.findOne({ storeInfo: doc.storeInfo });
    finance.totalPurchaseCost += doc.totalPrice;
    //calculete profit
    finance.totalProfit =
      finance.totalSalesRevenue -
      (finance.totalPurchaseCost + finance.totalExpenses);
    await finance.save();
    next();
  } catch (error) {
    next(error);
  }
});

// Middleware to update financial model before delete purchase
purchaseSchema.post("findOneAndDelete", async function (doc) {
  try {
    if (!doc) return;
    const finance = await Financial.findOne({ storeInfo: doc.storeInfo });
    if (!finance) return;
    finance.totalPurchaseCost -= doc.totalPrice;

    //calculete profit
    finance.totalProfit =
      finance.totalSalesRevenue -
      (finance.totalPurchaseCost + finance.totalExpenses);

    await finance.save();
  } catch (error) {
    console.log(error);
  }
});

// Middleware to update financial model before updateing purchase
purchaseSchema.pre("findOneAndUpdate", async function (next) {
  try {
    // Find the old purchase document before update
    const oldPurchase = await this.model.findOne(this.getQuery());

    if (!oldPurchase) {
      return next(new Error("Purchase not found"));
    }

    // Get new purchase values from update operation
    const updateData = this.getUpdate();
    const newPurchasePrice = updateData.totalPrice || oldPurchase.totalPrice; // If not updated, keep old value

    // Calculate the price difference
    const priceDifference = newPurchasePrice - oldPurchase.totalPrice;

    // Update the financial record
    const finance = await Financial.findOne({
      storeInfo: oldPurchase.storeInfo,
    });

    if (!finance) {
      return next(new Error("Financial record not found"));
    }

    finance.totalPurchaseCost += priceDifference; // Adjust total purchase cost
    //calculete profit
    finance.totalProfit =
      finance.totalSalesRevenue -
      (finance.totalPurchaseCost + finance.totalExpenses);

    await finance.save();
    next();
  } catch (error) {
    next(error);
  }
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase;
