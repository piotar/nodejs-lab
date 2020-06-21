const express = require("express");
const app = express();
// const pug = require("pug");
// const compiledFunction = pug.compileFile("index.pug");

app.set("view engine", "pug");
app.get("/:name?", function (req, res) {
  const { name = "World" } = req.params;
  const message = "hello" + name;
  res.render("index", { title: "hey", message: message });
});

app.listen(4000, () => console.log("start server"));
