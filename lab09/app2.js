// 2. Kolejnym zadaniem jest stworzenie middleware, który zabezpieczy naszą aplikację dla osób nie upoważnionych.
// Użytkownik powinien wysłać w nagłówku token, który autoryzuje go i wpuszcza do dalszej części aplikacji.
// Przyjmijmy że nazwa nagłówka to authorization, a wartość która wpuszcza nas do systemu to alamakota.
const express = require('express');
const app = express();

const logStuff = (req, res, next) => {
    const password = req.headers.authorization
    if (password === "alamakota") {
        next();
    } else {
        res.sendStatus(401);
    }
};

app.use(logStuff);

app.get('/', logStuff, (req, res) => {
    res.send("halo!")
});


app.listen(4200, () => console.log('start server'));