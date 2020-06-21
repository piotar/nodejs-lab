// Stwórzmy naszą pierwszą aplikację serwerową wykorzystującą system szablonów PUG.
//  ścieżki takie jak:
// '/' - wyświetli przywitanie 'hello world!' jako nagłówek ('h1')
// '/Jan' - wyświetli przywitanie 'hello Jan!' jako nagłówek ('h1')
// '/Adam' - wyświetli przywitanie 'hello Adam!' jako nagłówek ('h1')

const express = require("express");
const app = express();

app.set("view engine", "pug");

app.get("/:name?", function (req, res) {
  const scope = { title: `hello ${req.params.name || "world"}!`, header: "h1" };
  res.render("index", scope);
});

app.listen(4001, () => console.log("start server"));
