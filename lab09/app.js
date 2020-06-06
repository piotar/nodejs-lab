const express = require("express");
const app = express();

const logMiddleware = (req, res, next) => {
  console.log(req.method, req.url);
  console.log(req.params, req.query);
  next();
};

const authMiddleware = (req, res, next) => {
  if (req.headers.authorization === "alamakota") {
    next();
  } else {
    res.status(401).send("unauthorized user");
  }
};

app.use(logMiddleware);
app.use(authMiddleware);

app.get("/", (req, res) => {
  res.send("hola hola");
});

app.listen(4000);
