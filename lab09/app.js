const express = require('express');
const app = express();

const middleware = (req, res, next) => {
    console.log("URL:",req.url);
    console.log("METHOD:",req.method);
    console.log("PARAMS:",req.params)

    next();
};

app.use(middleware);

app.get('/', (req, res) => {
    
});

app.listen(4000, () => console.log('start server'));