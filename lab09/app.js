const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

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

const showInfo = (req, res, next) => {
  console.log('Params: ', req.params);
  console.log('Method: ', req.method);
  console.log('Host: ', req.headers.host);
  console.log('Query: ', req.query);

  next();
};

const authorize = (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [login, password] = authorization.split(':');

  const user = users.find((u) => u.userName === login && u.password === password);

  if (user) {
    req.user = user;
    next();
  } else {
    res.sendStatus(401);
  }
};

app.use(bodyParser.text());
app.use(showInfo);

app.get('/file', (req, res) => {
  fs.readFile('data.txt', 'utf-8', (err, data) => {
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send(err);
    }
  });
});

app.post('/file', async (req, res) => {
  try {
    const text = req.body.split();

    const isForbidden = forbiddenWords.some((w) => req.body.includes(w));

    if (isForbidden) {
      res.status(400).send('Forbidden word');
    } else {
      fs.writeFile('data.txt', req.body, () => {
        res.status(200).send('Saved');
      });
    }
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/:name', authorize, (req, res) => {
  res.send(`Hello ${req.params.name}`);
});

app.listen(4700, () => {
  console.log('Server listen at port 4700');
});
