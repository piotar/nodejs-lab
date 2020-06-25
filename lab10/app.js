// Zadanie 1
// Stwórzmy nasz pierwszą aplikację serwerową wykorzystującą system szablonów PUG. Obsłużmy ścieżki takie jak:
// '/' - wyświetli przywitanie 'hello world!' jako nagłówek ('h1')
// '/Jan' - wyświetli przywitanie 'hello Jan!' jako nagłówek ('h1')
// '/Adam' - wyświetli przywitanie 'hello Adam!' jako nagłówek ('h1')
// ...

const express = require("express");
const app = express();

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", { message: "Hello World!" });
});

app.get("/:name?", (req, res) => {
  const { name = "world" } = req.params;
  res.render("index", { message: `Hello ${name}!` });
});

app.listen(4700, () => console.log("Server listen at port: 4700"));

// Zadanie 2
// Przećwiczmy wczytywanie szablonów zmieniając system szablonów PUG na MUSTACHE
// (https://github.com/bryanburgers/node-mustache-express). Stwórzmy aplikację, która wyliczy nam podatek z
// podanej kwoty i zwróci nam widok z danymi.
// Przykład ścieżki /podatek/19/25, gdzie 19 to wysokość vat podana w procentach oraz 25 kwota.
