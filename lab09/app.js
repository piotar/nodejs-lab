const express = require("express");
const app = express();

//// ZADANIE 1

// const customMiddleware = (req, res, next) => {
//     console.log(
//         `Address: ${req.url}, Method: ${req.method}`
//     );
//     console.log(req.query, req.params);

//     next();
// };

// app.use(customMiddleware);

// app.get("/:id?", (req, res) => {
//     res.send("ok");
// });

// app.listen(3000, () => console.log("start server"));

//// ZADANIE 2

// const authorizationMiddleware = (req, res, next) => {
//     req.headers.authorization === "alamakota" ? next() : res.sendStatus(401)
// }

// app.use(authorizationMiddleware);

// app.get("/", (req, res) => {
//     res.send("ok, let's go")
// })

// app.listen(3000);

//// ZADANIE 3

const users = [{
    login: "ja",
    password: "ja"
}];

const authorizationMiddleware = (req, res, next) => {
    const [login, password] = req.headers.authorization.split(":");
    const user = users.find(log => log.login === login)
    if (user) {
        console.log(user);
        res.send(users)
    } else {
        users.push({ login: login, password: password })
        res.sendStatus(401);
    };
};

app.use(authorizationMiddleware);

app.get("/", (req, res) => {
    res.send("ok, let's go");
});

app.listen(3000);