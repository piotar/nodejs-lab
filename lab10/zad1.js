const express = require("express");

const app = express();

app.set("view engine", "pug");

app.get("/:name?", (req, res) => {
  const {
    params: { name = "World" },
  } = req;

  res.render("index", { title: "Hello", name });
});

app.listen(4000, () => {
  console.log("Server start on port 4000\nhttp://localhost:4000");
});
