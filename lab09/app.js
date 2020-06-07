// zad 1

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// zad 1

const customMiddleware = (req, res, next) => {
    const reqUrl = req.url;
    const reqMethod = req.method;
    // const reqParams = req.query;
    const reqParams = req.params;
    console.log(`show adress: ${reqUrl}, 
                 method: ${reqMethod},
                 params${reqParams ? reqParams : "nothing"}`);
    next();
}
// app.use((req, res, next) => {
//     const reqUrl = req.url;
//     const reqMethod = req.method;
//     // const reqParams = req.query;
//     const reqParams = req.params;
//     console.log(`show adress: ${reqUrl}, 
//                  method: ${reqMethod},
//                  params${reqParams ? reqParams : "nothing"}`);
//     next();
// })

app.use(customMiddleware);

app.get('/:id?',(req, res) => {
    res.send('Pozdrawiam');
});

app.listen(5000, ()=> {
    console.log(`it works`);
})