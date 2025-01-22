const Supplier = require("../../../models/storeAdmin/supplierSchema");

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
  createSupplier,
};
