const express = require("express");
const app = express();

var mustacheExpress = require("mustache-express");

app.engine("mustache", mustacheExpress());

app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

const calculateTax = (tax, amount) => {
  const resoult = (tax * amount) / 100;
  return { tax: resoult, amount: amount - resoult };
};

app.get("/podatek/:tax/:amount", function (req, res) {
  const { tax, amount } = req.params;

  res.render("index", {
    tax,
    amount,
    resoult: calculateTax(tax, amount),
  });
});

app.listen(4400, () => console.log("start server"));
