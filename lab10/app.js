// Zadanie 1
// Stwórzmy nasz pierwszą aplikację serwerową wykorzystującą system szablonów PUG. Obsłużmy ścieżki takie jak:
// '/' - wyświetli przywitanie 'hello world!' jako nagłówek ('h1')
// '/Jan' - wyświetli przywitanie 'hello Jan!' jako nagłówek ('h1')
// '/Adam' - wyświetli przywitanie 'hello Adam!' jako nagłówek ('h1')
// ...

const express = require("express");
const app = express();

// app.set("views", "./views");
// app.set("view engine", "pug");

// app.get("/", (req, res) => {
//   res.render("index", { message: "Hello World!" });
// });

// app.get("/:name?", (req, res) => {
//   const { name = "world" } = req.params;
//   res.render("index", { message: `Hello ${name}!` });
// });

// Zadanie 2
// Przećwiczmy wczytywanie szablonów zmieniając system szablonów PUG na MUSTACHE
// (https://github.com/bryanburgers/node-mustache-express). Stwórzmy aplikację, która wyliczy nam podatek z
// podanej kwoty i zwróci nam widok z danymi.
// Przykład ścieżki /podatek/19/25, gdzie 19 to wysokość vat podana w procentach oraz 25 kwota.

// var mustacheExpress = require("mustache-express");
// app.engine("mustache", mustacheExpress());

// app.set("view engine", "mustache");
// app.set("views", __dirname + "/views");

// const calculateTax = (tax, amount) => {
//   const resultTax = (tax * amount) / 100;
//   return { tax: resultTax, amount: amount - resultTax };
// };

// app.get("/podatek/:tax/:amount/", function (req, res) {
//   const result = calculateTax(req.params.tax, req.params.amount);
//   const cena = req.params.amount;
//   const podatek = req.params.tax;
//   const obliczony_podatek = result.tax;
//   const kwota_bez_podatku = result.amount;

//   const scope = { cena, podatek, obliczony_podatek, kwota_bez_podatku };
//   res.render("index", scope);
// });

// Zadanie 3
// Stwórzmy aplikację, która będzie dzieliła dwie liczby. W przypadku dzielenia przez 0, aplikacja ma rzucić wyjątkiem.
// Dodajmy do naszej aplikacji middleware, który wyświetli w konsoli informacje o wystąpieniu błędu.

const calculate = (firstNumber, secondNumber) => {
  if (secondNumber == 0) {
    throw new Error("Dzielenie przez 0!");
  }
  const result = firstNumber / secondNumber;
  console.log(firstNumber, secondNumber);
  return result;
};

app.get("/:firstNumber/:secondNumber", (req, res) => {
  res.send(`${calculate(req.params.firstNumber, req.params.secondNumber)}`);
});

app.use((error, req, res, next) => {
  console.log(error.message);
  res.send(error.message);
});

app.listen(4700, () => {
  console.log("Server listen at port: 4700");
});
