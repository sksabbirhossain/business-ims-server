// external imports
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// internal imports
const superAdminRouter = require("./routes/superAdmin/users/superAdminRouter");
const {
  notFoundHandler,
  errorHandler,
} = require("./middleware/common/errorHandler");

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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
// superAdmin routes
app.use("/api/superadmin", superAdminRouter);

//404 not found error handler
app.use(notFoundHandler);

//common error handler
app.use(errorHandler);

//listening server
app.listen(PORT, () => console.log(`Listening port ${PORT}`));
