const express = require("express");
const app = express();
const util = require("util");
const fs = require("fs");
const readFileAsync = util.promisify(fs.readFile);

app.get("/:path", async (req, res, next) => {
  const { path } = req.params;
  try {
    const contentFile = await readFileAsync(`./static/${path}`, "utf-8");
    res.send(contentFile);
  } catch (e) {
    next(e);
  }
});

app.use((error, req, res, next) => {
  console.log(error.message);
  res.send("error");
});

app.listen(4000, () => console.log("start server"));
