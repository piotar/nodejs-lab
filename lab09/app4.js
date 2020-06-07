// Wykorzystując zewnętrzny middleware body-parser, odczytajmy zawartość żądania typu text i sprawdźmy
//czy w przesłanym przez użytkownika tekście nie zostały umieszczone niecenzuralne słowa. 
//Jeżeli jakieś słowo podane ze słownika znajduje się w żądaniu zakończmy cykl wysyłając 
//błąd dla użytkownika końcowego(status błędu 400). 
//Przykładowy słowinik zakazanych słów: ['disco polo', 'piwo', 'hazard', 'cukierki']

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const fs = require("fs");
const forbiddenWords = ['disco polo', 'piwo', 'hazard', 'cukierki'];

app.use(bodyParser.text());

app.get("/", (req, res) => {
    fs.readFile("data.txt", "utf8", (error, data) => {
        res.send(data);
    })

})

app.post("/", (req, res) => {
    const hasForbiddenWord = forbiddenWords.some(word => req.body.includes(word));

    if (hasForbiddenWord) {
        res.status(400).send("Niecenzuralne slowo!")
    } else {

        fs.writeFile("data.txt", req.body, () => {
            res.send("ok");
        })

    }
    console.log(req.body);

    // res.send("ok");
})

app.listen(4500, () => console.log('start server'));