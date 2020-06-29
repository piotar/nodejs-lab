const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const showFile = (req, res, next) => {
  const filePath = path.join(__dirname, req.originalUrl);

  if (fs.existsSync(filePath)) {
    console.log("file exist");
    res.sendFile(filePath);
  } else {
    console.log("file dont exist");
    next();
  }
};

app.get("/:path?", showFile, (req, res) => {
  res.send("ok");
});

app.listen(4000, () => {
  console.log("Server start on port: 4000\nhttp://localhost:4000");
});
