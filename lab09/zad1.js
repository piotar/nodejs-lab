/*Stwórzmy swoje pierwsze oprogramowanie pośrednie(middleware). Zadaniem middleware będzie nasłuchiwanie wszystkich żądań do serwera i wyświetlenie w konsoli informacji na jaki adres użytkownik próbuje się dostać, jaką metodą oraz czy zawiera w sobie parametry.*/

const express = require("express");
const app = express();

const customMiddleware = (req, res, next) => {
  const { originalUrl, method, params } = req;
  console.log(
    "orginalUrl:",
    originalUrl,
    "\nmethod: ",
    method,
    "\nparams: ",
    params,
    "\n\n"
  );
  next();
};

app.use(customMiddleware);

app.get("/:name?", customMiddleware, (req, res) => {
  res.send("Hello!");
});

app.listen(4000, () => console.log("start server"));
