/*
Kolejnym zadaniem jest stworzenie middleware, który zabezpieczy naszą aplikację dla osób nie upoważnionych. Użytkownik powinien wysłać w nagłówku token, który autoryzuje go i wpuszcza do dalszej części aplikacji. Przyjmijmy że nazwa nagłówka to authorization, a wartość która wpuszcza nas do systemu to alamakota.*/

const express = require("express");
const app = express();

const authorizationMiddleware = (req, res, next) => {
  const {
    headers: { authorization },
  } = req;
  if (authorization != "alamakota") {
    res.sendStatus(401);
  } else {
    next();
  }
};

app.use(authorizationMiddleware);

app.get("/", (req, res) => {
  res.send("Hallo!!");
});

app.listen(4000, () => console.log("start server"));
