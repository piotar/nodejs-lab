const express = require('express');
const app = express();

const customMiddleware = (req, res, next) => {
    console.log(`Address: ${req.url}, Method: ${req.method}`);
    console.log(req.query, req.params);

    next();
};

app.use(customMiddleware);

app.get('/:id?', /* customMiddleware ,*/ (req, res) => {
    res.send("hej hej");
});

app.listen(4000, () => console.log('start server'));