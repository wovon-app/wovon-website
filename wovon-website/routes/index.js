const express = require("express");
const router = express.Router();
const path = require('path');

const { auth, requiresAuth } = require('express-openid-connect');
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: `${process.env.AUTH0_SECRET}`,
    baseURL: 'https://wovon.me',
    clientID: 'sib80y7mk79Lh3D27fBiOthg15lSTtR3',
    issuerBaseURL: 'https://dev-k6xh810ejrk8x0ze.us.auth0.com'
};

const PaymentController = require("../controllers/PaymentController");
const PaymentService = require("../services/PaymentService");

const PaymentInstance = new PaymentController(new PaymentService());

router.use(auth(config));

router.get("/", function (req, res, next) {
    return res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.get("/profile", requiresAuth(), function (req, res, next) {
    return res.sendFile(path.join(__dirname, '../public', 'profile.html'));
});

router.get("/payment/make/basic", requiresAuth(), async function (req, res, next) {
    const link = await PaymentInstance.getPaymentLink(req, res, 10, "Wovon API - Plan Básico", req.query.email, req.query.apiToken, 10, req.query.randomKey);
    res.redirect(link);
});

router.get("/payment/make/pro", requiresAuth(), async function (req, res, next) {
    const link = await PaymentInstance.getPaymentLink(req, res, 35, "Wovon API - Plan Pro", req.query.email, req.query.apiToken, 50, req.query.randomKey);
    res.redirect(link);
});

router.get("/payment/make/platinium", requiresAuth(), async function (req, res, next) {
    const link = await PaymentInstance.getPaymentLink(req, res, 200, "Wovon API - Plan Platinium", req.query.email, req.query.apiToken, 300, req.query.randomKey);
    res.redirect(link);
});

router.get("/payment/success", requiresAuth(), function (req, res, next) {
    return res.sendFile(path.join(__dirname, '../public', 'success.html'));
});

router.get("/payment/failure", requiresAuth(), function (req, res, next) {
    return res.sendFile(path.join(__dirname, '../public', 'failure.html'));
});

router.get("/internal/user_data", requiresAuth(), function (req, res, next) {
    return res.json({
        'email': req.oidc.user.email,
        'api_token': req.oidc.user.api_token
    });
});

router.get("/internal/wovon_token", requiresAuth(), function (req, res, next) {
    return res.json({
        'token': process.env.WOVON_ACCESS_TOKEN
    });
});


router.get("/apidocs", function (req, res, next) {
    res.redirect("https://documenter.getpostman.com/view/23641864/2s8YzL5Rvd");
});

router.get("/androidapp", function (req, res, next) {
    res.download(path.join(__dirname, '../public', 'download', 'wovon-app.apk'));
});

module.exports = router;
