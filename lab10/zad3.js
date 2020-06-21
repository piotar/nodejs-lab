const express = require("express");
const app = express();

app.get("/:a/:b", (req, res) => {
  const { a, b } = req.params;

  if (Number(b) === 0) {
    throw new Error("Dzilenie przez 0!?!?");
  } else {
    res.send((a / b).toString());
  }
});

app.use((error, req, res, next) => {
  console.log(error.message);
});
app.listen(4400, () => console.log("start server"));
