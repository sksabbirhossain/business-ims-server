//create category
const createCustomer = async (req, res) => {
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
  createCustomer,
};
