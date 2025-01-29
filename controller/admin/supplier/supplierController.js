const Supplier = require("../../../models/storeAdmin/supplierSchema");

//get suppliers
const suppliers = async (req, res) => {
  try {
    //get suppliers
    const suppliers = await Supplier.find({ storeInfo: req.store?.storeId });

    //send the response
    if (suppliers && suppliers[0]._id) {
      res.json({
        data: suppliers,
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

module.exports = {
  suppliers,
  getSupplier,
  createSupplier,
};
