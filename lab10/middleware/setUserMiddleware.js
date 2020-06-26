const getUser = require('../utils/getUser');

const setUserMiddleware = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await getUser(id);

    if (user) {
      req.user = user;
      next();
    }
  } catch (e) {
    next(e);
  }
};

module.exports = setUserMiddleware;
