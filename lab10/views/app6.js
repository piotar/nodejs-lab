const express = require("express");
const app = express();

app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  //   if (typeof id != number) {
  //     throw new Error("Wrong format of input data. Correct format: '/user/:id' ");
  //   } else {
  res.send(id);
  //   }
});

app.listen(4000, () => console.log("start server"));
