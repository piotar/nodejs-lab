const express = require("express");
const fs = require("fs");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
const app = express();

app.get("/:filePath", async (req, res, next) => {
  const { filePath } = req.params;

  try {
    const data = await readFileAsync(`./static/${filePath}`, "utf8");
    res.send(data);
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  if (error) {
    console.log(error);
    res.send(error.message);
  } else {
    next();
  }
});

app.listen(4000, () => {
  console.log("Server start on port 4000\nhttp://localhost:4000");
});
