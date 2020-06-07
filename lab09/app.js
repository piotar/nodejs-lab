// zad 1

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// ------------------------ zad 1

// const customMiddleware = (req, res, next) => {
//     const reqUrl = req.url;
//     const reqMethod = req.method;
//     // const reqParams = req.query;
//     const reqParams = req.params;
//     console.log(`show adress: ${reqUrl}, 
//                  method: ${reqMethod},
//                  params${reqParams ? reqParams : "nothing"}`);
//     next();
// }
//app.use(customMiddleware);
// app.get('/:id?',(req, res) => {
//     res.send('Pozdrawiam');
// });


// ---------------- zad 2


// const authorizationMiddleware = (req, res, next) => {
//     if(req.headers.authorization === "alamakota") {
//        res.send('Dostęp potwierdzony');
//     } else {
//         res.sendStatus(401);
//     }
// }
// app.use(authorizationMiddleware);

// app.get('/',(req, res) => {
//     res.send('działa');
// });
// app.listen(5000, ()=> {
//     console.log(`it works`);
// })

// ---------------- zad 3

const users = [
    {name: 'jan',
     password: 'alamakota'}
]

const authorizationMiddleware = (req, res, next) => {
    if(!req.headers.authorization) {
       res.sendStatus(401);
    } else {
        const [name, password] = req.headers.authorization.split(":");
        const user = users.find(user => user.name === name);
        user ? res.send(user) : res.sendStatus(404);
    }
}
app.use(authorizationMiddleware);

app.get('/',(req, res) => {
    res.send('działa');
});
app.listen(5000, ()=> {
    console.log(`it works`);
})