const express = require("express");
const fs = require("fs");
const app = express();
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
var mustacheExpress = require("mustache-express");

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

const errorMiddleware = (error, req, res, next) => {
  res.render("index", { error });
};

app.get("/:name", async (req, res, next) => {
  try {
    const { name } = req.params;
    const result = await readFileAsync("../static/" + name, "utf-8");
    res.send(result);
  } catch (error) {
    next(error);
  }
});

app.use(errorMiddleware);

app.listen(4000, () => console.log("start server"));
