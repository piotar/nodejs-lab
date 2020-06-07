const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const users = [
  {
    login: "jan",
    password: "alamakota",
    name: "Jan",
    lastName: "Nowak",
  },
  {
    login: "adam",
    password: "abababab",
    name: "Adam",
    lastName: "Kowalski",
  },
];

const customMiddleware = (req, res, next) => {
  // req.headers.authorization => login:password
  const [login, passowrd] = (req.headers.authorization || "").split(":");
  const user = users.find((u) => u.login === login && u.password === password);

  if (user) {
    req.user = user;
    next();
  } else {
    res.sendStatus(401);
  }
};

app.use(customMiddleware);

app.use(bodyParser.text());
const illegalWords = ["disco polo", "piwo", "hazard", "cukierki"];

app.get("/", customMiddleware, (req, res) => {
  res.send("halo");
});

app.post("/", (req, res) => {
  const hasIllegalWords = illegalWords.some((word) => req.body.includes(word));
  if (hasIllegalWords) {
    res.status(400).send("nie cenzuralne slowo");
  } else {
    res.send("ok");
  }
});

app.listen(4000, () => console.log("start server"));
