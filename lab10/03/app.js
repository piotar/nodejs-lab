const express = require("express");
const app = express();

app.get("/:a/:b", function (req, res) {
  let { a, b } = req.params;

  a = parseInt(a);
  b = parseInt(b);

  const result = divide(a, b);
  res.send(result.toString());
});

app.use((error, req, res, next) => {
  console.log(error.message);
  res.status(400).send(error.message);
});

const divide = (a, b) => {
  if (b === 0) {
    throw new Error("Divide by 0!");
  }
  return a / b;
};

app.listen(4000, () => console.log("start server"));
