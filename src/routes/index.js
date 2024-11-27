const express = require("express");
const AuthenticationRouter = require("./AuthenticationRouter");
const UserRouter = require("./UserRouter");
const CvRouter = require("./CvRouter");
const AvisRouter = require("./AvisRouter");

const app = express();

app.use("/auth", AuthenticationRouter);
app.use("/user", UserRouter);
app.use("/cv", CvRouter);
app.use("/Avis", AvisRouter);

module.exports = app;