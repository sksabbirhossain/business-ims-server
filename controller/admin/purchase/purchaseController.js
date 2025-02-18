const Purchase = require("../../../models/storeAdmin/purchaseSchema");

//get all purchase
const getPurchases = async (req, res) => {
  try {
    //get category from database
    const purchase = await Purchase.find({ storeInfo: req.store.storeId }).sort(
      { createdAt: 1 }
    );

    //send the response
    if (purchase && purchase.length >= 0) {
      res.json({
        data: purchase,
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

//get a purchase
const getPurchase = async (req, res) => {
  try {
    const purchaseId = req.params.purchaseId;
    //get category from database
    const purchase = await Purchase.findOne({
      storeInfo: req.store.storeId,
      _id: purchaseId,
    });

    //send the response
    if (purchase && purchase?._id) {
      res.json({
        data: purchase,
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
  getPurchases,
  getPurchase,
  createPurchase,
};
