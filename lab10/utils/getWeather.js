const axios = require('axios');

const getWeather = async (lat, lng) => {
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat=${lat}&lon=${lng}`;
  try {
    const response = await axios.get(weatherURL);
    return response.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = getWeather;
