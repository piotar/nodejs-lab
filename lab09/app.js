// 1. Stwórzmy swoje pierwsze oprogramowanie pośrednie(middleware).
// Zadaniem middleware będzie nasłuchiwanie wszystkich żądań do serwera
// i wyświetlenie w konsoli informacji na jaki adres użytkownik próbuje się dostać,
// jaką metodą oraz czy zawiera w sobie parametry.

const express = require("express");
const app = express();

const listenerMiddleware = (req, res, next) => {
  console.log("Url:", req.url);
  console.log("Query params", req.query);
  console.log("Params:", req.params);
  console.log("Method", req.method);
  next();
};

//app.use(listenerMiddleware);

app.get("/:id", listenerMiddleware, (req, res) => {
  res.sendStatus(200);
});

app.listen(4000, () => console.log("start server"));
