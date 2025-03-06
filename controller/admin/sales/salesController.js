const Sales = require("../../../models/storeAdmin/salesSchema");

//get all sales
const getAllSales = async (req, res) => {
  try {
    //get all sales
    const sales = await Sales.find({ storeInfo: req.store?.storeId });

    //send the response
    if (sales) {
      res.json({
        data: sales,
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

//get a single sales
const getSale = async (req, res) => {
  try {
    //get sales id
    const salesId = req.params.salesId;

    //get all sales
    const sale = await Sales.findOne({
      _id: salesId,
      storeInfo: req.store?.storeId,
    }).populate("cart.product");

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
  searchSalesByTrxId,
  getSale,
  createSalesPayment,
  deleteSale,
};
