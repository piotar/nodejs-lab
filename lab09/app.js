// zad 1

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// zad 1
app.use((req, res, next) => {
    const reqUrl = req.url;
    const reqMethod = req.method;
    const reqParams = req.query;
    console.log(`show adress: ${reqUrl}, method: ${reqMethod} params${reqParams}`);
    next();
})

app.get('/id?', (req, res, next) => {
    res.send('Pozdrawiam');
});

app.listen(5000, ()=> {
    console.log(`it works`);
})