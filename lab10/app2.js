const express = require("express");
const app = express();

const mustacheExpress = require("mustache-express");

app.engine("mustache", mustacheExpress());

app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

const calculateTax = (tax, amount) => {
  const result = (tax * amount) / 100;
  return { tax: result, amount: amount - result };
};

app.get("/podatek/:tax/:amount", function (req, res) {
  const { tax, amount } = req.params;
  res.render("index", {
    tax,
    amount,
    result: calculateTax(tax, amount),
  });
});

app.listen(4000, () => console.log("start server"));
