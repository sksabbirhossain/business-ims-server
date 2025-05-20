/*
 * Business-IMS Server — Inventory Management System API
 * Copyright (c) 2025 Sk Sabbir Hossain
 * Licensed under a custom license. Unauthorized use, reproduction, or distribution is strictly prohibited.
 * Official Repository: https://github.com/sksabbirhossain/business-ims-server
 */
const createError = require("http-errors");

//404 not found handler
const notFoundHandler = (req, res, next) => {
  next(createError(404, "Your requested content was not found!"));
};

//default error handler
const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    status: err.status || 500,
  });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
