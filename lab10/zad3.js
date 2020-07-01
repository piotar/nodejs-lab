const express = require("express");
const app = express();

app.get("/dzielenie/:a?/:b?", (req, res) => {
  const {
    params: { a, b },
  } = req;

  if (a && b) {
    if (Number(b) === 0) {
      throw new Error('Division by "0" is not allowed!');
    } else {
      res.send(String(a / b));
    }
  } else {
    throw new Error("Pleace enter two parameters /a/b");
  }
});

app.use((error, req, res, next) => {
  if (error) {
    console.log(error.message);
    res.send(error.message);
  } else {
    next();
  }
});

app.listen(4000, () => {
  console.log("Server stert on port 4000\nhttp://localhost:4000");
});
