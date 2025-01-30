const Purchase = require("../../../models/storeAdmin/purchaseSchema");

//create purchase
const createPurchase = async (req, res) => {
  try {
    //make user object
    const newPurchase = new Purchase({
      ...req.body,
      picture: null,
      storeInfo: req.store?.storeId,
    });

    //save user in database
    const purchase = await newPurchase.save();

    //send the response
    if (purchase && purchase?._id) {
      //TODO: add stock by queue
      res.json({
        data: purchase,
        msg: "Purchase was create successful!",
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
          msg: "Unknown error occured!",
        },
      },
    });
  }
};

module.exports = {
  createPurchase,
};
