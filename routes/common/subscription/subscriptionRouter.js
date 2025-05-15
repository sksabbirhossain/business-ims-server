const express = require("express");
const checkIsAdmin = require("../../../middleware/common/admin/checkIsAdmin");
const {
  stripePayment,
} = require("../../../controller/common/subscription/subscriptionController");

const router = express.Router();

//create stripe payment route
router.post("/stripe-payment", checkIsAdmin, stripePayment);

module.exports = router;
