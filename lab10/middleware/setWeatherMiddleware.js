const getWeather = require('../utils/getWeather');

const setWeatherMiddleware = async (req, res, next) => {
  const { user } = req;
  const { lat, lng } = user.address.geo;

  try {
    const weather = await getWeather(lat, lng);
    if (weather) {
      req.user.weather = weather;
      next();
    }
  } catch (e) {
    next(e);
  }
};

module.exports = setWeatherMiddleware;
