//var createError = require('http-errors');
var express = require('express');
var path = require('path');


var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res, next) => {
    res.render('index', { title: 'Hello', name: 'World' });
});

app.get('/:name', (req, res, next) => {
    let { name } = req.params;
    res.render('index', { title: 'Hello', name: `${name}` });
});


app.listen(3000, () => console.log("Serwer działaaaaaa"));
