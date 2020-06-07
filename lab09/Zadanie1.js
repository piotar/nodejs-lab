// 1.) Stwórzmy swoje pierwsze oprogramowanie pośrednie(middleware).
// Zadaniem middleware będzie nasłuchiwanie wszystkich żądań do serwera
// i wyświetlenie w konsoli informacji na jaki adres użytkownik próbuje
// się dostać, jaką metodą oraz czy zawiera w sobie parametry.

const express = require("express");
const app = express();

const customMiddleware = (req, res, next) => {
  console.log(`url: ${req.url}`);
  console.log(`method: ${req.method}`);
  console.log(`params: ${req.params}`);
  next();
};

app.use(customMiddleware);

app.get("/uzytkownik/:id", (req, res) => {
  res.json(`${req.params.id}`);
});

app.listen(4000, () => console.log("start server"));
