const express = require("express");
const app = express();

const customMiddleware = (req, res, next) => {
  console.log(req.method, req.url, req.params, req.query);
  next();
};

app.use(customMiddleware);

app.get("/:name?", (req, res) => {
  res.send("halo");
});

app.listen(4000, () => console.log("start server"));
