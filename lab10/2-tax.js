// 2 - Przećwiczmy wczytywanie szablonów zmieniając system szablonów PUG na MUSTACHE(https://github.com/bryanburgers/node-mustache-express). 
// Stwórzmy aplikację, która wyliczy nam podatek z podanej kwoty i zwróci nam widok z danymi.
// Przykład ścieżki /podatek/19/25, gdzie 19 to wysokość vat podana w procentach oraz 25 kwota.

const express = require('express');
const app = express();

app.set('view engine', 'pug')
    app.get('/', function (req, res) {
        
        const message = "hello"
        res.render('index', { title: 'Hey', message: message })
    });

    app.get('/:name', function (req, res) {
        let name = req.params.name? req.params.name : "";
        const message = "hello " + name;
        res.render('index', { title: 'Hey', message: message })
    });

app.listen(4000, () => console.log('start server'));
