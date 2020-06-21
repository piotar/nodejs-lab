//---------------------------------------------------1-----------------------------------------
const express = require('express');
const app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', { message: 'Hello world' });
});

app.get('/:name', (req, res) => {
  const { name = null } = req.params;
  if (name) {
    res.render('index', { message: `Hello ${name}` });
  } else {
    res.status(404);
  }
});

app.listen(4700, () => console.log('Server listen at port: 4700'));

//-------------------------------------------------2--------------------------------------------
// const express = require('express');
// const mustacheExpress = require('mustache-express');
// const app = express();

// app.engine('mustache', mustacheExpress());

// app.set('view engine', 'mustache');
// app.set('views', './views');
// console.log(__dirname);

// app.get('/', (req, res) => {
//   res.render('index');
// });

// app.listen(4700, () => console.log('Server listen at port: 4700'));
