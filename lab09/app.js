const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

// app.use((req, res, next) => {
//   console.log(`Adress: ${req.url}, Method: ${req.method}`);
//   console.log(req.query, req.params);
//   next();
// });

// app.use((req, res, next) => {
//   req.headers.authorization === "alamakota" ? next() : res.sendStatus(401);
// });

// const users = [{ id: 0, name: "Ala", username: "ala", password: "alamakota" }];

// app.use((req, res, next) => {
//   const [login, password] = req.headers.authorization.split(":");
//   const user = users.find(
//     (u) => u.username === login && u.password === password
//   );

//   if (user) {
//     req.user = user;
//     next();
//   } else {
//     res.sendStatus(401);
//   }
// });

// app.get("/", (req, res) => {
//   res.sendStatus(200).send(req.user);
// });

// app.use(bodyParser.text());

// const dictionary = ["disco polo", "piwo", "hazard", "cukierki"];

// app.post("/", (req, res) => {
//   const dirtyText = dictionary.some((word) => req.body.includes(word));

//   if (dirtyText) {
//     res.status(400).send("zakazane słowo!!!!!");
//   } else {
//     fs.writeFile("text.txt", req.body, (err) =>
//       err ? err.message : console.log("zapisano!")
//     );
//     res.send(req.body);
//   }
// });

// app.get("/", (req, res) => {
//   fs.readFile("./text.txt", "utf-8", (err, data) => {
//     res.send(data);
//   });
// });

app.use((req, res, next) => {
  const filePath = path.join(__dirname, req.originalUrl);
  if (fs.existsSync(filePath)) {
    console.log("file exist");
    res.sendFile(filePath);
  } else {
    next();
  }
});

app.get("/user.txt", (req, res) => {
  res.send("user");
});

app.get("/data.txt", (req, res) => {
  res.send("data");
});

app.listen(4000, () => console.log("start server"));
