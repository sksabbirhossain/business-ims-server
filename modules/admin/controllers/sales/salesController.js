/*
 * Business-IMS Server — Inventory Management System API
 * Copyright (c) 2025 Sk Sabbir Hossain
 * Licensed under a custom license. Unauthorized use, reproduction, or distribution is strictly prohibited.
 * Official Repository: https://github.com/sksabbirhossain/business-ims-server
 */
const mongoose = require("mongoose");

const Customer = require("../../models/customerSchema");
const Financial = require("../../models/financialSchema");
const Sales = require("../../models/salesSchema");
const DuePayment = require("../../models/duePaymentSchema");

//get all sales
const getAllSales = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default page is 1
    const limit = parseInt(req.query.limit) || 10; // Default limit is 10
    const skip = (page - 1) * limit; // Calculate offset

    // Get total count
    const totalSales = await Sales.countDocuments({
      storeInfo: req.store.storeId,
    });

    //get all sales
    const sales = await Sales.find({ storeInfo: req.store?.storeId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    for (const sale of sales) {
      // Check if `customer` is an ObjectId (string)
      if (mongoose.isValidObjectId(sale.customer)) {
        sale.customer = await Customer.findById(sale.customer).lean();
      }
    }

    //send the response
    if (sales) {
      res.json({
        data: sales,
        total: totalSales,
        currentPage: page,
        totalPages: Math.ceil(totalSales / limit),
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
    res.json({
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
};
//get all sales
const getDueSales = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default page is 1
    const limit = parseInt(req.query.limit) || 10; // Default limit is 10
    const skip = (page - 1) * limit; // Calculate offset

    // Get total count
    const totalDueSales = await Sales.countDocuments({
      storeInfo: req.store.storeId,
      due: { $gt: 0 },
    });

    //get all sales
    const dueSales = await Sales.find({
      storeInfo: req.store?.storeId,
      due: { $gt: 0 },
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    for (const sale of dueSales) {
      // Check if `customer` is an ObjectId (string)
      if (mongoose.isValidObjectId(sale.customer)) {
        sale.customer = await Customer.findById(sale.customer).lean();
      }
    }

    //send the response
    if (dueSales) {
      res.json({
        data: dueSales,
        total: totalDueSales,
        currentPage: page,
        totalPages: Math.ceil(totalDueSales / limit),
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
    res.json({
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
};

//search sales by trxid
const searchSalesByTrxId = async (req, res) => {
  try {
    //get trxid
    const trxid = req.query.trxId;

    //search sales by trxid
    const sales = await Sales.findOne({
      trxid: trxid,
      storeInfo: req.store?.storeId,
    }).populate("cart.product");

    //send the response
    if (sales) {
      res.json({
        data: sales,
      });
    } else {
      res.json({
        data: [],
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

//search due sales by trxid or customer name
const searchDueSalesByNameTrxId = async (req, res) => {
  try {
    const searchQuery = req.query.query?.trim();
    const storeId = req.store?.storeId;

    if (!searchQuery || !storeId) {
      return res.status(400).json({
        errors: {
          common: {
            msg: "Search query and store ID are required",
          },
        },
      });
    }
    // Find customers by name
    const matchedCustomers = await Customer.find({
      storeInfo: storeId,
      name: new RegExp(searchQuery, "i"),
    }).select("_id");

    const customerIds = matchedCustomers.map((c) => c._id.toString());

    // Use $or to search by trxid or customer id
    const sales = await Sales.find({
      storeInfo: storeId,
      due: { $gt: 0 },
      $or: [
        { trxid: new RegExp(searchQuery, "i") },
        { customer: { $in: customerIds } },
      ],
    }).populate("cart.product customer");

    //send the response
    if (sales) {
      res.json({
        data: sales,
      });
    } else {
      res.json({
        data: [],
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

//get a single sales
const getSale = async (req, res) => {
  try {
    //get sales id
    const salesId = req.params.salesId;

    //get all sales
    const sale = await Sales.findOne({
      _id: salesId,
      storeInfo: req.store?.storeId,
    }).populate(["cart.product", "bankInfo"]);

    // Check if `customer` is an ObjectId (string)
    if (mongoose.isValidObjectId(sale.customer)) {
      sale.customer = await Customer.findById(sale.customer).lean();
    }

    //send the response
    if (sale) {
      res.json({
        data: sale,
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

//create sales payment
const createSalesPayment = async (req, res) => {
  try {
    //create sales payment
    const salesPayment = new Sales({
      ...req.body,
      storeInfo: req.store?.storeId,
    });

    //save sales payment
    const sales = await salesPayment.save();

    //send the response
    if (sales && sales?._id) {
      res.json({
        data: sales,
        msg: "Sales was create successful!",
      });
    } else {
      res.json({
        errors: {
          common: {
            msg: "Unknown error occured!1",
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

//create due sales payment
const createDueSalesPayment = async (req, res) => {
  try {
    //check if amount is exists
    if (!req.body.amount) {
      return res.json({
        errors: {
          common: {
            msg: "Paid amount is required!",
          },
        },
      });
    }
    //check if amount is number
    if (isNaN(req.body.amount)) {
      return res.json({
        errors: {
          common: {
            msg: "Paid amount must be a number!",
          },
        },
      });
    }
    //check if amount is a valid number
    if (req.body.amount < 0 || !isFinite(req.body.amount)) {
      return res.json({
        errors: {
          common: {
            msg: "Paid amount must be a valid number!",
          },
        },
      });
    }

    //check if salesid is exists
    if (!req.body.saleId) {
      return res.json({
        errors: {
          common: {
            msg: "Sale ID is required!",
          },
        },
      });
    }
    //check if sale exists
    const existingSale = await Sales.findOne({
      _id: req.body.saleId,
      storeInfo: req.store?.storeId,
    });
    if (!existingSale) {
      return res.json({
        errors: {
          common: {
            msg: "Sale not found!",
          },
        },
      });
    }
    //check if due amount is greater than 0
    if (existingSale.due <= 0) {
      return res.json({
        errors: {
          common: {
            msg: "Due amount must be greater than 0!",
          },
        },
      });
    }
    //check if paid amount is greater than 0
    if (req.body.amount <= 0) {
      return res.json({
        errors: {
          common: {
            msg: "Paid amount must be greater than 0!",
          },
        },
      });
    }
    //check if paid amount is greater than due amount
    if (req.body.amount > existingSale.due) {
      return res.json({
        errors: {
          common: {
            msg: "Paid amount must be less than or equal to due amount!",
          },
        },
      });
    }
    //check if paid amount is equal to due amount
    if (req.body.amount === existingSale.due) {
      //update sales due to 0
      existingSale.due = 0;
      await existingSale.save();
    } else {
      //update sales due amount
      existingSale.due -= req.body.amount;
      await existingSale.save();
    }
    //create due payment
    const duePayment = new DuePayment({
      name: existingSale.customer?.name || "N/A", // Use customer name if available
      amount: req.body.amount,
      totalAmount: existingSale.totalPrice, // Total amount of the original sale
      storeInfo: req.store?.storeId,
      trxid: existingSale.trxid, // Use the same transaction ID as the original sale
      saleId: existingSale._id, // Link to the original sale
    });
    //save due payment
    await duePayment.save();

    //calculete profit
    const finance = await Financial.findOne({ storeInfo: req.store?.storeId });
    if (!finance) return;
    //calculete total sales revenue
    finance.totalSalesRevenue += req.body.amount;
    //calculete total profit
    finance.totalProfit =
      finance.totalSalesRevenue -
      (finance.totalPurchaseCost + finance.totalExpenses);
    //calculete total due
    finance.totalDue -= req.body.amount;
    //save finance
    await finance.save();
    //send the response
    res.json({
      data: duePayment,
      msg: "Due Sales Payment was created successful!",
    });
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

//delete sales by id
const deleteSale = async (req, res) => {
  try {
    //get sales id
    const salesId = req.params.salesId;

    //delete sales
    const sales = await Sales.findOneAndDelete({
      _id: salesId,
      storeInfo: req.store?.storeId,
    });

    //calculete profit
    const finance = await Financial.findOne({ storeInfo: req.store?.storeId });
    if (!finance) return;

    //calculete total sales revenue
    finance.totalSalesRevenue -= sales?.totalPrice;

    //calculete total profit
    finance.totalProfit =
      finance.totalSalesRevenue -
      (finance.totalPurchaseCost + finance.totalExpenses);

    await finance.save();

    //send the response
    if (sales) {
      res.json({
        data: sales,
        msg: "Sales was deleted successful!",
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
  getAllSales,
  getDueSales,
  searchSalesByTrxId,
  searchDueSalesByNameTrxId,
  getSale,
  createSalesPayment,
  createDueSalesPayment,
  deleteSale,
};
