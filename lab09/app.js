const express = require('express');
const app = express();

// app.use((req, res, next)=>{
//   console.log(req.url);
//   console.log(req.params);
//   console.log(req.query);
//   console.log(req.method);
//   next();
// })

app.use((req, res, next)=>{
  const password = req.headers.authorization;
  if(password==='alamakota'){
    next();
  } else {
    res.sendStatus(401);
  }
  
})

app.get('/', (req, res)=>{
  res.sendStatus(200);
})

app.get('/:id', (req, res)=>{

  res.send(req.params);
})

app.post('/', (req, res)=>{
  res.sendStatus(200);
})

app.listen(4500, ()=> console.log('Server started'))