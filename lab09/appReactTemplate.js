const express = require('express');
const app = express();
const reactViews = require('express-react-views');

app.set('view engine', 'jsx')
app.engine('jsx', reactViews.createEngine());

app.get('/', function (req, res) {
    const scope = { name: 'Karolina' };
    res.render('index', scope);
});

app.listen(4500, ()=> console.log('server started'));