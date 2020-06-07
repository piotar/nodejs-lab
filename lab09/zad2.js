const express = require("express");
const app = express();

const authorizationMiddleware = (req, res, next) => {
  const {
    headers: { authorization },
  } = req;
  if (authorization != "alamakota") {
    res.sendStatus(401);
  } else {
    next();
  }
};

app.use(authorizationMiddleware);

app.get("/", (req, res) => {
  res.send("Hallo!!");
});

app.listen(4000, () => console.log("start server"));
