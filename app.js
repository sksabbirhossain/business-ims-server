/*
 * Business-IMS Server — Inventory Management System API
 * Copyright (c) 2025 Sk Sabbir Hossain
 * Licensed under a custom license. Unauthorized use, reproduction, or distribution is strictly prohibited.
 * Official Repository: https://github.com/sksabbirhossain/business-ims-server
 */

const express = require("express");
const cors = require("cors");
const {
  notFoundHandler,
  errorHandler,
} = require("./middleware/common/errorHandler");

// Import modular routes
const adminRoutes = require("./modules/admin");
const superAdminRoutes = require("./modules/superAdmin");
const commonRoutes = require("./modules/common");

const app = express();

// CORS
app.use(
  cors({
    origin: ["https://business-ims.vercel.app", "http://localhost:3000"],
    methods: "GET, POST, PUT, PATCH, DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route groups
app.use("/api/admin", adminRoutes);
app.use("/api/superadmin", superAdminRoutes);
app.use("/api", commonRoutes);

// 404 + global error
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
