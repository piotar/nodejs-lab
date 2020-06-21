const express = require("express");
const app = express();
const fs = require("fs");

const mustacheExpress = require("mustache-express");

const isTextMiddleware = (req, res, next) => {
  fs.readFile(`./static/${req.params.name}.txt`, "utf8", (err, data) => {
    if (err) {
      next(new Error("No such file"));
    } else {
      req.readData = data;
      next();
    }
  });
};

app.engine("mustache", mustacheExpress());

app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.get("/:name", isTextMiddleware, (req, res) => {
  const content = req.readData;
  res.send(content);
});

app.use((error, req, res, next) => {
  res.render("indexik", {
    error: error.message,
  });
});

app.listen(4000, () => console.log("start server"));
