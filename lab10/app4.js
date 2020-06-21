const express = require("express");
const app = express();
const fs = require("fs");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);

const exceptionHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

app.get(
  "/:path",
  exceptionHandler(async (req, res, next) => {
    const { path } = req.params;
    const data = await readFileAsync(`./static/${path}`, "utf-8");
    res.send(data);
  })
);

app.use((error, req, res, next) => {
  console.log(error.message);
  res.send(error);
});
app.listen(4000, () => console.log("start server"));
