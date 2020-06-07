const express = require("express");

const app = express();

// const logOriginalUrl = (req, res, next) => {
//   console.log("Request URL:", req.originalUrl);
//   next();
// };

// const logMethod = (req, res, next) => {
//   console.log("Request Type:", req.method);
//   next();
// };

// const logParams = (req, res, next) => {
//   console.log("Log Params:", req.params);
//   next();
// };

// let logStuff = [logOriginalUrl, logMethod, logParams, logHeaders, logBody];

const chatRouter = require("./chat");

app.use("/", chatRouter);

app.use((error, req, res, next) => {
  res.sendStatus(400);
  console.log(error);
});

app.listen(4000, () => console.log("start server"));
