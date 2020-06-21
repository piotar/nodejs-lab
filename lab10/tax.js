const express = require("express");
const app = express();
// const pug = require("pug");
// const compiledFunction = pug.compileFile("index.pug");

const mustacheExpress = require("mustache-express");

const calc = (a, b) => {
  return a * (b * 0.1);
};

app.engine("mustache", mustacheExpress());

app.set("view engine", "mustache");
app.get("/:price?/:amount?", function (req, res) {
  const { price, amount } = req.params;

  const result = calc(price, amount);

  res.render("index", { price, amount, result });
});

app.listen(4000, () => console.log("start server"));
