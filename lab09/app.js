const express = require('express');
const app = express();

const logStuff = (req, res, next) => {
    console.log("Request URL:", req.originalUrl);
    console.log("Request Type:", req.mehod);
    console.log("Log Params:", req.params);

    next();
};

app.use(logStuff);

app.get('/:name?', logStuff, (req, res) => {
    res.send("halo!")
});

app.listen(4100, () => console.log('start server'));