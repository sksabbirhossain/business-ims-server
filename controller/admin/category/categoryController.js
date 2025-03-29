const Category = require("../../../models/storeAdmin/categorySchema");

//get all category
const getCategories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default page is 1
    const limit = parseInt(req.query.limit) || 10; // Default limit is 10
    const skip = (page - 1) * limit; // Calculate offset

    // Get total count
    const totalCategories = await Category.countDocuments({
      storeInfo: req.store.storeId,
    });

    //get category from database
    const category = await Category.find({ storeInfo: req.store.storeId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    //send the response
    if (category && category.length >= 0) {
      res.json({
        data: category,
        total: totalCategories,
        currentPage: page,
        totalPages: Math.ceil(totalCategories / limit),
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

//update a category by id
const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params || {};

    //get category from database
    const category = await Category.findOne({
      _id: categoryId,
      storeInfo: req.store.storeId,
    });

    // if category not found
    if (!category?._id) {
      return res.json({
        errors: {
          common: {
            msg: "Category was not found!",
          },
        },
      });
    }

    const updateData = req.body;

    // If an image is uploaded, add its path to updateData
    if (req.file) {
      updateData.picture = req.file.path;
    }

    const updatedCategory = await Category.findOneAndUpdate(
      {
        _id: categoryId,
        storeInfo: req.store.storeId,
      },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    //send the response
    if (updatedCategory?._id) {
      res.json({
        data: updatedCategory,
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

//delete a category by category id
const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params || {};

    const deletedCategory = await Category.findByIdAndDelete({
      _id: categoryId,
      storeInfo: req.store.storeId,
    });

    //send the response
    if (deletedCategory) {
      res.status(200).json({
        status: 200,
        msg: "Category deleted successful!",
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
  getCategories,
  getCategory,
  updateCategory,
  createCategory,
  deleteCategory,
};
