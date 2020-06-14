// 5. Stwórzmy middleware, który sprawdzi czy podana ścieżka jest ścieżką do pliku fizycznego na dysku.
// Jeżeli tak to powinniśmy ten plik wysłać do klienta.
// Jeżeli jednak nie możemy odnaleźć, powinniśmy przesłać dalej wykonywanie naszego żądania
// (tutaj może być pomocny moduł fs).

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");

const filteredStrings = ["disco polo", "piwo", "hazard", "cukierki"];

const fileNameMiddleware = (req, res, next) => {
  const fileName = req.params.fileName;

  fs.exists(fileName, (exists) => {
    console.log(exists);
    if (exists) {
      next();
    } else {
      res.status(404).send("File not exists");
    }
  });
};

app.use(bodyParser.text());

app.post("/:fileName", (req, res) => {
  const fileName = req.params.fileName;

  if (filteredStrings.some((word) => req.body.includes(word))) {
    res.status(400).send("Client send forbidden words!");
    return;
  }

  fs.writeFile(fileName, req.body, (err) => {
    if (err) {
      res.status(404).send(err.message);
    } else {
      res.status(201).send("File saved!");
    }
  });
});

app.get("/:fileName", fileNameMiddleware, (req, res) => {
  const fileName = req.params.fileName;

  fs.readFile(fileName, (err, data) => {
    if (err) {
      res.status(400).send(err.message);
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(4000, () => console.log("start server"));
