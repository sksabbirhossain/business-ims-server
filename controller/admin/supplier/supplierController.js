const Supplier = require("../../../models/storeAdmin/supplierSchema");

//get all supplier suppliers with pagination
const suppliers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default page is 1
    const limit = parseInt(req.query.limit) || 10; // Default limit is 10
    const skip = (page - 1) * limit; // Calculate offset

    // Get total count
    const totalSuppliers = await Supplier.countDocuments({
      storeInfo: req.store.storeId,
    });

    //get suppliers
    const suppliers = await Supplier.find({ storeInfo: req.store?.storeId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    //send the response
    if (suppliers) {
      res.json({
        data: suppliers,
        total: totalSuppliers,
        currentPage: page,
        totalPages: Math.ceil(totalSuppliers / limit),
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

//get suppliers
const getSupplier = async (req, res) => {
  try {
    const supplierId = req.params.supplierId;
    //get suppliers
    const supplier = await Supplier.findOne({
      _id: supplierId,
      storeInfo: req.store?.storeId,
    });

    //send the response
    if (supplier && supplier._id) {
      res.json({
        data: supplier,
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

//create a supplier
const createSupplier = async (req, res) => {
  try {
    //make supplier object
    const newSupplier = new Supplier({
      ...req.body,
      picture: null,
      storeInfo: req.store?.storeId,
    });

    //save supplier in database
    const supplier = await newSupplier.save();

    //send the response
    if (supplier && supplier._id) {
      res.json({
        data: supplier,
        msg: "Supplier was create successful!",
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

//update a supplier by supplier id
const updateSupplier = async (req, res) => {
  try {
    //get supplier id
    const supplierId = req.params.supplierId;

    //save supplier in database
    const supplier = await Supplier.findOneAndUpdate(
      {
        _id: supplierId,
        storeInfo: req.store.storeId,
      },
      { ...req.body },
      { new: true }
    );

    //send the response
    if (supplier && supplier._id) {
      res.json({
        data: supplier,
        msg: "Supplier was update successful!",
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

//update a supplier by supplier id
const deleteSupplier = async (req, res) => {
  try {
    //get supplier id
    const supplierId = req.params.supplierId;

    //save supplier in database
    const supplier = await Supplier.findByIdAndDelete({
      _id: supplierId,
      storeInfo: req.store.storeId,
    });

    //send the response
    if (supplier && supplier._id) {
      res.json({
        data: supplier,
        msg: "Supplier was Delete successful!",
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
  suppliers,
  getSupplier,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
