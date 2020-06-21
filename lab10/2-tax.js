// 2 - Przećwiczmy wczytywanie szablonów zmieniając system szablonów PUG na
// MUSTACHE(https://github.com/bryanburgers/node-mustache-express).
// Stwórzmy aplikację, która wyliczy nam podatek z podanej kwoty i zwróci nam widok z danymi.
// Przykład ścieżki /podatek/19/25, gdzie 19 to wysokość vat podana w procentach oraz 25 kwota.

const express = require("express");
const mustacheExpress = require("mustache-express");
const app = express();


const calc = (a, b) => {
    return a *(b * 0.1);
}
// app.set('view engine', 'pug')
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");

app.get("/podatek/:tax/:price", function (req, res) {
  const {price, amount} = req.params;

  const result = calc(price, amount);

  res.render("index", {price, amount, result });
});

app.listen(4000, () => console.log("start server"));
