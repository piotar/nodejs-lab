const axios = require("axios");

const getUserInfoMiddleware = async (req, res, next) => {
  const { id } = req.params;
  try {
    const userInfo = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    req.userInfo = userInfo;
    next();
  } catch (error) {
    next(error);
  }
};

const getWeatherMiddleware = async (req, res, next) => {
  const lat = req.userInfo.data.address.geo.lat;
  const lng = req.userInfo.data.address.geo.lng;

  try {
    const weatherInfo = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat=${lat}&lon=${lng}`
    );
    req.userWeather = weatherInfo;
    next();
  } catch (error) {
    next(error);
  }
};

const express = require("express");
const app = express();

app.get(
  "/user/:id",
  getUserInfoMiddleware,
  getWeatherMiddleware,
  (req, res, next) => {
    res.send({
      "User name": req.userInfo.data.name,
      "User temp": req.userWeather.data.main.temp,
    });
  }
);

app.use((error, req, res, next) => {
  res.render("fifthTask", {
    error: error.message,
  });
});

app.listen(4000, () => console.log("start server"));
