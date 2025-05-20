/*
 * Business-IMS Server — Inventory Management System API
 * Copyright (c) 2025 Sk Sabbir Hossain
 * Licensed under a custom license. Unauthorized use, reproduction, or distribution is strictly prohibited.
 * Official Repository: https://github.com/sksabbirhossain/business-ims-server
 */
const express = require("express");
const router = express.Router();

router.use("/store", require("./routes/store/storeAdminRouter"));
router.use("/category", require("./routes/category/categoryRouter"));
router.use("/supplier", require("./routes/supplier/supplierRouter"));
router.use("/purchase", require("./routes/purchase/purchaseRouter"));
router.use("/stock", require("./routes/stock/stockRouter"));
router.use("/sale", require("./routes/sales/salesRouter"));
router.use("/return-sale", require("./routes/returnSale/returnSaleRouter"));
router.use("/dashboard", require("./routes/dashboard/dashboardRouter"));
router.use("/customer", require("./routes/customer/customerRouter"));
router.use("/bank", require("./routes/bank/bankRouter"));
router.use("/employee", require("./routes/employee/employeeRouter"));
router.use("/finance", require("./routes/financial/financialRouter"));
router.use(
  "/subscription",
  require("./routes/subscription/subscriptionRouter")
);

module.exports = router;
