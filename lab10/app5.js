// Dodajmy do zdania 4 middleware obsługujący błąd i wyświetlmy swoją stronę z błędem. 
// W zadaniu wykorzystajmy system szablonów mustache

const express = require('express');
const app = express();
const fs = require('fs');
var mustacheExpress = require('mustache-express');

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.get('/:fileName', (req, res, next) => {
    const { fileName } = req.params;

    fs.readFile(`./static/${fileName}`, "utf-8", (error, data) => {
        if (error) { 
            next(error);
        } else {
            res.send(data);
        }
    });
});

app.use((error, req, res, next) => {
    const { message } = error;
    console.log('error message', message);
    res.render('errorFile', { message })
});

app.listen(4500, () => console.log("Server is working..."));