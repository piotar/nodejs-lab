const express = require("express");
const app = express();

const customMiddleware = (req, res, next) => {
  console.log(req.url);
  console.log(req.method);
  console.log(req.params);
  next();
};

app.use(customMiddleware);

app.get("/", (req, res) => {
  res.send("hola hola");
});

app.listen(4000, () => console.log("start server"));
