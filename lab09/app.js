const express = require("express");

const app = express();

const logStuff = (req, res, next) => {
  console.log("Request URL:", req.originalUrl);
  console.log("Request Type:", req.method);
  console.log("Log Params:", req.params);
  next();
};

app.use(logStuff);

app.get("/:name?", logStuff, function (req, res) {
  res.send("halo!");
});

// const chatRouter = require("./chat");

// app.use("/", chatRouter, function (req, res) {
//   res.sendStatus(401);
// });

// app.use((error, req, res, next) => {
//   res.sendStatus(400);
//   console.log(error);
// });

app.listen(4000, () => console.log("start server"));
