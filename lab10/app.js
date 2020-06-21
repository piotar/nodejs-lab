// const express = require("express");
// const app = express();

// var mustacheExpress = require("mustache-express");

// app.engine("mustache", mustacheExpress());

// app.set("view engine", "mustache");
// app.set("views", __dirname + "/views");

// const calculateTax = (tax, amount) => {
//     const resoult = (tax * amount) / 100;
//     return { tax: resoult, amount: amount - resoult };
// };

// app.get("/podatek/:tax/:amount", function (req, res) {
//     const { tax, amount } = req.params;

//     res.render("index", {
//         tax,
//         amount,
//         resoult: calculateTax(tax, amount),
//     });
// });

const express = require('express');
const app = express();

app.get('/:a/:b', (req, res, next) => {
    try {
        const { a, b } = req.params;
        if (Number(b) === 0) {
            throw new Error('No koniec swiata...');
        } else {
            res.send((a / b).toString());
        }
    }
    catch (e) {
        next(e);
    }
});

app.use((e, req, res, next) => {
    console.log(e.message)
    res.status(500).send(e.message);
});

app.listen(4000, () => console.log('start server'));