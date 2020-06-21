const express = require("express");
const app = express();

app.get("/:a/:b", (req, res) => {
  const { a, b } = req.params;
  if (parseInt(b) === 0) {
    throw new Error("it is forbidden to divide by 0");
  } else {
    res.send((a / b).toString());
  }
});

app.use((error, req, res, next) => {
  console.log(error.message);
  res.send(error.message);
});

app.listen(4000, () => console.log("start server"));
