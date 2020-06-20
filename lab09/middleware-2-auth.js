const express = require("express");
const app = express();

const authorizationMiddleware = (req, res, next) => {
    if(req.headers.authorization ==="alamakota"){
        next();
    }else {
        res.status(401).send("Authorization error");
    }
  };

app.get("/", authorizationMiddleware, (req, res) => {
  res.send("halo");
});

app.listen(4000, () => console.log("start server"));
