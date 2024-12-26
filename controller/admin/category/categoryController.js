const Category = require("../../../models/storeAdmin/categorySchema");

//get all category
const getCategories = async (req, res) => {
  try {
    //get category from database
    const category = await Category.find().sort({ createdAt: 1 });

    //send the response
    if (category && category.length >= 0) {
      res.json({
        data: category,
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

//get a category by id
const getCategory = async (req, res) => {
  try {
    const { categoryId } = req.params || {};
    //get category from database
    const category = await Category.findOne({
      _id: categoryId,
      storeInfo: req.store.storeId,
    });

    //send the response
    if (category && category._id) {
      res.json({
        data: category,
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

//create category
const createCategory = async (req, res) => {
  try {
    //make user object
    const newCategory = new Category({
      ...req.body,
      picture: null,
      storeInfo: req.store?.storeId,
    });

    //save user in database
    const category = await newCategory.save();

    //send the response
    if (category && category._id) {
      res.json({
        data: category,
        msg: "Category was create successful!",
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
  getCategories,
  getCategory,
  createCategory,
};
