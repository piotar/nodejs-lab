const express = require("express");
const app = express();

const customMiddleware = (req, res, next) => {
  const { originalUrl, method, params } = req;
  console.log(originalUrl, method, params);
  next();
};

app.use(customMiddleware);

app.get("/:name?", customMiddleware, (req, res) => {
  res.send("");
});

app.listen(4000, () => console.log("start server"));
