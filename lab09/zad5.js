const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const showFile = (req, res, next) => {
  const filePath = path.join(__dirname, req.originalUrl);

  fs.access(filePath, fs.constants.F_OK, (error) => {
    if (error) {
      console.log(error);
      next();
    } else {
      res.sendFile(path, (err) => {
        if (err) {
          console.log(err);
          next();
        }
      });
    }
  });
};

app.get("/:path?", showFile, (req, res) => {
  res.send("ok");
});

app.listen(4000, () => {
  console.log("Server start on port: 4000\nhttp://localhost:4000");
});
