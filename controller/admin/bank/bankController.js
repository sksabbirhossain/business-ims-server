const Bank = require("../../../models/storeAdmin/bankSchema");

//get banks with pagination
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

//get all bank
const getAllBanks = async (req, res) => {
  try {
    //get bank from database
    const bank = await Bank.find({ storeInfo: req.store.storeId }).sort({
      createdAt: -1,
    });

    //send the response
    if (bank && bank.length >= 0) {
      res.json({
        data: bank,
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

//get a bank by id
const getbank = async (req, res) => {
  try {
    const { bankId } = req.params || {};
    //get bank from database
    const bank = await Bank.findOne({
      _id: bankId,
      storeInfo: req.store.storeId,
    });

    //send the response
    if (bank && bank._id) {
      res.json({
        data: bank,
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

//update a bank by id
const updateBank = async (req, res) => {
  try {
    const { bankId } = req.params || {};

    //get bank from database
    const bank = await Bank.findOne({
      _id: bankId,
      storeInfo: req.store.storeId,
    });

    // if bank not found
    if (!bank?._id) {
      return res.json({
        errors: {
          common: {
            msg: "bank was not found!",
          },
        },
      });
    }

    const updateData = req.body;

    // If an image is uploaded, add its path to updateData
    if (req.file) {
      updateData.picture = req.file.path;
    }

    const updatedbank = await Bank.findOneAndUpdate(
      {
        _id: bankId,
        storeInfo: req.store.storeId,
      },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    //send the response
    if (updatedbank?._id) {
      res.json({
        data: updatedbank,
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
    // console.log(err)
    res.json({
      errors: {
        common: {
          // msg: err.message,
          msg: "Unknown error occured!",
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

//delete a bank by bank id
const deleteBank = async (req, res) => {
  try {
    const { bankId } = req.params || {};

    const deletedBank = await Bank.findByIdAndDelete({
      _id: bankId,
      storeInfo: req.store.storeId,
    });

    //send the response
    if (deletedBank) {
      res.status(200).json({
        status: 200,
        msg: "bank deleted successful!",
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
    // console.log(err)
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
  getAllBanks,
  getbank,
  updateBank,
  createBank,
  deleteBank,
};
