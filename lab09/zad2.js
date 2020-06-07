const express = require("express");
const app = express();

const customMiddleware = (req, res, next) => {
  console.log(req.url);
  console.log(req.params);
  console.log(req.query);
  console.log(req.method);

  if (req.headers.authorization === "alamakota") {
    next();
  } else {
    res.sendStatus(401);
  }
};

app.use(customMiddleware);

app.get("/:name?", customMiddleware, (req, res) => {
  res.send("halo");
});

app.listen(4000, () => console.log("start server"));
