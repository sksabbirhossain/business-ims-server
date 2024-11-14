const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

// common middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("database connection successful"))
  .catch(() =>
    console.log("something went wrong! database connection failed!")
  );

// routes

// error handler

//listening server
app.listen(PORT, () => console.log(`Listening port ${PORT}`));
