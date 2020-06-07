const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const fs = require('fs');

const users = [
    {
        login: 'Daniel',
        password: 'mojehaslo'
    },
    {
        login: 'Olek',
        password: 'innehaslo'
    }
]

const customMiddleware = (req, res, next) => {
    console.log(`Address: ${req.url}, Method: ${req.method}`);
    console.log(req.query, req.params);

    next();
};

// zad 2. Autoryzacja dostepu do tresci w postman w headerze key = Authorization oraz value = alamakota
// app.use((req, res, next) => {
//     const password = req.headers.authorization;
//     if(password === 'alamakota'){
//       next();
//     } else {
//       res.sendStatus(401);
//     }
// })

// zad 3.
const authMiddleware = (req, res, next) => {
    
console.log(req.headers);

    const [login, password] = (req.headers.authorization || '').split(":");
  
    console.log(login, password);
  
    let user = users.find((u) => u.login === login);
  
    if (user && user.password === password) {
      req.user = user;
      next();
    } else {
      res.sendStatus(401);
    }
  };

// app.use(authMiddleware);
// app.use(customMiddleware);

app.use(bodyParser.text());

const forbiddenWords = ['disco polo', 'piwo', 'hazard', 'cukierki'];

app.get('/:id?', /* customMiddleware ,*/ (req, res) => {
    console.log(req.body);

    const hasForbiddenWord = forbiddenWords.some(word => req.body.includes(word));
    if (hasForbiddenWord) {
        res.status(400).send('zakazane słowo');
    } else {
        fs.writeFile('zapis.txt', req.body, (err) => {
            return err ? err.message : console.log('zapisano');
        })
        res.send("masz dostęp!");
    }
});

app.get('/', (req, res) => {
    fs.readFile('./zapis.txt', 'utf-8', (err, data) => {
        res.send(data);
    })
})

app.listen(4000, () => console.log('start server'));