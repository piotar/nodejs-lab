// 2.) Kolejnym zadaniem jest stworzenie middleware, który zabezpieczy naszą aplikację
// dla osób nie upoważnionych. Użytkownik powinien wysłać w nagłówku token, który
// autoryzuje go i wpuszcza do dalszej części aplikacji. Przyjmijmy że nazwa nagłówka
// to authorization, a wartość która wpuszcza nas do systemu to alamakota.

const express = require("express");
const app = express();

const token = "alamakota";
const customMiddleware = (req, res, next) => {
  let auth = req.headers.authorization;
  if (auth === token) {
    return next();
  }
  return res.status(400).send("Access denied");
};

app.use(customMiddleware);

app.get("/uzytkownik/:id", (req, res) => {
  res.json(`${req.params.id}`);
});

app.listen(4000, () => console.log("start server"));
