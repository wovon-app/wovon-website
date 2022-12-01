const express = require("express");
const router = express.Router();
const path = require('path');



const PaymentController = require("../controllers/PaymentController");
const PaymentService = require("../services/PaymentService");

const PaymentInstance = new PaymentController(new PaymentService());

router.get("/", function (req, res, next) {
    return res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.post("/loggedin", function (req, res, next) {
    res.redirect(req.baseUrl + "/profile");
});

router.get("/profile", function (req, res, next) {
    return res.sendFile(path.join(__dirname, '../public', 'profile.html'));
});

router.get("/payment/make/basic", async function (req, res, next) {
    const link = await PaymentInstance.getPaymentLink(req, res, 10, "Wovon API - Plan Básico", req.query.email, req.query.userId, 10, req.query.randomKey);
    res.redirect(link);
});

router.get("/payment/make/pro", async function (req, res, next) {
    const link = await PaymentInstance.getPaymentLink(req, res, 35, "Wovon API - Plan Pro", req.query.email, req.query.userId, 50, req.query.randomKey);
    res.redirect(link);
});

router.get("/payment/make/platinium", async function (req, res, next) {
    const link = await PaymentInstance.getPaymentLink(req, res, 200, "Wovon API - Plan Platinium", req.query.email, req.query.userId, 300, req.query.randomKey);
    res.redirect(link);
});

router.get("/payment/success", function (req, res, next) {
    console.log(__dirname)
    return res.sendFile(path.join(__dirname, '../public', 'success.html'));
});

router.get("/payment/failure", function (req, res, next) {
    return res.sendFile(path.join(__dirname, '../public', 'failure.html'));
});

module.exports = router;
