const express = require('express');
const app = express();

const customMiddleware = (req, res, next) => {
    console.log(`Address: ${req.url}, Method: ${req.method}`);
    console.log(req.query, req.params);

    next();
};

// zad 2. Autoryzacja dostepu do tresci w postman w headerze key = Authorization oraz value = alamakota
app.use((req, res, next)=>{
    const password = req.headers.authorization;
    if(password === 'alamakota'){
      next();
    } else {
      res.sendStatus(401);
    }
})

app.use(customMiddleware);

app.get('/:id?', /* customMiddleware ,*/ (req, res) => {
    res.send("masz dostęp!");
});

app.listen(4000, () => console.log('start server'));