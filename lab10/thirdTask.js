const express = require("express");
const app = express();

const isInfinity = (req, res, next) => {
  const { b } = req.params;
  if (+b === 0) {
    next(new Error("Divide by 0"));
  } else {
    next();
  }
};

app.get("/:a/:b", isInfinity, (req, res) => {
  const { a, b } = req.params;
  let result = a / b;
  res.send(result.toString());
});

app.use((error, req, res, next) => {
  res.send(error.message);
  console.log(error.message);
});

app.listen(4000, () => console.log("start server"));
