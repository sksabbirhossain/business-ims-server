const Bank = require("../../../models/storeAdmin/bankSchema");

//create bank
const createBank = async (req, res) => {
  try {
    //make user object
    const newBank = new Bank({
      ...req.body,
      picture: null,
      storeInfo: req.store?.storeId,
    });

    //save user in database
    const bank = await newBank.save();

    //send the response
    if (bank && bank._id) {
      res.json({
        data: bank,
        msg: "Bank was create successful!",
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
  createBank,
};
