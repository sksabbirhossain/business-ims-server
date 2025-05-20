// common/index.js
const express = require("express");
const router = express.Router();

router.use("/refresh", require("./routes/refreshTokenRouter"));

module.exports = router;
