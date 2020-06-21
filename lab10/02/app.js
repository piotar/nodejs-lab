var mustacheExpress = require("mustache-express");
const express = require("express");
const app = express();

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

const taxCalc = (tax, amount) => {
  const calcTax = (tax / 100) * amount;
  return amount - calcTax;
};

app.get("/podatek/:tax?/:amount?", function (req, res) {
  const { tax, amount } = req.params;

  const result = taxCalc(tax, amount);

  res.render("index", { tax, amount, result });
});

app.listen(4000, () => console.log("start server"));
