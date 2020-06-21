const express = require("express");
const fs = require("fs");
const app = express();
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);

app.get("/:name", async (req, res, next) => {
  try {
    const { name } = req.params;
    const result = await readFileAsync("../static/" + name);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

app.listen(4000, () => console.log("start server"));
