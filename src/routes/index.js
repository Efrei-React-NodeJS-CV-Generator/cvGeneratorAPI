const express = require("express");
const AuthenticationRouter = require("./AuthenticationRouter.js");
const UserRouter = require("./UserRouter");

const app = express();

app.use("/auth", AuthenticationRouter);
app.use("/user", UserRouter);

module.exports = app;
