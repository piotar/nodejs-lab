var express = require('express');
var path = require('path');
var mustacheExpress = require('mustache-express');
var app = express();
import fs from 'fs';

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


// app.get('/:price/:tax', (req, res, next) => {
//     const { price, tax } = req.params;
//     let taxResult = tax * price / 100;
//     let taxFree = price - taxResult;
//     let data = {
//         price,
//         tax,
//         taxResult,
//         taxFree,
//     };
//     res.render('index', data);
// });


// app.get('/:a/:b', (req, res, next) => {
//     try {
//         const { a, b } = req.params;
//         if (Number(b) === 0) {
//             throw new Error('dzielenie przez 0!');
//         } else {
//             res.send((a / b).toString());
//         }
//     } catch (e) {
//         next(e);
//     }
// })

// app.use((e, req, res, next) => {
//     console.log(error.message);
//     res.status(500).send(e.message);
// });

app.get("/name", (req, res, next) => {
    const { name } = req.params;
    fs.readFile(`./static/${name}`, 'utf-8', (error, data) => {
        if (error) {
            next(error);

        } else {
            res.send(data);
        }
    });
});
app.use((error, req, res, next) => {
    console.log(error.message);
    throw error;
})

app.listen(3000, () => console.log("Serwer działaaaaaa"));
