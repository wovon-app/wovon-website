const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");

const indexRouter = require("./routes/index");

const app = express();

const { auth } = require('express-openid-connect');
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: `${process.env.AUTH0_SECRET}`,
    baseURL: 'http://localhost:3000',
    clientID: 'sib80y7mk79Lh3D27fBiOthg15lSTtR3',
    issuerBaseURL: 'https://dev-k6xh810ejrk8x0ze.us.auth0.com',
    routes: {
        callback: '/loggedin'
    },
};

dotenv.config();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use(auth(config));
app.use("/public", express.static(path.join(__dirname, "/public")));

module.exports = app;