// 1.	Stwórzmy nasz pierwszą aplikację serwerową wykorzystującą system szablonów PUG. Obsłużmy ścieżki takie jak:
// '/' - wyświetli przywitanie 'hello world!' jako nagłówek ('h1')
// '/Jan' - wyświetli przywitanie 'hello Jan!' jako nagłówek ('h1')
// '/Adam' - wyświetli przywitanie 'hello Adam!' jako nagłówek ('h1')
// ...


const express = require('express');
const app = express();

app.set('views', './views');
app.set('view engine', 'pug');

// app.get('/', (req, res) => {
//   res.render('index', { message: 'Hello world' });
// });

app.get('/:name?', (req, res) => {
  const { name = 'world' } = req.params;
  res.render('index', { message: `Hello ${name}` });
});

app.listen(4100, () => console.log('Server listen at port: 4700'));