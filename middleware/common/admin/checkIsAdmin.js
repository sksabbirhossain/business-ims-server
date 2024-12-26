const jwt = require("jsonwebtoken");

const checkIsAdmin = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: {
        common: {
          msg: "Authentication Failure",
        },
      },
      status: 401,
    });
  }

  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { storeName, ownerName, phone, email, _id, role } = decoded;

    if (role === "storeAdmin") {
      req.store = {
        storeName,
        ownerName,
        phone,
        email,
        storeId: _id,
        role,
      };
      next();
    } else {
      return res.status(401).json({
        errors: {
          common: {
            msg: "Authentication Failure!!",
          },
        },
        status: 401,
      });
    }
  } catch (err) {
    return res.status(401).json({
      errors: {
        common: {
          msg: "Authentication Failure!!",
        },
      },
      status: 401,
    });
  }
};

module.exports = checkIsAdmin;
