const mustacheExpress = require("mustache-express");
const express = require("express");

const app = express();

app.engine("mst", mustacheExpress());

app.set("view engine", "mst");
app.set("views", __dirname + "/views");

const countTax = (req, res, next) => {
  let {
    params: { tax, value },
  } = req;

  if (tax && value) {
    tax = Number(tax);
    value = Number(value);
    const amountTax = (value * tax) / 100;
    const amountWithoutTax = value - amountTax;
    req.calculations = { tax, value, amountTax, amountWithoutTax };
  }

  next();
};

app.get("/podatek/:tax?/:value?", countTax, (req, res) => {
  res.render("index", { title: "Kalkulator podatku", ...req.calculations });
});

app.listen(4000, () => {
  console.log("Server start on port 4000\nhttp://localhost:4000");
});
