const express = require("express");
const app = express();

const calculateTax = (tax, amount) => {
  const taxValue = (amount / 100) * tax;
  return {
    tax: taxValue,
    amount: amount - taxValue,
  };
};

const mustacheExpress = require("mustache-express");

app.engine("mustache", mustacheExpress());

app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.get("/podatek/:tax/:amount", function (req, res) {
  const { tax, amount } = req.params;
  res.render("secondTask", {
    tax: tax,
    amount: amount,
    result: calculateTax(tax, amount),
  });
});

app.listen(4000, () => console.log("start server"));
