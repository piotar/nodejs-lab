// 3.) Zmodyfikujmy zadanie 2 tak aby nagłówek authorization składał się z użytkownika
// i hasła (wzór: login:password, np. jan:alamakota) oraz sprawdżmy czy w systemie
// jest taki użytkownik z takim hasłem. Jeżeli użytkownik istnieje, powinniśmy
// zmodyfikować request, aby dodać znalezionego użytkownika.

const express = require("express");
const app = express();

const users = [
  { username: "kasia", password: "abcd" },
  { username: "zosia", password: "blabla" },
  { username: "jan", password: "alamakota" },
];

const customMiddleware = (req, res, next) => {
  let auth = req.headers.authorization;
  let [login, password] = auth.split(":");
  let user = users.find((element) => element.username === login);
  if (user && user.password === password) {
    req.user = user;
    return next();
  }
  return res.sendStatus(401);
};

app.use(customMiddleware);

app.get("/uzytkownik/:id", (req, res) => {
  res.json(`${req.params.id}`);
});

app.listen(4000, () => console.log("start server"));
