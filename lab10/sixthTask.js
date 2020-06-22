const axios = require("axios");
const mustacheExpress = require("mustache-express");

const getUserInfo = async (id) => {
  const userInfo = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return userInfo;
};

const getUserWeather = async (userInfo) => {
  const lat = userInfo.data.address.geo.lat;
  const lng = userInfo.data.address.geo.lng;

  const weatherInfo = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat=${lat}&lon=${lng}`
  );
  return weatherInfo;
};

const express = require("express");
const app = express();

app.engine("mustache", mustacheExpress());

app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.get("/user/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const userInfo = await getUserInfo(id);
    const userWeather = await getUserWeather(userInfo);
    res.send({
      "User name": userInfo.data.name,
      "User temp": userWeather.data.main.temp,
    });
  } catch (e) {
    next(e);
  }
});

app.use((error, req, res, next) => {
  res.render("fifthTask", {
    error: error.message,
  });
});

app.listen(4000, () => console.log("start server"));
