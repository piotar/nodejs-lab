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
