const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const users = [
  { login: "jan", password: "alamakota" },
  { login: "pawel", password: "czterylitery" },
];

const dict = ["disco polo", "piwo", "hazard", "cukierki"];

const logMiddleware = (req, res, next) => {
  console.log(req.method, req.url);
  console.log(req.params, req.query);
  next();
};

const authMiddleware = (req, res, next) => {
  const [login, password] = req.headers.authorization.split(":");

  let user = users.find((u) => u.login === login);

  if (user && user.password === password) {
    req.user = user;
    next();
  } else {
    res.status(401).send("unauthorized");
  }
};

app.use(logMiddleware);
app.use(authMiddleware);
app.use(bodyParser.text());

app.get("/", (req, res) => {
  res.send("hola hola");
});

app.post("/", (req, res) => {
  if (dict.some((word) => req.body.includes(word))) {
    res.status(400).send("brzydkie słowa");
  } else {
    res.send("jest git");
  }
});

app.listen(4000);
