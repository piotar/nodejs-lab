const express = require('express');
const app = express();

const customMiddleware = (req, res, next) => {
    // some logic ...
    next();
};

app.use(customMiddleware);

app.get('/', (req, res) => {
    // ...
});

app.listen(4000, () => console.log('start server'));