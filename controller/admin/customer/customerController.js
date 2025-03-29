const Customer = require("../../../models/storeAdmin/customerSchema");

//create customer
const createCustomer = async (req, res) => {
    try {
    //make user object
    const newCustomer = new Customer({
      ...req.body,
      picture: null,
      storeInfo: req.store?.storeId,
    });

    //save user in database
    const customer = await newCustomer.save();

    //send the response
    if (customer && customer._id) {
      res.json({
        data: customer,
        msg: "Customer was create successful!",
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
  createCustomer,
};
