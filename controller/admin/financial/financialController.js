const Financial = require("../../../models/storeAdmin/financialSchema");

//getFinances by storeId
const getFinance = async (req, res) => {
  try {
    //get category from database
    const finance = await Financial.findOne({ storeInfo: req.store.storeId });

    //send the response
    if (finance?._id) {
      res.json({
        data: finance,
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
  getFinance,
};
