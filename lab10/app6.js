//Kolejnym zadaniem jest stworzenie aplikacji pozwalającej na jednocześnie
//pobranie danych użytkownika oraz pogody. Pamiętajmy o obsłudze błędów zewnętrznych API.

const express = require('express');
const app = express();
const axios = require('axios');

const mustacheExpress = require('mustache-express');
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.get("/user/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const userUrl = `https://jsonplaceholder.typicode.com/users/${id}`
        const userInfo = await axios.get(userUrl);
        const userData = userInfo.data;
        const userName = `${userInfo.data.name}`
        const { lat } = userData.address.geo;
        const { lng } = userData.address.geo;
        // console.log(userData);
        const userWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat=${lat}&lon=${lng}`;
        const userWeatherInfo = await axios.get(userWeatherUrl);
        const userWeatherData = userWeatherInfo.data;
        // console.log(userWeatherData);
        // console.log(userWeatherData.weather.description)
        res.render('index6', {
            name: userName,
            main: userWeatherData.weather[0].description,
            temperature: userWeatherData.main.temp
        })
    } catch (error) {
        next(error)
    }
});

app.use((error, req, res, next) => {
    console.log(error.message);
    res.send(error.message);


})

app.listen(4000, () => { console.log("Server started") });