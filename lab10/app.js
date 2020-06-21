var express = require('express');
var path = require('path');
var mustacheExpress = require('mustache-express');

var app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// app.get('/', (req, res, next) => {
//     res.render('index', { title: 'Hello', name: 'World' });
// });

// app.get('/:name', (req, res, next) => {
//     let { name } = req.params;
//     res.render('index', { title: 'Hello', name: `${name}` });
// });


app.get('/:price/:tax', (req, res, next) => {
    const { price, tax } = req.params;
    let taxResult = tax * price / 100;
    let taxFree = price - taxResult;
    console.log(taxResult);
    console.log(taxFree);
    let data = {
        price,
        tax,
        taxResult,
        taxFree,
    };
    res.render('index', data);
});

app.listen(3000, () => console.log("Serwer działaaaaaa"));
