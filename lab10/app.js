const fs = require('fs');
const util = require('util');
const express = require('express');
const pug = require('pug');
const mustacheExpress = require('mustache-express');
const axios = require('axios').default;

const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// app.set('view engine', 'pug');

// const calculateTax = (tax, amount) => {
//   const taxValue = tax * amount / 100;
//   return {
//     taxValue: taxValue,
//     amount: amount - taxValue
//   };
// }

// app.get('/:name?', function (req, res) {
//   const name = req.params.name || 'World';
//   const scope = { title: 'some title', header: `Heloo ${name}!` };
//   res.render('index', scope);
// });

// app.get('/podatek/:tax/:price', (req, res, next) => {
//   const { tax, price } = req.params;
//   const result = calculateTax(tax, price);
//   res.render('index', {price: price, tax: tax, ...result});
// });

// app.get('/:a/:b', (req, res, next) => {
//     const {a,b} = req.params;
//     if( Number(b) === 0 ) {
//       throw new Error('dzielenie przez 0!');
//     } else {
//       res.send( (a/b).toString() );
//     }
// });

// const readFileAsync = util.promisify(fs.readFile);
//
// app.get('/file/:path', async (req, res, next) => {
//   try {
//     const { path } = req.params;
//     const data = await(readFileAsync(`./static/${path}`, 'utf-8'));
//     data && res.send(data);
//   } catch (e) {
//     next(e)
//   }
// });

const getUser = async (id) => {
  const url = `https://jsonplaceholder.typicode.com/users/${id}`;
  const user = await axios.get(url);
  return user.data;
}

const getWeather = async (lat, lng) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat=${lat}&lon=${lng}`;
  const weather = await axios.get(url);
  return weather.data;
}

app.get('/user/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const userData = await getUser(id);
    const {geo: {lat, lng}} = userData.address;
    const weather = await getWeather(lat, lng);
    res.send({
      name: userData.name,
      weather: weather.weather[0].description,
      temp: weather.main.temp
    });
  } catch (err) {
    next(err)
  }
});

app.use((e, req, res, next) => {
  if(e.code === 'ENOENT') {
    console.log(e);
    res.render('error');
  } else {
    console.log(e);
    res.status(500).send(e.message);
  }
});

app.listen(4500, () => console.log('start server'));
