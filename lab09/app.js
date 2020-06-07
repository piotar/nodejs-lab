const express = require('express');
const app = express();
//1

// const customMiddleware = (req, res, next) => {
//     // console.log(`Address: ${req.url}, Method:${req.method}`)
//     // console.log(req.query, req.params)                 // some logic ...
//     // next();
//     console.log("Request URL:", req.originalUrl);
//     console.log("Request Type", req.method);
//     console.log("Log Params", req.params);
//     next();
// };


// app.use(customMiddleware);

// app.get('/', (req, res) => {
//     res.send("hello!");
// });


//2

// app.use((req, res, next) => {
//     const password = req.headers.authorization;
//     if (password != 'alamakota') {
//         next();
//     } else {
//         res.sendStatus(401);
//     }

// })

//3

const users = [{
    login: "admin",
    password: "1234",
    name: "jas",
    lastName: "nowak"
},
{
    login: "admin2",
    password: "01234",
    name: "Adam",
    lastName: "Mowak"
}];

const authMiddleware = (req, res, next) => {
    const [login, password] = req.headers.authorization || "".split(":");

    const user = users.find(log => log.login === login && log.password === password)
    if (user) {
        req.user = user;
        next();
    } else {
        // users.push({ login: login, password: password })
        res.sendStatus(401);
    };
};

app.use(authMiddleware);

app.get("/", (req, res) => {
    res.send(`hello ${req.user.name}!`);
});



app.listen(4000, () => console.log('start server'));

//4