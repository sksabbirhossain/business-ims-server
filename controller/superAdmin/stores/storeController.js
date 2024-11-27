const StoreAdmin = require("../../../models/superAdmin/stores/storeSchema");

const createStore = async (req, res) => {
  try {
    //check store exsit
    const storeExsit = await StoreAdmin.find({ email: req.body.email });
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
    const newStore = new StoreAdmin({
      ...req.body,
      picture: null,
      password: hashedPassword,
    });

    //save user in database
    const store = await newStore.save();

    //send the response
    if (store && store._id) {
      res.json({
        store,
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
  createStore,
};
