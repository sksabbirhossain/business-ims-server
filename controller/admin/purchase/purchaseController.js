const {
  addStockQueue,
  addStockQueueName,
} = require("../../../jobs/addStockQueueJob");
const Purchase = require("../../../models/storeAdmin/purchaseSchema");

//get all purchase
const getPurchases = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default page is 1
    const limit = parseInt(req.query.limit) || 10; // Default limit is 10
    const skip = (page - 1) * limit; // Calculate offset

    // Get total count
    const totalPurchases = await Purchase.countDocuments({
      storeInfo: req.store.storeId,
    });

    //get category from database
    const purchase = await Purchase.find({ storeInfo: req.store.storeId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("supplierInfo");

    //send the response
    if (purchase && purchase.length >= 0) {
      res.json({
        data: purchase,
        total: totalPurchases,
        currentPage: page,
        totalPages: Math.ceil(totalPurchases / limit),
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
    }).populate(["supplierInfo", "category", "storeInfo"]);

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
      totalPrice: req.body?.purchasePrice * req.body?.quantity,
      picture: null,
      storeInfo: req.store?.storeId,
    });

    //save user in database
    const purchase = await newPurchase.save();

    //send the response
    if (purchase && purchase?._id) {
      if (req.body?.isStock) {
        // add stock by queue
        await addStockQueue.add(addStockQueueName, purchase);
      }
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
          // msg: err,
          msg: "Unknown error occured!!",
        },
      },
    });
  }
};

//update purchase by id
const updatePurchase = async (req, res) => {
  try {
    //get purchase id
    const purchaseId = req.params.purchaseId;

    //update purchase
    const purchase = await Purchase.findOneAndUpdate(
      {
        _id: purchaseId,
        storeInfo: req.store.storeId,
      },
      {
        ...req.body,
        totalPrice: req.body?.purchasePrice * req.body?.quantity,
      },
      { new: true }
    );

    //send the response
    if (purchase && purchase._id) {
      res.json({
        data: purchase,
        msg: "Purchase was update successful!",
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

//delete purchase by id
const deletePurchase = async (req, res) => {
  try {
    //get purchase id
    const purchaseId = req.params.purchaseId;

    //delete purchase
    const purchase = await Purchase.findOneAndDelete({
      _id: purchaseId,
      storeInfo: req.store.storeId,
    });

    //send the response
    if (purchase && purchase._id) {
      res.json({
        data: purchase,
        msg: "Purchase was delete successful!",
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
  updatePurchase,
  deletePurchase,
};
