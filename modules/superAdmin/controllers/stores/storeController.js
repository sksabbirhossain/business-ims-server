/*
 * Business-IMS Server — Inventory Management System API
 * Copyright (c) 2025 Sk Sabbir Hossain
 * Licensed under a custom license. Unauthorized use, reproduction, or distribution is strictly prohibited.
 * Official Repository: https://github.com/sksabbirhossain/business-ims-server
 */
const bcrypt = require("bcrypt");
const Store = require("../../models/storeSchema");

//get all stores with pagination
const getAllStores = async (req, res) => {
  try {
    //get page and limit from query
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    //get all stores with pagination
    const stores = await Store.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .select("-password -__v");

    //get total count of stores
    const totalStore = await Store.countDocuments();

    //send the response
    if (stores && stores.length >= 0) {
      res.json({
        data: stores,
        total: totalStore,
        currentPage: page,
        totalPages: Math.ceil(totalStore / limit),
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

// get a store by ID
const getStoreById = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    //check store ID is valid
    if (!storeId) {
      return res.status(400).json({
        errors: {
          common: {
            msg: "Store ID is required!",
          },
        },
      });
    }
    const store = await Store.findById(storeId).select("-password -__v");
    if (!store) {
      return res.status(404).json({
        errors: {
          common: {
            msg: "Store not found!",
          },
        },
      });
    }
    //send the response
    res.json({
      data: store,
    });
    
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
};

//created store
const createStore = async (req, res) => {
  try {
    //check store exsit
    const storeExsit = await Store.find({ email: req.body.email });
    if (storeExsit._id) {
      return res.json({
        errors: {
          common: {
            msg: "Store already exsit!",
          },
        },
      });
    }

    //make password hash
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    //make user object
    const newStore = new Store({
      ...req.body,
      picture: null,
      password: hashedPassword,
    });

    //save user in database
    const store = await newStore.save();

    //send the response
    if (store && store._id) {
      res.json({
        data: store,
        msg: "Store was create successful!",
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
  getAllStores,
  getStoreById,
  createStore,
};
