// 5. Stwórzmy middleware, który sprawdzi czy podana ścieżka jest ścieżką do pliku fizycznego na dysku.
// Jeżeli tak to powinniśmy ten plik wysłać do klienta.
// Jeżeli jednak nie możemy odnaleźć, powinniśmy przesłać dalej wykonywanie naszego żądania
// (tutaj może być pomocny moduł fs).

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");

const filteredStrings = ["disco polo", "piwo", "hazard", "cukierki"];

app.use(bodyParser.text());

app.post("/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  
  if (filteredStrings.some((word) => req.body.includes(word))) {
    res.status(400).send("FORBIDDEN");
    return;
  }
});

const fileMiddleware = (req, res, next) => {
    const fileName = req.params.fileName;
  
    fs.exists(fileName, (exists) => {
      console.log(exists);
      if (exists) {
        res.sendFile(fileName, { root: "." });
      } else {
        next();
      }
    });
  };

app.get("/:fileName", fileMiddleware, (req, res) => {
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