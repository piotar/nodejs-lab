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

app.get("/", customMiddleware, (req, res) => {
  res.send("halo");
});

app.listen(4000, () => console.log("start server"));
