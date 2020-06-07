const express = require("express");
const app = express();

const customMiddleware = (req, res, next) => {
  console.log(req.url);
  console.log(req.method);
  next();
};

app.use(customMiddleware);

app.get("/:name?", customMiddleware, (req, res) => {
  res.send("halo");
});

app.listen(4000, () => console.log("start server"));
