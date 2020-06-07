const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
app.use(bodyParser.text());

// const users = [
//   {
//     login: "jan",
//     password: "alamakota",
//     name: "Jan",
//     lastName: "Nowak",
//   },
//   {
//     login: "adam",
//     password: "cukierki",
//     name: "Adam",
//     lastName: "Mickiewicz",
//   },
// ];

// const authMiddleware = (req, res, next) => {
//   const [login, password] = req.headers.authorization.split(":");
//   const user = users.find((u) => u.login === login && u.password === password);
//   if (user) {
//     req.user = user;
//     next();
//   } else res.sendStatus(401);
// };

// app.use(authMiddleware);

app.get("/", (req, res) => {
  //   res.send(`halo ${req.user.name}!`);
  fs.readFile("data.txt", "utf8", (error, data) => {
    res.send(data);
  });
});

const forbiddenWords = ["disco polo", "piwo", "hazard", "cukierki"];

app.post("/", (req, res) => {
  console.log(req.body);
  const hasForbiddenWords = forbiddenWords.some((word) =>
    req.body.includes(word)
  );
  if (hasForbiddenWords) {
    res.status(400).send("uncensored word!");
  } else res.send(`OK!`);
  fs.writeFile("data.txt", req.body, () => {
    res.send("ok");
  });
});

app.listen(4000, () => console.log("start server"));
