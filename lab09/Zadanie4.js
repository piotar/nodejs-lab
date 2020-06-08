// 4.) Wykorzystując zewnętrzny middleware body-parser, odczytajmy zawartość żądania
// typu text i sprawdźmy czy w przesłanym przez użytkownika tekście nie zostały
// umieszczone niecenzuralne słowa. Jeżeli jakieś słowo podane ze słownika znajduje się
// w żądaniu zakończmy cykl wysyłając błąd dla użytkownika końcowego(status błędu 400).
// Przykładowy słowinik zakazanych słów: ['disco polo', 'piwo', 'hazard', 'cukierki'].

// Stwórzmy tutaj dodatkowo REST API do zapisu i wyświetlania zawartości przesłanego
// tekstu przez użytkownika. Zapiszmy to na dysku w pliku tektowym

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.text());

const niecenzuralne = ["disco polo", "piwo", "hazard", "cukierki"];

app.post("/", (req, res) => {
  console.log(req.body);
  const jestNiecenzuralne = niecenzuralne.some((word) =>
    req.body.includes(word)
  );
  if (jestNiecenzuralne) {
    res.status(400).send("Zakazane słowo");
  } else {
    fs.writeFile("text.txt", req.body, (err) => {
      return err ? err.message : console.log("zapisano");
    });
    res.send(req.body);
  }
});

app.get("/", (req, res) => {
  fs.readFile("./text.txt", "utf-8", (err, data) => {
    res.send(data);
  });
});

app.listen(4000, () => {
  console.log("start server");
});
