// 2.	Przećwiczmy wczytywanie szablonów zmieniając system szablonów PUG na MUSTACHE(https://github.com/bryanburgers/node-mustache-express).
// Stwórzmy aplikację, która wyliczy nam podatek z podanej kwoty i zwróci nam widok z danymi.
// Przykład ścieżki /podatek/19/25, gdzie 19 to wysokość vat podana w procentach oraz 25 kwota.
// Przykład widoku: w pliku word grafika



var express = require('express');
var path = require('path');
var mustacheExpress = require('mustache-express');
var app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/:price/:tax', (req, res, next) => {
    const { price, tax } = req.params;
    let taxResult = tax * price / 100;
    let taxFree = price - taxResult;
    let data = {
        price,
        tax,
        taxResult,
        taxFree,
    };
    res.render('index', data);
});

app.listen(4200, () => console.log("Serwer działaaaaaa"));