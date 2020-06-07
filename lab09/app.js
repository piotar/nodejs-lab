// Zadanie 1
// Stwórzmy swoje pierwsze oprogramowanie pośrednie(middleware). Zadaniem middleware będzie nasłuchiwanie wszystkich
// żądań do serwera i wyświetlenie w konsoli informacji na jaki adres użytkownik próbuje się dostać, jaką metodą oraz
// czy zawiera w sobie parametry.

// const express = require("express");
// const app = express();

// const customMiddleware = (req, res, next) => {
//   console.log(`Address: ${req.url}`, `Method: ${req.method}`);
//   console.log(req.query, req.params);
//   next();
// };

// app.use(customMiddleware);

// app.get("/:id?", (req, res) => {
//   res.send("OK");
// });

// app.listen(4000, () => console.log("start server"));

// Zadanie 2
// Kolejnym zadaniem jest stworzenie middleware, który zabezpieczy naszą aplikację dla osób nie upoważnionych.
// Użytkownik powinien wysłać w nagłówku token, który autoryzuje go i wpuszcza do dalszej części aplikacji.
// Przyjmijmy że nazwa nagłówka to authorization, a wartość która wpuszcza nas do systemu to alamakota.

const express = require("express");
const app = express();

const checkAuthorization = (req, res, next) => {
  //   console.log(`Address: ${req.url}`, `Method: ${req.method}`);
  //   console.log(req.query, req.params);
  if (req.headers.authorization === "alamakota") {
    next();
  } else {
    res.status(401).send("unauthorized user");
  }
};

app.use(checkAuthorization);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(4000, () => console.log("start server"));
