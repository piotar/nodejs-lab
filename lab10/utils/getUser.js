const axios = require('axios');

const getUser = async (id) => {
  const userURL = `https://jsonplaceholder.typicode.com/users/${id}`;
  try {
    const response = await axios.get(userURL);
    return response.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = getUser;
