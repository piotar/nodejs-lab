const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const fs = require("fs");
const axios = require("axios");

// app.set("views", "./views");
// app.set("view engine", "pug");

// app.get("/:name?", (req, res) => {
//   const { name = "world" } = req.params;

//   res.render("index", { message: `Hello ${name}` });
// });

// app.engine("mustache", mustacheExpress());

// app.set("view engine", "mustache");
// app.set("views", __dirname + "/views");

// app.get("/:tax/:price", (req, res) => {
//   const { price, tax } = req.params;
//   const taxation = (tax * price) / 100;
//   const taxFree = price - taxation;

//   const data = {
//     price,
//     tax,
//     taxation,
//     taxFree,
//   };
//   res.render("index", data);
// });

// app.get("/:a/:b", (req, res) => {
//   const { a, b } = req.params;
//   if (Number(b) === 0) {
//     throw new Error("dzielenie przez 0");
//   } else {
//     res.send((a / b).toString());
//   }
// });

// app.use((e, req, res) => {
//   console.log(e.message);
//   res.status(500).send(e.message);
// });

// app.engine("mustache", mustacheExpress());

// app.set("view engine", "mustache");
// app.set("views", __dirname + "/views");

// app.get("/:fileName", (req, res, next) => {
//   const { fileName } = req.params;
//   fs.readFile(`./static/${fileName}`, "utf-8", (error, data) =>
//     error ? next(error) : res.send(data)
//   );
// });

// app.use((error, req, res, next) => res.render("index", { error }));

const getUser = async (userId) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  return response.data;
};

const getWeather = async (lat, lng) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat=${lat}&lon=${lng}`
  );
  return response.data;
};

app.get("/user/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await getUser(userId);
    const { lat, lng } = user.address.geo;
    const weather = await getWeather(lat, lng);

    const result = {
      name: user.name,
      email: user.email,
      weather: {
        temp: weather.main.temp,
        windSpeed: weather.wind.speed,
      },
    };

    res.send(result);
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  console.log("error message", error.message);
  throw error;
});

app.listen(4700, () => console.log("start"));
