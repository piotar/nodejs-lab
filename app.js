const express = require('express');
const app = express();

const logStuff = (req, res, next) => {
    console.log("Request URL:", req.originalUrl);
    console.log("Request Type:", req.method);
    console.log("Log Params:", req.params);
    next();
}


app.use(logStuff);

app.get('/:name?', logStuff, function (req, res) {
    res.send('halo')
});

app.listen(4000, () => console.log('start server'));