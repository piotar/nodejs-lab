const express = require("express");
const fetch = require("node-fetch");
const mustache = require("mustache-express");
const app = express();

app.engine("mst", mustache());
app.set("view engine", "mst");
app.set("views", __dirname + "/views");

const gethouersAndMinutes = (time) => {
  const date = new Date(time);
  return { h: date.getHours(), m: date.getMinutes() };
};

app.get("/user/:id?", async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .catch((error) => {
        next(error);
      });

    const {
      name,
      address: {
        city,
        geo: { lat, lng },
      },
    } = user;

    const weather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat=${lat}&lon=${lng}`
    )
      .then((res) => res.json())
      .catch((error) => {
        next(error);
      });

    const {
      main: { temp, pressure },
      wind: { speed },
      sys: { sunrise, sunset },
    } = weather;

    const weatherObj = {
      name,
      city,
      temp: (temp - 273.15).toFixed(2),
      pressure,
      windSpeed: speed,
      sunrise: gethouersAndMinutes(sunrise),
      sunset: gethouersAndMinutes(sunset),
    };

    res.render("weather", { ...weatherObj });
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  console.log(error);
  res.render("error", { title: "Weather Error", error: error.message });
});

app.listen(4000, () => {
  console.log("Server start on port 4000\nhttp://localhost:4000/user/2");
});
