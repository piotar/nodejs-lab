const express = require('express');
const app = express();
const pug = require('pug');
const mustacheExpress = require('mustache-express');

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// app.set('view engine', 'pug');

const calculateTax = (tax, amount) => {
  const taxValue = tax * amount / 100;
  return {
    taxValue: taxValue,
    amount: amount - taxValue
  };
}

app.get('/:name?', function (req, res) {
  const name = req.params.name || 'World';
  const scope = { title: 'some title', header: `Heloo ${name}!` };
  res.render('index', scope);
});

app.get('/podatek/:tax/:price', (req, res, next) => {
  const { tax, price } = req.params;
  const result = calculateTax(tax, price);
  res.render('index', {price: price, tax: tax, ...result});
});

app.get('/:a/:b', (req, res, next) => {
  try{
    const {a,b} = req.params;
    if( Number(b) === 0 ) {
      throw new Error('dzielenie przez 0!');
    } else {
      res.send( (a/b).toString() );
    }
  } catch (e) {
    next(e);
  }
})

app.use((e, req, res, next) => {
  res.status(500).send(e.message);
});

app.listen(4500, () => console.log('start server'));