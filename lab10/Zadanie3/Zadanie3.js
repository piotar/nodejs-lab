// Stwórzmy aplikację, która będzie dzieliła dwie liczby. W przypadku dzielenia przez 0,
//  aplikacja ma rzucić wyjątkiem. Dodajmy do naszej aplikacji middleware, który wyświetli
//  w konsoli informacje o wystąpieniu błędu.

const express = require("express");
const app = express();

const calculate = (firstNumber, secondNumber) => {
  if (secondNumber == 0) {
    throw new Error("Dzielenie przez 0!");
  }
  const result = firstNumber / secondNumber;
  console.log(firstNumber, secondNumber);
  return result;
};

app.get("/:firstNumber/:secondNumber", (req, res) => {
  res.send(`${calculate(req.params.firstNumber, req.params.secondNumber)}`);
});

app.use((error, req, res, next) => {
  console.log(error.message);
  res.send(error.message);
});

app.listen(4005, () => {
  console.log("start server");
});
