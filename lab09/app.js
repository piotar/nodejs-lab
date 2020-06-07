const express = require("express");
const app = express();

//// ZADANIE 1

const customMiddleware = (req, res, next) => {
    console.log(
        `Address: ${req.url}, Method: ${req.method}`
    );
    console.log(req.query, req.params);

    next();
};

app.use(customMiddleware);

app.get("/:id?", (req, res) => {
    res.send("ok");
});

app.listen(3000, () => console.log("start server"));