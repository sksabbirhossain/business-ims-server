const express = require("express");
const { checkUser } = require("../controllers/refreshTokenController");

 

const router = express.Router();

//refresh token
router.post("/me", checkUser);

module.exports = router;
