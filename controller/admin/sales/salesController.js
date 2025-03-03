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

module.exports = {
  getAllSales,
  createSalesPayment,
};
