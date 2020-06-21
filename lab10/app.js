//1 ----------------------------------

// const express = require('express');
// const app = express();

// app.set('view engine', 'pug')
//     app.get('/:name?', function (req, res) {
//         const {name = "world"} = req.params;
        
//         const message = "hello"+name;
       
//         res.render("index", {title: "hello", message: message});
//     });
    

// app.listen(4000, () => console.log('start server'));

//2--------------------------
const express = require('express');
const app = express();
var mustacheExpress = require('mustache-express');


// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache')
    app.get('/podatek/:tax?/:price?', function (req, res) {
        const { tax=19, price} = req.params;
        const tax1=tax/100;
        const ammount = (tax1*price);
       const afterTax = price-ammount;
        res.render("index", {ammount:ammount,afterTax:afterTax, tax: tax, price: price});
    });
    

app.listen(4000, () => console.log('start server'));