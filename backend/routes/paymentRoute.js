const express = require("express");
const router =  express.Router();
const { isAuthenticatedUser } = require("../middlewear/authentication");
const { processPayment,sendStripeApiKey } = require("../controllers/paymentController");


//payment post request 
router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports = router;
