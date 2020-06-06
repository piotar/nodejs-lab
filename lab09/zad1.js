const express = require("express");
const app = express();
const parser = require("body-parser");

let users = [
  { login: "abcd", password: "efgh" },
  { login: "bartosz", password: "misiewicz" },
  { login: "donald", password: "tusk" },
  { login: "borys", password: "budka" },
];

let forb = ["disco polo", "piwo", "hazard", "cukierki"];

const checkAuth = (req, res, next) => {
  const [login, password] = req.headers.authorization.split(":");

  let user = users.find((el) => el.login === login);

  if (user && user.password === password) {
    req.user = user;
    next();
  } else {
    res.status(401).send("unauthorized user");
  }
};

app.use(checkAuth);

app.use(parser.text());

app.post("/", checkAuth, (req, res) => {
  if (forb.some((word) => req.body.includes(word))) {
    res.status(400).send("niewlasciwe dane");
  } else {
    res.send("dobrze");
  }
});

app.listen(4000, () => console.log("start server"));
