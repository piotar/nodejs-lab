const express = require("express");
const app = express();

app.set("view engine", "pug");

app.get("/:name?", function (req, res) {
  const { name = "World" } = req.params;
  res.render("index", {
    title: "Hello",
    message: `Hello ${name}!`,
  });
});

app.listen(4000, () => console.log("start server"));
