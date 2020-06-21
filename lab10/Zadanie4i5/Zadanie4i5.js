// Stwórzmy WEB API które wczyta podany plik(asynchronicznie!) i wyśle zawartość do użytkownika końcowego.
//  W katalogu 04/static zostały dodane przykładowe pliki.

const express = require("express");
const app = express();
const fs = require("fs");

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

app.use((error, req, res, next) => {
  console.log(error.message);
  throw error;
});

app.listen(4006, () => console.log("start server"));
