var express = require("express");
var app = express();

//Zadanie 1
const logger = (req, res, next) => {
    console.log(req.method);
    console.log(req.url);
    console.log(req.path);

    console.dir(req.query);
    const { id } = req.query;
    id ? console.log(id) : console.log("Brak parametrów");


    next();
}
const parameter = (req, res) => {

    res.send("Koniec");
}
app.use(logger);
//Zad1
//Zad2

//Zad2

app.listen(4600, () => console.log("Serwer działaaaaaa"));