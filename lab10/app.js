const express = require('express');
const app = express();
const pug = require('pug');

app.set('view engine', 'pug');

app.get('/:name?', function (req, res) {
  const name = req.params.name || 'World';
  const scope = { title: 'some title', header: `Heloo ${name}!` };
  res.render('index', scope);
});

app.use((error, req, res, next) => {
    // ...
});

app.listen(4500, () => console.log('start server'));