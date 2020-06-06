// 1. Stwórzmy swoje pierwsze oprogramowanie pośrednie(middleware).
// Zadaniem middleware będzie nasłuchiwanie wszystkich żądań do serwera
// i wyświetlenie w konsoli informacji na jaki adres użytkownik próbuje się dostać,
// jaką metodą oraz czy zawiera w sobie parametry.

// 2. Kolejnym zadaniem jest stworzenie middleware, który zabezpieczy naszą aplikację dla osób nie upoważnionych.
// Użytkownik powinien wysłać w nagłówku token, który autoryzuje go i wpuszcza do dalszej części aplikacji.
// Przyjmijmy że nazwa nagłówka to authorization, a wartość która wpuszcza nas do systemu to alamakota.

// 3. Zmodyfikujmy zadanie 2 tak aby nagłówek authorization składał się z użytkownika
// i hasła (wzór: login:password, np. jan:alamakota)
// oraz sprawdżmy czy w systemie jest taki użytkownik z takim hasłem.
// Jeżeli użytkownik istnieje, powinniśmy zmodyfikować request, aby dodać znalezionego użytkownika.

const express = require("express");
const app = express();

const users = [];

const logMiddleware = (req, res, next) => {
  console.log("Url:", req.url);
  console.log("Query params", req.query);
  console.log("Params:", req.params);
  console.log("Method", req.method);
  next();
};

const authMiddleware = (req, res, next) => {
  const [name, password] = req.headers.authorization.split(":");

  console.log(name, password);

  let user = users.find((u) => (u.name = name));

  if (user) {
    if (user.password !== password) {
      res.sendStatus(401);
      return;
    }
  } else {
    user = { name, password };
    users.push(user);
  }

  next();

  //   if (!(req.headers.authorization === "alamakota")) {
  //     res.sendStatus(401);
  //     return;
  //   }
  //   next();
};

app.use(logMiddleware);
app.use(authMiddleware);

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.listen(4000, () => console.log("start server"));
