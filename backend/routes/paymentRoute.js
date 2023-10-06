// const express=require("express");
// const { checkout, paymentVerification, getKey } = require("../controllers/paymentController");

//  const router=express.Router();

//  router.route("/checkout").post(checkout);
//  router.route("/getkey").get(getKey);
//  router.route("/paymentverification").post(paymentVerification);
//  module.exports = router
const express = require( "express" );
const { processPayment, sendStripeApiKey } = require( "../controllers/paymentController" );
const router = express.Router();
const {isAuthenticatedUser}  = require( "../middleware/auth" );

router.route( "/payment/process" ).post( isAuthenticatedUser, processPayment );
router.route( "/stripeapikey" ).get( isAuthenticatedUser, sendStripeApiKey );
module.exports = router;
