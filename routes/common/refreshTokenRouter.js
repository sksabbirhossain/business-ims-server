const express = require("express");

// import controllers
const { checkUser } = require("../../controller/common/refreshTokenController");

const router = express.Router();

//refresh token
router.post("/me", checkUser);

module.exports = router;
