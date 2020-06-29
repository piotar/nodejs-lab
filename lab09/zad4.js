/*Wykorzystując zewnętrzny middleware body-parser, odczytajmy zawartość żądania typu text i sprawdźmy czy w przesłanym przez użytkownika tekście nie zostały umieszczone niecenzuralne słowa. Jeżeli jakieś słowo podane ze słownika znajduje się w żądaniu zakończmy cykl wysyłając błąd dla użytkownika końcowego(status błędu 400). Przykładowy słowinik zakazanych słów: ['disco polo', 'piwo', 'hazard', 'cukierki']*/

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

app.use(bodyParser.text());

const firboddenWordsTest = (req, res, next) => {
  const firboddenWords = ["disco polo", "piwo", "hazard", "cukierki"];
  const isFirbodden = firboddenWords.some((word) => req.body.includes(word));
  if (isFirbodden) {
    res.status(400).send("Nie cenzuralne słowo!");
  }
  fs.writeFile("dane.txt", req.body, next);
};

app.get("/", (req, res) => {
  fs.readFile("dane.txt", "utf8", (error, data) => {
    res.send(data);
  });
});

app.post("/", firboddenWordsTest, (req, res) => {
  res.send("Hallo!!");
});

app.listen(4000, () => console.log("start server"));
