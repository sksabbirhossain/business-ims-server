// Optional: If you want a separate returns collection

const ReturnSale = require("../../../models/storeAdmin/returnSale");
const Sales = require("../../../models/storeAdmin/salesSchema");
const Stock = require("../../../models/storeAdmin/stockSchema");

const createReturnSale = async (req, res) => {
  try {
    const { trxid, productId, qty } = req.body;

    // Find the sale transaction
    const sales = await Sales.findOne({
      trxid,
      storeInfo: req.store?.storeId,
    }).populate("cart.product");

    if (!sales) {
      return res.status(404).json({
        errors: {
          common: {
            msg: "Sales not found!",
          },
        },
      });
    }

    // Find the product in the sale
    const saleItem = sales.cart.find(
      (item) => item.product._id.toString() === productId
    );

    //if product not in the cart
    if (!saleItem) {
      return res.status(400).json({
        errors: {
          common: {
            msg: "Product not found in sale!",
          },
        },
      });
    }

    // Check if the return quantity is valid
    if (saleItem.qty < qty) {
      return res.status(400).json({
        errors: {
          common: {
            msg: "Return quantity exceeds purchased quantity!",
          },
        },
      });
    }

    // Update Stock: Increase the product quantity
    await Stock.findByIdAndUpdate(
      { _id: productId },
      { $inc: { quantity: qty } }, // Increment stock quantity
      { new: true }
    );

    //update sales: decrease the sale cart product qty
    // Decrease sold quantity in `Sales` cart
    if (saleItem.qty === qty) {
      // If returning full quantity, remove the product from the cart
      sales.cart = sales.cart.filter(
        (item) => item.product._id.toString() !== productId
      );
    } else {
      // Otherwise, just decrease the quantity
      saleItem.qty -= qty;
    }

    await sales.save();

    // Store return record
    const returnData = new ReturnSale({
      trxid,
      productId,
      qty,
      storeInfo: req.store?.storeId,
      returnedAt: new Date(),
    });
    const result = await returnData.save();

    //send the final response
    if (result?._id) {
      return res.json({
        data: result,
        message: "Product returned successfully!",
      });
    } else {
      return res.json({
        errors: {
          common: {
            msg: "Unknown error occured!",
          },
        },
      });
    }
  } catch (err) {
    return res.status(500).json({
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
};

module.exports = {
  createReturnSale,
};
