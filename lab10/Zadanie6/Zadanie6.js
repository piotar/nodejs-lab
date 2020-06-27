const express = require("express");
const app = express();
const axios = require("axios");
var mustacheExpress = require("mustache-express");

// Register '.mustache' extension with The Mustache Express
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.get("/users/:userId", async (req, res, next) => {
  // res.setHeader("Content-Type", "application/json");
  try {
    const userResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${req.params.userId}`
    );

    const lat = userResponse.data.address.geo.lat;
    const lng = userResponse.data.address.geo.lng;

    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat=${lat}&lon=${lng}`
    );
    return res.render("template", {
      user: JSON.stringify(userResponse.data),
      weather: JSON.stringify(weatherResponse.data),
    });
  } catch (err) {
    return res.render(404).json(err);
  }
});

app.listen(4000, () => console.log("start server"));
