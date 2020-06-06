// 1. Stwórzmy swoje pierwsze oprogramowanie pośrednie(middleware).
// Zadaniem middleware będzie nasłuchiwanie wszystkich żądań do serwera
// i wyświetlenie w konsoli informacji na jaki adres użytkownik próbuje się dostać,
// jaką metodą oraz czy zawiera w sobie parametry.

// 2. Kolejnym zadaniem jest stworzenie middleware, który zabezpieczy naszą aplikację dla osób nie upoważnionych.
// Użytkownik powinien wysłać w nagłówku token, który autoryzuje go i wpuszcza do dalszej części aplikacji.
// Przyjmijmy że nazwa nagłówka to authorization, a wartość która wpuszcza nas do systemu to alamakota.

const express = require("express");
const app = express();

const logMiddleware = (req, res, next) => {
  console.log("Url:", req.url);
  console.log("Query params", req.query);
  console.log("Params:", req.params);
  console.log("Method", req.method);
  next();
};

const authMiddleware = (req, res, next) => {
  if (!(req.headers.authorization === "alamakota")) {
    res.sendStatus(401);
    return;
  }
  next();
};

app.use(logMiddleware);
app.use(authMiddleware);

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.listen(4000, () => console.log("start server"));
