// Stwórzmy WEB API które wczyta podany plik(asynchronicznie!) i wyśle zawartość do użytkownika końcowego.
//  W katalogu 04/static zostały dodane przykładowe pliki.
// Dodajmy do zdania 4 middleware obsługujący błąd i wyświetlmy swoją stronę z błędem.
// W zadaniu wykorzystajmy system szablonów mustache

const express = require("express");
const app = express();
const fs = require("fs");
var mustacheExpress = require("mustache-express");

// Register '.mustache' extension with The Mustache Express
app.engine("mustache", mustacheExpress());

app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.get("/:fileName", (req, res, next) => {
  const { fileName } = req.params;
  fs.readFile(`./static/${fileName}`, "utf-8", (error, data) => {
    if (error) {
      next(error);
    } else {
      res.send(data);
    }
  });
});

const errorHandler = (err, req, res, next) => {
  if (!err) {
    return next();
  }
  res.render("error", { error: err.message });
};

app.use(errorHandler);

app.listen(4006, () => console.log("start server"));
