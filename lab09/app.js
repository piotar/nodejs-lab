//1 
// const express = require('express');
// const app = express();

// const middleware = (req, res, next) => {
//     console.log("URL:",req.url);
//     console.log("METHOD:",req.method);
//     console.log("PARAMS:",req.params)

//     next();
// };

// app.use(middleware);

// app.get('/', (req, res) => {
    
// });

// app.listen(4000, () => console.log('start server'));


//2 - authorization
const express = require('express');
const app = express();

const checkAuth = (req, res, next) => {
    if(req.headers.authorization==="alamakota"){
        console.log(req.headers.authorization)
        next();
    }else{
        res.status(401).send("unauthorized user")
    }
};
app.use(checkAuth);

app.get('/', checkAuth, (req, res) => {
    res.send("halo")
});

app.listen(4000, () => console.log('start server'));