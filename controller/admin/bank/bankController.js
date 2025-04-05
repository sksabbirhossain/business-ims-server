const Bank = require("../../../models/storeAdmin/bankSchema");

//get all bank with pagination
const getBanks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default page is 1
    const limit = parseInt(req.query.limit) || 10; // Default limit is 10
    const skip = (page - 1) * limit; // Calculate offset

    // Get total count
    const totalBanks = await Bank.countDocuments({
      storeInfo: req.store.storeId,
    });

    //get bank from database
    const bank = await Bank.find({ storeInfo: req.store.storeId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    //send the response
    if (bank && bank.length >= 0) {
      res.json({
        data: bank,
        total: totalBanks,
        currentPage: page,
        totalPages: Math.ceil(totalBanks / limit),
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

//create bank
const createBank = async (req, res) => {
  try {
    //make user object
    const newBank = new Bank({
      ...req.body,
      picture: null,
      storeInfo: req.store?.storeId,
    });

    //save user in database
    const bank = await newBank.save();

    //send the response
    if (bank && bank._id) {
      res.json({
        data: bank,
        msg: "Bank was create successful!",
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
  getBanks,
  createBank,
};
