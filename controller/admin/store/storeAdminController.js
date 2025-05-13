const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Store = require("../../../models/superAdmin/stores/storeSchema");

const logInStore = async (req, res) => {
  try {
    //find the user
    const findStore = await Store.findOne({ email: req.body.email })
      .select("+password")
      .lean();
    if (!findStore?._id) {
      return res.json({
        errors: {
          common: {
            msg: "Invalid credential!",
          },
        },
      });
    }

    //compare password
    const validPassword = await bcrypt.compare(
      req.body.password,
      findStore?.password
    );

    if (!validPassword) {
      return res.json({
        errors: {
          common: {
            msg: "Invalid credential!",
          },
        },
      });
    }

    //create store object
    const storeInfo = findStore;
    delete storeInfo.password;

    //create accessToken
    const accessToken = jwt.sign(storeInfo, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    // Create refreshToken
    const refreshToken = jwt.sign(storeInfo, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    const expiresIn = new Date().getTime() + 3600000; // 1 hour in milliseconds

    res.status(200).json({
      status: 200,
      accessToken,
      refreshToken,
      expiresIn,
      ...storeInfo,
      msg: "Super admin login successful!",
    });
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
  logInStore,
};
