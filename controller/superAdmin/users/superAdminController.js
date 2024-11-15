const bcrypt = require("bcrypt");
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
  } catch (err) {
    res.json({
      errors: {
        common: err.message,
      },
    });
  }
};

module.exports = {
  createSuperAdmin,
  loginSuperAdmin,
};
