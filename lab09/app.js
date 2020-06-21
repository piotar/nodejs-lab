var express = require("express");
var app = express();

//Zadanie 1
// const logger = (req, res, next) => {
//     console.log(req.method);
//     console.log(req.url);
//     console.log(req.path);

//     console.dir(req.query);
//     const { id } = req.query;
//     id ? console.log(id) : console.log("Brak parametrów");


//     next();
// }
// const parameter = (req, res) => {

//     res.send("Koniec");
// }
// app.use(logger);
//Zad1
//Zad2
app.use((req, res, next) => {
    const password = req.headers.authorization;
    let parts = auth.split(':');
    if (parts[1] === 'password') {
        next();
    } else {
        res.sendStatus(401);
    }

})

app.get('/', (req, res) => {
    res.sendStatus(200);
})

app.get('/:id', (req, res) => {

    res.send(req.params);
})

app.post('/', (req, res) => {
    res.sendStatus(200);
})

//Zad2

app.listen(4600, () => console.log("Serwer działaaaaaa"));