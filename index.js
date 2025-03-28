// external imports
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// internal imports
require("./jobs/index");
const refreshTokenRouter = require("./routes/common/refreshTokenRouter");
const superAdminRouter = require("./routes/superAdmin/users/superAdminRouter");
const {
  notFoundHandler,
  errorHandler,
} = require("./middleware/common/errorHandler");
const storeRouter = require("./routes/superAdmin/stores/storeRouter");
const storeAdminRouter = require("./routes/admin/store/storeAdminRouter");
const categoryRouter = require("./routes/admin/category/categoryRouter");
const supplierRouter = require("./routes/admin/supplier/supplierRouter");
const purchaseRouter = require("./routes/admin/purchase/purchaseRouter");
const stockRouter = require("./routes/admin/stock/stockRouter");
const salesRouter = require("./routes/admin/sales/salesRouter");
const returnSaleRouter = require("./routes/admin/returnSale/returnSaleRouter");
const financialRouter = require("./routes/admin/financial/financialRouter");
const dashboardRouter = require("./routes/admin/dashboard/dashboardRouter");

//initialize app
const app = express();

//initialize port
const PORT = process.env.PORT || 5000;

// database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("database connection successful"))
  .catch(() =>
    console.log("something went wrong! database connection failed!")
  );

// common middleware
// ✅ Allow your frontend URL
app.use(
  cors({
    origin: ["https://business-ims.vercel.app", "http://localhost:3000"],
    methods: "GET, POST, PUT, PATCH, DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes

const { redisConnection } = require("./configs/queue");

const redis = redisConnection;

// redis testing route
app.get("/test-redis", async (req, res) => {
  try {
    await redis.set("test-key", "Hello from Redis!");
    const value = await redis.get("test-key");
    res.json({ success: true, value });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Redis not working", details: error.message });
  }
});

//common routes
app.use("/api/refresh", refreshTokenRouter);

// superAdmin routes
app.use("/api/superadmin", superAdminRouter);
app.use("/api/superadmin", storeRouter);

//store admin routes
app.use("/api/admin", storeAdminRouter);

//financial routes
app.use("/api/admin/financial", financialRouter);

// category routes
app.use("/api/admin", categoryRouter);

// supplier routes
app.use("/api/admin", supplierRouter);

//purchase routes
app.use("/api/admin/purchase", purchaseRouter);

//stock routes
app.use("/api/admin/stock", stockRouter);

//sales routes
app.use("/api/admin/sale", salesRouter);

//return sale routes
app.use("/api/admin/return-sale", returnSaleRouter);

//dashboard routes
app.use("/api/admin/dashboard", dashboardRouter);

//404 not found error handler
app.use(notFoundHandler);

//common error handler
app.use(errorHandler);

//listening server
app.listen(PORT, () => console.log(`Listening port ${PORT}`));
