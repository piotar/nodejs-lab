const express = require("express");
const fs = require("fs");
const router = express.Router();
const bodyParser = require("body-parser");

const textParser = bodyParser.text();

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

let counter = 0;

const forbiddenWords = ["cukierki", "disco-polo", "hazard", "niepiwo"];

const authorizationMiddleware = (req, res, next) => {
  const [login, password] = req.headers.authorization.split(":");

  const user = users.find((u) => u.login === login && u.password === password);

  if (user) {
    req.user = user;
    next();
  } else {
    res.sendStatus(401);
  }
};

const censorTextMiddleware = (req, res, next) => {
  const hasForbiddenWords = forbiddenWords.some((word) =>
    req.body.includes(word)
  );

  if (hasForbiddenWords) {
    next(new Error("You tried to post forbidden word"));
  } else {
    next();
  }
};

const isTextMiddleware = (req, res, next) => {
  fs.readFile(`${req.params["id"]}.txt`, "utf8", (err, data) => {
    if (err) {
      next(new Error("File does not exist"));
    } else {
      req.readData = data;
      next();
    }
  });
};

router.use(authorizationMiddleware);

router.get("/", (req, res) => res.send(users));

router.get("/:id", isTextMiddleware, (req, res) => {
  const sentence = req.readData;
  res.send(sentence);
});

router.post("/", textParser, censorTextMiddleware, (req, res) => {
  fs.writeFile(`${counter++}.txt`, JSON.stringify(req.body), (err) => {
    if (err) next(new Error("Something went wrong"));
    res.send("File was succesfully saved");
  });
});

module.exports = router;
