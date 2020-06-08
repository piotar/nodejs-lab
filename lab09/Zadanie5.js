// 5.) Stwórzmy middleware, który sprawdzi czy podana ścieżka jest ścieżką do pliku
// fizycznego na dysku. Jeżeli tak to powinniśmy ten plik wysłać do klienta.
// Jeżeli jednak nie możemy odnaleźć, powinniśmy przesłać dalej wykonywanie naszego
// żądania (tutaj może być pomocny moduł fs).

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");

app.use(bodyParser.json());

const customMiddleware = (req, res, next) => {
  let path = req.body.path;
  console.log(path);
  if (fs.existsSync(path)) {
    fs.readFile(path, (error, content) => {
      console.log(content);
      if (error) {
        res.error(error);
      } else {
        res.send(200, content);
      }
    });
  } else {
    return next();
  }
};

app.use(customMiddleware);

app.post("/text", (req, res) => {
  res.send("Takiego pliku nie ma na dysku");
});

app.listen(4000, () => console.log("start server"));
