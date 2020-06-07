const express = require('express');
const app = express();

const showInfo = (req, res, next) => {
  console.log('Params: ', req.params);
  console.log('Method: ', req.method);
  console.log('Host: ', req.headers.host);

  next();
};

app.use(showInfo);

app.get('/', (req, res) => {
  res.send('Hello it works');
});

app.listen(4700, () => {
  console.log('Server listen at port 4700');
});
