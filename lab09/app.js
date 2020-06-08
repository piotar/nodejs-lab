const fs = require('fs');
const util = require('util');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

const users = [
  {jan: 'alamakota'}
];

const forbid = ['disco polo', 'piwo', 'hazard', 'cukierki'];

app.use(bodyParser.text());

app.use((req, res, next)=>{
  const user = req.headers.authorization;
  const [name, password] = user.split(':');

  const ok = users.find( u => u[name]===password );

  if(ok){
    req.user = name;
    next();
  } else {
    res.sendStatus(401);
  }
})

const pathMiddleware = async (req, res, next) => {
  const path = req.query.path;
  if(fs.existsSync(path)){
    try {
      const text = await readFile('./text.txt', 'utf-8');
      console.log('plik znaleziony');
      res.send(text);
    } catch (e) {
      next(e);
    }
  } else {
    console.log("nie znaleziono pliku");
    next();
  }
}

app.get('/', pathMiddleware, async (req, res, next)=>{
  try {
    const text = await readFile('./text.txt', 'utf-8');
    res.send(text);
  } catch (e) {
    next(e);
  }

})

app.get('/:id', (req, res)=>{
  res.send(req.params);
})

app.post('/', async (req, res, next)=>{
  const text = req.body;
  let ok = true;

  forbid.map( w => text.includes(w) && (ok = false) );

  if(ok){
    try {
      await writeFile('text.txt', text);
      res.send("Zapisano do pliku");
    } catch (e) {
      next(e);
    }
  } else {
    res.status(400).send('Forbidden word!');
  }
})

app.use((err, req, res) => {
  res.status(500).send('Something broke!');
})

app.listen(4500, () => console.log('Server started'));