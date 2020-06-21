const express = require("express");
const app = express();

app.set("view engine", "pug");
app.get("/:name?", function (req, res) {
  const name = req.params.name;

  let message = "Hello ";
  if (name) {
    message += name;
  } else {
    message += "world";
  }

  message += "!";

  const scope = { message };
  res.render("index", scope);
});

app.listen(4000, () => console.log("start server"));
