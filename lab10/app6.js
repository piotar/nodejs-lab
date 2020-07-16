const mustacheExpress = require("mustache-express");
const axios = require("axios").default;
const express = require("express");
const app = express();

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

const getUser = async (id) => {
  const url = `https://jsonplaceholder.typicode.com/users/${id}`;
  const user = await axios.get(url);
  return user.data;
};

const getWeather = async (userInfo) => {
  const lat = userInfo.address.geo.lat;
  const lng = userInfo.address.geo.lng;
  const url = `https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat=${lat}&lon=${lng}`;
  const weather = await axios.get(url);
  return weather.data;
};

app.get("/user/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const userInfo = await getUser(id);
    const weatherInfo = await getWeather(userInfo);
    // res.send({
    //   name: userInfo.name,
    //   username: userInfo.username,
    //   email: userInfo.email,
    //   address: userInfo.address,
    //   weather: weatherInfo.weather,
    //   temp: weatherInfo.main.temp,
    // });
    res.render("user6", {
      name: userInfo.name,
      username: userInfo.username,
      email: userInfo.email,
      city: userInfo.address.city,
      weather: weatherInfo.weather[0].description,
      temp: weatherInfo.main.temp,
    });
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  res.render("app6", {
    error: error.message,
  });
});

app.listen(4000, () => console.log("start server"));
