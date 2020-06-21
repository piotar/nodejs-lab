// Przećwiczmy wczytywanie szablonów zmieniając system szablonów PUG na MUSTACHE
// (https://github.com/bryanburgers/node-mustache-express). Stwórzmy aplikację,
// która wyliczy nam podatek z podanej kwoty i zwróci nam widok z danymi.

const express = require("express");
const app = express();

var mustacheExpress = require("mustache-express");

// Register '.mustache' extension with The Mustache Express
app.engine("mustache", mustacheExpress());

app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

const calculateTax = (tax, amount) => {
  const resultTax = (tax * amount) / 100;
  return { tax: resultTax, amount: amount - resultTax };
};

app.get("/podatek/:tax/:amount/", function (req, res) {
  const result = calculateTax(req.params.tax, req.params.amount);
  const cena = req.params.amount;
  const podatek = req.params.tax;
  const naliczony_podatek = result.tax;
  const kwota_bez_podatku = result.amount;

  const scope = { cena, podatek, naliczony_podatek, kwota_bez_podatku };
  res.render("template", scope);
});

app.listen(4001, () => console.log("start server"));
