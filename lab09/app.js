const bodyParser = require('body-parser');
const express = require('express');

const app = express();

const users = [
  {
    id: 0,
    name: 'Piotr',
    userName: 'piotr',
    password: 'alamakota',
  },
];

const forbiddenWords = ['disco polo', 'piwo', 'hazard', 'cukierki'];

// const showInfo = (req, res, next) => {
//   console.log('Params: ', req.params);
//   console.log('Method: ', req.method);
//   console.log('Host: ', req.headers.host);

//   next();
// };

// app.use(showInfo);

const authorize = (req, res, next) => {
  const [login, password] = req.headers.authorization.split(':');
  const user = users.find((u) => u.userName === login && u.password === password);

  if (user) {
    req.user = user;
    next();
  } else {
    res.sendStatus(401);
  }
};

app.use(bodyParser.text());

app.get('/', async (req, res) => {
  try {
    const text = req.body.split();
    const isForbidden = forbiddenWords.some((w) => req.body.includes(w));

    if (isForbidden) {
      res.status(400).send('Forbidden word');
    } else {
      res.send('Ok');
    }
  } catch (err) {
    console.log(err.message);
  }
});

app.use(authorize);

app.get('/user', (req, res) => {
  res.status(200).send(req.user);
});

app.listen(4700, () => {
  console.log('Server listen at port 4700');
});
