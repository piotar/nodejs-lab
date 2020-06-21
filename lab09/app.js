const express = require('express');
const app = express();
const pug = require('pug');

app.set('view engine', 'pug')
app.get('/', function (req, res) {
    const scope = {title: 'my title', header: 'Hello', date: new Date()};
    res.render('index', scope);
});

app.use((error, req, res, next) => {
    console.log('Error from middleware', error.message);
    res.send("Response from error middleware. Error from Server.")
});

app.listen(4500, ()=> console.log('server started'));