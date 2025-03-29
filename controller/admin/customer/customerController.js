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

//update customer by id
const updateCustomer = async (req, res) => {
  try {
    const { customerId } = req.params || {};

    //get category from database
    const customer = await Customer.findOne({
      _id: customerId,
      storeInfo: req.store.storeId,
    });

    // if customer not found
    if (!customer?._id) {
      return res.json({
        errors: {
          common: {
            msg: "customer was not found!",
          },
        },
      });
    }

    const updateData = req.body;

    // If an image is uploaded, add its path to updateData
    if (req.file) {
      updateData.picture = req.file.path;
    }

    const updatedCustomer = await Customer.findOneAndUpdate(
      {
        _id: customerId,
        storeInfo: req.store.storeId,
      },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    //send the response
    if (updatedCustomer?._id) {
      res.json({
        data: updatedCustomer,
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
  updateCustomer,
};
