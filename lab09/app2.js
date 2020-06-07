const express = require("express");

const app = express();

const myMiddleware = (req, res, next) => {
  const {
    headers: { authorization },
  } = req;
  if (authorization != "alamakota") {
    res.sendStatus(401);
  } else next();
};

app.use(myMiddleware);

app.get("/", (req, res) => {
  req.headers.authorization;
  res.send("halo");
});

app.listen(4000, () => console.log("start server"));
