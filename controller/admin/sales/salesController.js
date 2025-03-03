const Sales = require("../../../models/storeAdmin/salesSchema");

//create sales payment
const createSalesPayment = async (req, res) => {
  try {
    console.log(req.body.cart);
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
  createSalesPayment,
};
