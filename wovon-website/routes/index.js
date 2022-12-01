const express = require("express");
const router = express.Router();
const path = require('path');

const PaymentController = require("../controllers/PaymentController");
const PaymentService = require("../services/PaymentService");

const PaymentInstance = new PaymentController(new PaymentService());

let isLoggedIn = false;

router.get("/", function (req, res, next) {
    return res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.post("/loggedin", function (req, res, next) {
    isLoggedIn = true;
    res.redirect(req.baseUrl + "/profile");
});

router.get("/loggedout", function (req, res, next) {
    isLoggedIn = false;
    res.redirect(req.baseUrl + "/");
});

router.get("/profile", function (req, res, next) {
    if (isLoggedIn) {
        return res.sendFile(path.join(__dirname, '../public', 'profile.html'));
    } else {
        res.redirect(req.baseUrl + "/login");
    }
});

router.get("/payment/make/basic", async function (req, res, next) {
    if (isLoggedIn) {
        const link = await PaymentInstance.getPaymentLink(req, res, 10, "Wovon API - Plan Básico", req.query.email, req.query.userId, 10, req.query.randomKey);
        res.redirect(link);
    } else {
        res.status(401);
        res.send('ERROR 401. Unauthorized');
    }
});

router.get("/payment/make/pro", async function (req, res, next) {
    if (isLoggedIn) {
        const link = await PaymentInstance.getPaymentLink(req, res, 35, "Wovon API - Plan Pro", req.query.email, req.query.userId, 50, req.query.randomKey);
        res.redirect(link);
    } else {
        res.status(401);
        res.send('ERROR 401. Unauthorized');
    }
});

router.get("/payment/make/platinium", async function (req, res, next) {
    if (isLoggedIn) {
        const link = await PaymentInstance.getPaymentLink(req, res, 200, "Wovon API - Plan Platinium", req.query.email, req.query.userId, 300, req.query.randomKey);
        res.redirect(link);
    } else {
        res.status(401);
        res.send('ERROR 401. Unauthorized');
    }
});

router.get("/payment/success", function (req, res, next) {
    if (isLoggedIn) {
        return res.sendFile(path.join(__dirname, '../public', 'success.html'));
    } else {
        res.status(401);
        res.send('ERROR 401. Unauthorized');
    }
});

router.get("/payment/failure", function (req, res, next) {
    if (isLoggedIn) {
        return res.sendFile(path.join(__dirname, '../public', 'failure.html'));
    } else {
        res.status(401);
        res.send('ERROR 401. Unauthorized');
    }
});

module.exports = router;
