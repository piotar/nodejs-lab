// 3.	Stwórzmy aplikację, która będzie dzieliła dwie liczby. 
// W przypadku dzielenia przez 0, aplikacja ma rzucić wyjątkiem. 
// Dodajmy do naszej aplikacji middleware, który wyświetli w konsoli informacje o wystąpieniu błędu.

var express = require('express');
var path = require('path');
var mustacheExpress = require('mustache-express');
var app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/:numOne/:numTwo', (req, res, next) => {
    const { numOne, numTwo } = req.params;
    let result = numOne / numTwo;
    if (numTwo == 0) {
        throw new Error('nie dzielimy przez 0!');        
    } else {
        let data = {
            numOne,
            numTwo,
            result
        };
        res.render('error', data);
    }
});

app.use((error, req, res, next) => {
    console.log(error.message);
    res.send(error.message);
});

app.listen(4300, () => console.log("Server is working..."));