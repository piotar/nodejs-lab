// 3. Zmodyfikujmy zadanie 2 tak aby nagłówek authorization składał się z użytkownika
// i hasła (wzór: login:password, np. jan:alamakota)
// oraz sprawdżmy czy w systemie jest taki użytkownik z takim hasłem.
// Jeżeli użytkownik istnieje, powinniśmy zmodyfikować request, aby przekazać znalezionego użytkownika dalej.

const express = require("express");
const app = express();

const users = [
    { login: "jan", password: "alamakota", name: "Jan", lastName: "Nowak" },
    { login: "adam", password: "cukierki", name: "Adam", lastName: "Mickiewicz" },
];

const logStuff = (req, res, next) => {
    console.log(req.headers.authorization);

    const [login, password] = req.headers.authorization.split(':');

    const user = users.find(u => u.login === login && u.password === password);

    if (user) {
        req.user = user;
        next();
    } else {
        res.sendStatus(401);
    }
};

app.use(logStuff);

app.get('/', (req, res) => {
    res.send(`Halo ${req.user.name}!`);
});


app.listen(4400, () => console.log('start server'));