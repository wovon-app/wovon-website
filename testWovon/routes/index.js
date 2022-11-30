const express = require("express");
const router = express.Router();
const path = require('path');

const PaymentController = require("../controllers/PaymentController");
const PaymentService = require("../services/PaymentService");

const PaymentInstance = new PaymentController(new PaymentService());

router.get("/", function (req, res, next) {
  return res.json({
    "/payment": "generates a payment link",
    "/subscription": "generates a subscription link"
  });
});

router.get("/home", function (req, res, next) {
  return res.sendFile(path.join(__dirname, '../public', 'home.html'));
})

router.get("/comun", async function (req, res, next) {
  const link = await PaymentInstance.getPaymentLink(req, res, 50, "Pago comun");
  res.redirect(link);
});

router.get("/medio", async function (req, res, next) {
  const link = await PaymentInstance.getPaymentLink(req, res, 100, "Pago medio");
  res.redirect(link);
});

router.get("/alto", async function (req, res, next) {
  const link = await PaymentInstance.getPaymentLink(req, res, 150, "pago alto");
  res.redirect(link);
});

router.get("/subscription", function (req, res, next) {
  PaymentInstance.getSubscriptionLink(req, res);
});

module.exports = router;
