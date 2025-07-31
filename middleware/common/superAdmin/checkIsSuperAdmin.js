/*
 * Business-IMS Server — Inventory Management System API
 * Copyright (c) 2025 Sk Sabbir Hossain
 * Licensed under a custom license. Unauthorized use, reproduction, or distribution is strictly prohibited.
 * Official Repository: https://github.com/sksabbirhossain/business-ims-server
 */
const jwt = require("jsonwebtoken");

const checkIsSuperAdmin = (req, res, next) => {
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
    const { _id, name, email, role, picture, verifiedUser } = decoded;

    if (role === "superadmin") {
      req.user = {
        user: _id,
        name,
        email,
        role,
        picture,
        verifiedUser,
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
          msg: "Authentication Failure!!!",
        },
      },
      status: 401,
    });
  }
};

module.exports = checkIsSuperAdmin;
