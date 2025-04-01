const Customer = require("../../../models/storeAdmin/customerSchema");

//get customers
const getCustomers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default page is 1
    const limit = parseInt(req.query.limit) || 10; // Default limit is 10
    const skip = (page - 1) * limit; // Calculate offset

    // Get total count
    const totalCustomers = await Customer.countDocuments({
      storeInfo: req.store.storeId,
    });

    //get Cusotmer from database
    const customer = await Customer.find({ storeInfo: req.store.storeId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    //send the response
    if (customer && customer.length >= 0) {
      res.json({
        data: customer,
        total: totalCustomers,
        currentPage: page,
        totalPages: Math.ceil(totalCustomers / limit),
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

//get all customer
const getAllCustomer = async (req, res) => {
  try {
    //get Cusotmer from database
    const customer = await Customer.find({ storeInfo: req.store.storeId }).sort(
      { createdAt: -1 }
    );

    //send the response
    if (customer && customer.length >= 0) {
      res.json({
        data: customer,
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

//get a customer by id
const getCustomer = async (req, res) => {
  try {
    const { customerId } = req.params || {};
    //get category from database
    const customer = await Customer.findOne({
      _id: customerId,
      storeInfo: req.store.storeId,
    });

    //send the response
    if (customer && customer._id) {
      res.json({
        data: customer,
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

    //get customer from database
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

//delete a customer by customer id
const deleteCustomer = async (req, res) => {
  try {
    const { customerId } = req.params || {};

    const deletedCustomer = await Customer.findByIdAndDelete({
      _id: customerId,
      storeInfo: req.store.storeId,
    });

    //send the response
    if (deletedCustomer) {
      res.status(200).json({
        status: 200,
        msg: "Customer deleted successful!",
      });
    } else {
      res.status(404).json({
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
  getCustomers,
  getAllCustomer,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
