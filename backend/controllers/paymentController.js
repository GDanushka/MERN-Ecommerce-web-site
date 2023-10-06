//const config = require( "../config/config" );
const catchAsyncError = require( "../middleware/catchAsyncError" );

const stripe = require("stripe")("sk_test_51NmCIRFvXPA2bYgdMi2AegPgJgzBPk6P89ZmAfe1FbYYAvXpdliUBwEi3a0irolWfzP4Bp2Yh4ovrIsY1ufZBJxu00TQ3Ge3M1");

exports.processPayment = catchAsyncError(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: "pk_test_51NmCIRFvXPA2bYgdqv3lRWmULP5vyK5YSsqB7Xlz9jKpkjccl0v3dyDJYDLa1SSZgaoeuExmGfXSJGtzDptuX2kJ00aMeXbAmR" });
});
