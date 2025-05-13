const Stock = require("../../../models/storeAdmin/stockSchema");

//get all stock
const getStocks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default page is 1
    const limit = parseInt(req.query.limit) || 10; // Default limit is 10
    const skip = (page - 1) * limit; // Calculate offset

    // Get total count
    const totalCustomers = await Stock.countDocuments({
      storeInfo: req.store.storeId,
    });

    //get category from database
    const stocks = await Stock.find({ storeInfo: req.store.storeId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("supplierInfo");

    //send the response
    if (stocks && stocks.length >= 0) {
      res.json({
        data: stocks,
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
          msg: "Unknown error occured!",
        },
      },
    });
  }
};

//get a stock
const getStock = async (req, res) => {
  try {
    const stockId = req.params.stockId;
    //get stock from database
    const stock = await Stock.findOne({
      storeInfo: req.store.storeId,
      _id: stockId,
    }).populate(["supplierInfo", "category", "storeInfo"]);

    //send the response
    if (stock && stock?._id) {
      res.json({
        data: stock,
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

//search a stock
const searchStock = async (req, res) => {
  try {
    //get search query
    const search = req.query?.name;

    //get stocks from database
    const stocks = await Stock.find({
      storeInfo: req.store.storeId,
      $or: [{ name: { $regex: search, $options: "i" }, quantity: { $gt: 0 } }],
    }).populate(["supplierInfo", "category"]);

    //send the response
    if (stocks && stocks.length >= 0) {
      res.json({
        data: stocks,
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

//create a stock
const createStock = async (req, res) => {
  try {
    //make user object
    const newStock = new Stock({
      ...req.body,
      totalPrice: req.body?.purchasePrice * req.body?.quantity,
      picture: null,
      storeInfo: req.store?.storeId,
    });

    //save stock in database
    const stock = await newStock.save();

    //send the response
    if (stock && stock?._id) {
      res.json({
        data: stock,
        msg: "Stock was create successful!",
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

//update a stock by id
const updateStock = async (req, res) => {
  try {
    //get stock id
    const stockId = req.params.stockId;

    //update stock
    const stock = await Stock.findOneAndUpdate(
      {
        _id: stockId,
        storeInfo: req.store.storeId,
      },
      {
        ...req.body,
        totalPrice: req.body?.purchasePrice * req.body?.quantity,
      },
      { new: true }
    );

    //send the response
    if (stock && stock._id) {
      res.json({
        data: stock,
        msg: "Stock was update successful!",
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

//delete a stock by id
const deleteStock = async (req, res) => {
  try {
    //get stock id
    const stockId = req.params.stockId;

    //delete stock
    const stock = await Stock.findOneAndDelete({
      _id: stockId,
      storeInfo: req.store.storeId,
    });

    //send the response
    if (stock && stock._id) {
      res.json({
        data: stock,
        msg: "Stock was delete successful!",
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
  getStocks,
  getStock,
  searchStock,
  createStock,
  updateStock,
  deleteStock,
};
