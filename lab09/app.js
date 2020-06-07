const express = require("express");

const app = express();

const myMiddleware = (req, res, next) => {
  console.log("URL:", req.originalUrl);
  console.log("method:", req.method);
  console.log("params:", req.params);
  next();
};

app.use(myMiddleware);

app.get("/:name?", myMiddleware, (req, res) => {
  res.send("halo");
});

app.listen(4000, () => console.log("start server"));
