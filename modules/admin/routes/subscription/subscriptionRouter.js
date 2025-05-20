const express = require("express");
const checkIsSubscribed = require("../../../../middleware/common/admin/checkIsSubscribed");
const checkIsAdmin = require("../../../../middleware/common/admin/checkIsAdmin");
const { getSubscriptions, stripePayment } = require("../../controllers/subscription/subscriptionController");
 

const router = express.Router();

//get subscription with pagination
router.get(
  "/subscription-list",
  checkIsAdmin,
  checkIsSubscribed,
  getSubscriptions
);

//create stripe payment route
router.post("/stripe-payment", checkIsAdmin, stripePayment);

module.exports = router;
