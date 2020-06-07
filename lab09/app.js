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

// const express = require("express");
// const app = express();

// const checkAuthorization = (req, res, next) => {
//   //   console.log(`Address: ${req.url}`, `Method: ${req.method}`);
//   //   console.log(req.query, req.params);
//   if (req.headers.authorization === "alamakota") {
//     next();
//   } else {
//     res.status(401).send("Unauthorized user");
//   }
// };

// app.use(checkAuthorization);

// app.get("/", (req, res) => {
//   res.send("Authorized user");
// });

// app.listen(4000, () => console.log("start server"));

// Zadanie 3
// Zmodyfikujmy zadanie 2 tak aby nagłówek authorization składał się z użytkownika i hasła (wzór: login:password,
// np. jan:alamakota) oraz sprawdżmy czy w systemie jest taki użytkownik z takim hasłem. Jeżeli użytkownik istnieje,
// powinniśmy zmodyfikować request, aby dodać znalezionego użytkownika.

// const express = require("express");
// const app = express();

// const users = [
//   { login: "jan", password: "alamakota" },
//   { login: "kasia", password: "gorska" },
// ];

// const customMiddleware = (req, res, next) => {
//   console.log(`Address: ${req.url}`, `Method: ${req.method}`);
//   console.log(req.query, req.params);
//   next();
// };

// const authorizationMiddleware = (req, res, next) => {
//   const [login, password] = req.headers.authorization.split(":");
// };

// console.log(login, password);

// let user = users.find((u) => u.login === login);

// if (user && user.password === password) {
//   req.user = user;
//   next();
// } else {
//   res.sendStatus(401);
// }

// app.use(customMiddleware);
// app.use(authorizationMiddleware);

// app.get("/", (req, res) => {
//   res.sendStatus(200).send(req.user);
// });

// app.listen(4000, () => console.log("start server"));

// Zadanie 4
// Wykorzystując zewnętrzny middleware body-parser, odczytajmy zawartość żądania typu text i sprawdźmy czy w przesłanym
// przez użytkownika tekście nie zostały umieszczone niecenzuralne słowa. Jeżeli jakieś słowo podane ze słownika znajduje
// się w żądaniu zakończmy cykl wysyłając błąd dla użytkownika końcowego(status błędu 400). Przykładowy słowinik zakazanych
// słów: ['disco polo', 'piwo', 'hazard', 'cukierki']

// Stwórzmy tutaj dodatkowo REST API do zapisu i wyświetlania zawartości przesłanego tekstu przez użytkownika. Zapiszmy
// to na dysku w pliku tektowym

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const users = [
  { login: "jan", password: "alamakota" },
  { login: "kasia", password: "gorska" },
];

const dictionary = ["disco polo", "piwo", "hazard", "cukierki"];

const customMiddleware = (req, res, next) => {
  console.log(`Address: ${req.url}`, `Method: ${req.method}`);
  console.log(req.query, req.params);
  next();
};

const authorizationMiddleware = (req, res, next) => {
  const [login, password] = req.headers.authorization.split(":");
};

console.log(login, password);

let user = users.find((u) => u.login === login);

if (user && user.password === password) {
  req.user = user;
  next();
} else {
  res.sendStatus(401);
}

// app.use(customMiddleware);
// app.use(authorizationMiddleware);
app.use(bodyParser.text());

app.get("/", (req, res) => {
  res.sendStatus(200).send(req.user);
});

app.post("/", (req, res) => {
  if (dictionary.some((word) => req.body.includes(word))) {
    res.status(400).send("Zakazane słowo");
  } else {
    res.send("Tekst jest poprawny");
  }
});

app.listen(4000, () => console.log("start server"));

// Zadanie 5
// Stwórzmy middleware, który sprawdzi czy podana ścieżka jest ścieżką do pliku fizycznego na dysku. Jeżeli tak to powinniśmy
// ten plik wysłać do klienta. Jeżeli jednak nie możemy odnaleźć, powinniśmy przesłać dalej wykonywanie naszego żądania(tutaj
// może być pomocny moduł fs).
