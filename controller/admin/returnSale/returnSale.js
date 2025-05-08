// Optional: If you want a separate returns collection

const Financial = require("../../../models/storeAdmin/financialSchema");
const ReturnSale = require("../../../models/storeAdmin/returnSale");
const Sales = require("../../../models/storeAdmin/salesSchema");
const Stock = require("../../../models/storeAdmin/stockSchema");

//get all return sales
const returnSales = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default page is 1
    const limit = parseInt(req.query.limit) || 10; // Default limit is 10
    const skip = (page - 1) * limit; // Calculate offset

    // Get total count
    const totalReturnSales = await ReturnSale.countDocuments({
      storeInfo: req.store.storeId,
    });

    //get category from database
    const returnSales = await ReturnSale.find({
      storeInfo: req.store.storeId,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate(["product", "sales"]);

    //send the response
    if (returnSales && returnSales.length >= 0) {
      res.json({
        data: returnSales,
        total: totalReturnSales,
        currentPage: page,
        totalPages: Math.ceil(totalReturnSales / limit),
        limit: limit,
      });
    } else {
      res.json({
        errors: {
          common: {
            msg: "Unknown error occured!",
          },
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
};

//create return sales
const createReturnSale = async (req, res) => {
  try {
    const { trxid, product, qty, price } = req.body;

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
      (item) => item.product._id.toString() === product
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
    const stockItem = await Stock.findById(product);
    if (!stockItem) {
      return res.status(404).json({
        errors: {
          common: {
            msg: "Return quantity exceeds purchased quantity!",
          },
        },
      });
    }
    stockItem.quantity += Number(qty);

    await stockItem.save();

    //update sales: decrease the sale cart product qty
    // Decrease sold quantity in `Sales` cart
    if (saleItem.qty === Number(qty)) {
      // If returning full quantity, remove the product from the cart
      sales.cart = sales.cart.filter(
        (item) => item.product._id.toString() !== product
      );
    } else {
      // Otherwise, just decrease the quantity
      saleItem.qty -= Number(qty);
    }

    // Recalculate subtotal & total price
    sales.subTotal = sales.cart.reduce(
      (acc, item) => acc + item.qty * item.price,
      0
    );

    // if return product then discount will be valid
    sales.discount = 0;

    //make total price
    sales.totalPrice = sales.subTotal;

    //if return all products
    if (sales.cart.length === 0) {
    }
    sales.hasReturns = true;

    await sales.save();

    //calculete profit
    const finance = await Financial.findOne({ storeInfo: req.store?.storeId });
    if (!finance) return;

    //calculete total sales revenue
    finance.totalSalesRevenue -= price * qty;

    //calculete total profit
    finance.totalProfit =
      finance.totalSalesRevenue -
      (finance.totalPurchaseCost + finance.totalExpenses);

    await finance.save();

    // Store return record
    const returnData = new ReturnSale({
      trxid,
      product,
      sales: sales?._id,
      qty,
      price,
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

//delete return sale
const deleteReturnSale = async (req, res) => {
  try {
    //get sales id
    const returnSalesId = req.params.returnSalesId;

    //delete sales
    const sales = await ReturnSale.findOneAndDelete({
      _id: returnSalesId,
      storeInfo: req.store?.storeId,
    });

    //send the response
    if (sales) {
      res.json({
        data: sales,
        msg: "Return Sales was deleted successful!",
      });
    } else {
      res.json({
        errors: {
          common: {
            msg: "Unknown error occured!",
          },
        },
      });
    }
  } catch (err) {
    res.json({
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
};

module.exports = {
  returnSales,
  createReturnSale,
  deleteReturnSale,
};
