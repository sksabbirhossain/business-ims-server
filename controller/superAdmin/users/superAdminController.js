const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SuperAdmin = require("../../../models/superAdmin/users/superAdminSchema");

//create a superAdmin
const createSuperAdmin = async (req, res) => {
  try {
    //check user exsit
    const userExsit = await SuperAdmin.find({ email: req.body.email });
    if (userExsit._id) {
      return res.json({
        errors: {
          common: {
            msg: "User already exsit!",
          },
        },
      });
    }

    //make password hash
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    //make user object
    const newUser = new SuperAdmin({
      ...req.body,
      picture: null,
      password: hashedPassword,
    });

    //save user in database
    const user = await newUser.save();

    //send the response
    if (user && user._id) {
      res.json({
        user,
        msg: "User was create successful!",
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

//login a superAdmin
const loginSuperAdmin = async (req, res) => {
  try {
    //find the user
    const findUser = await SuperAdmin.findOne({ email: req.body.email });
    if (!findUser?._id) {
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
      findUser?.password
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

    //create usr object
    const userInfo = { ...findUser._doc };
    delete userInfo.password;

    //create accessToken
    const accessToken = jwt.sign(userInfo, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    // Create refreshToken
    const refreshToken = jwt.sign(userInfo, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    const expiresIn = new Date().getTime() + 3600000; // 1 hour in milliseconds

    res.status(200).json({
      status: 200,
      accessToken,
      refreshToken,
      expiresIn,
      ...userInfo,
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
  createSuperAdmin,
  loginSuperAdmin,
};
