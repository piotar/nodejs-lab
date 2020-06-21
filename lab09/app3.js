const express = require('express');
const app = express();

app.set('view engine', 'pug')

    app.get('/:name', function (req, res) {
        const {name = "world"} = req.params;
        const message = "hello " + name;
        res.render('index', { title: 'Hey', message: message })
    });

app.listen(4000, () => console.log('start server'));