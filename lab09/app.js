const express = require('express');
const app = express();

const users = [
  {
    id: 0,
    name: 'Piotr',
    login: {
      userName: 'piotr',
      password: 'alamakota',
    },
  },
];

// const showInfo = (req, res, next) => {
//   console.log('Params: ', req.params);
//   console.log('Method: ', req.method);
//   console.log('Host: ', req.headers.host);

//   next();
// };

// app.use(showInfo);

const authorize = (req, res, next) => {
  const [login, password] = req.headers.authorization.split(':');
  const user = users.find((u) => u.login.userName === login && u.login.password === password);

  if (user) {
    req.user = { id: user.id, name: user.name };
    next();
  } else {
    res.sendStatus(401);
  }
};

app.use(authorize);

app.get('/', (req, res) => {
  res.status(200).send(req.user);
});

app.listen(4700, () => {
  console.log('Server listen at port 4700');
});
