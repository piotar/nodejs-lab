const express = require("express");

const app = express();

const users = [
  {
    login: "jan",
    password: "alamakota",
    name: "Jan",
    lastName: "Nowak",
  },
  {
    login: "adam",
    password: "cukierki",
    name: "Adam",
    lastName: "Mickiewicz",
  },
];

const authMiddleware = (req, res, next) => {
  const [login, password] = req.headers.authorization.split(":");
  const user = users.find((u) => u.login === login && u.password === password);
  if (user) {
    req.user = user;
    next();
  } else res.sendStatus(401);
};

app.use(authMiddleware);

app.get("/", (req, res) => {
  res.send(`halo ${req.user.name}!`);
});

app.listen(4000, () => console.log("start server"));
