/*Zmodyfikujmy zadanie 2 tak aby nagłówek authorization składał się z użytkownika i hasła (wzór: login:password, np. jan:alamakota) oraz sprawdżmy czy w systemie jest taki użytkownik z takim hasłem. Jeżeli użytkownik istnieje, powinniśmy zmodyfikować request, aby dodać znalezionego użytkownika.*/

const express = require("express");
const app = express();
const users = [
  {
    login: "jan",
    password: "alamakota",
  },
  {
    login: "zdzisalaw",
    password: "kotlet",
  },
];

const authorizationMiddleware = (req, res, next) => {
  const {
    headers: { authorization },
  } = req;

  const [login, password] = (authorization || "").split(":");

  const user = users.find((u) => u.login === login && u.password === password);

  if (user) {
    req.user = user;
    next();
  } else {
    res.sendStatus(401);
  }
};

app.use(authorizationMiddleware);

app.get("/", (req, res) => {
  res.send(`Hallo!! ${req.user.login}`);
});

app.listen(4000, () => console.log("start server"));
