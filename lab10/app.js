//---------------------------------------------------1-----------------------------------------
// const express = require('express');
// const app = express();

// app.set('views', './views');
// app.set('view engine', 'pug');

// app.get('/:name?', (req, res) => {
//   const { name = 'world' } = req.params;

//   res.render('index', { message: `Hello ${name}` });
// });

// app.listen(4700, () => console.log('Server listen at port: 4700'));

//-------------------------------------------------2--------------------------------------------
// const express = require('express');
// const path = require('path');
// const mustacheExpress = require('mustache-express');
// const app = express();

// app.engine('mustache', mustacheExpress());

// app.set('view engine', 'mustache');
// app.set('views', path.join(__dirname, 'views'));

// app.get('/:price/:tax', (req, res) => {
//   const { price, tax } = req.params;

//   const result = (tax * price) / 100;
//   const withoutTax = price - result;

//   const data = {
//     price,
//     tax,
//     result,
//     withoutTax,
//   };

//   res.render('index', data);
// });

// app.listen(4700, () => console.log('Server listen at port: 4700'));

//-------------------------------------------------3--------------------------------------------
// const express = require('express');
// const app = express();

// const errorCatcher = (err, req, res, next) => {
//   console.log(err);

//   res.send(err.message);
// };

// app.get('/:a/:b', (req, res) => {
//   const { a, b } = req.params;

//   if (b === '0') {
//     throw new Error('You cannot divide by 0');
//   } else {
//     const result = a / b;
//     res.send({ result });
//   }
// });

// app.use(errorCatcher);

// app.listen(4700, () => console.log('Server listen at port 4700'));

//-------------------------------------------------4,5-------------------------------------------
const express = require('express');
const mustacheExpress = require('mustache-express');
const util = require('util');
const path = require('path');
const fs = require('fs');
const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

const readFileAsync = util.promisify(fs.readFile);

const errorHandler = (err, req, res, next) => {
  const data = { err };
  res.render('error', data);
};

app.get('/:file', async (req, res, next) => {
  try {
    const { file } = req.params;
    const filePath = path.join(__dirname, 'static', file);
    const musicFile = await readFileAsync(filePath, 'utf-8');
    res.send({ musicFile });
  } catch (e) {
    next(e);
  }
});

app.use(errorHandler);

app.listen(4700, () => console.log('Server listen at port 4700'));
