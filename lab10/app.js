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
// const express = require('express');
// const app = express();
// var mustacheExpress = require('mustache-express');


// // Register '.mustache' extension with The Mustache Express
// app.engine('mustache', mustacheExpress());
// app.set('view engine', 'mustache')
//     app.get('/podatek/:tax?/:price?', function (req, res) {
//         const { tax=19, price} = req.params;
//         const tax1=tax/100;
//         const ammount = (tax1*price);
//        const afterTax = price-ammount;
//         res.render("index", {ammount:ammount,afterTax:afterTax, tax: tax, price: price});
//     });
    

// app.listen(4000, () => console.log('start server'));

//3------------------------------------
// const express = require('express');
// const app = express();
// var mustacheExpress = require('mustache-express');

// const checkDivision = (req,res, next) =>{
//     if(parseInt(req.params.number2)===0){
//         res.status(404).send("Wrong number, can't divide by 0")
//     }else{
//         next();
//     }
// }
// const divide = (a,b) =>{
//     return a/b;
// }
// // Register '.mustache' extension with The Mustache Express
// app.engine('mustache', mustacheExpress());
// app.set('view engine', 'mustache')
//     app.get('/:number1?/:number2?', checkDivision,  function (req, res) {
//         const {number1, number2} = req.params;
//         console.log(typeof number1, typeof number2)
//         const result = divide(parseInt(number1), parseInt(number2));
//         res.render("divide", {number1, number2, result:result.toString()});
//     });
    

// app.listen(4000, () => console.log('start server'));

//4 i 5-------------------------------------------------------
// const express = require('express');
// const app = express();
// const fs = require("fs");
// const util = require('util');
// const readFileAsync = util.promisify(fs.readFile);
// var mustacheExpress = require('mustache-express');


// // Register '.mustache' extension with The Mustache Express
// app.engine('mustache', mustacheExpress());
// app.set('view engine', 'mustache');


//     app.get('/:name',  async function (req, res, next) {
//         try{
//             const {name} = req.params;
//             const result = await readFileAsync("./static/"+name);
         
//                 res.send(result);
            
//         }catch(error){
//             next(error)
//         }
        
//     });
    
//     app.use((error, req, res, next) => {
//         res.render("error", {error})
//     });
    

// app.listen(4000, () => console.log('start server'));

//6----------------------------------------------------------------------
const express = require('express');
const app = express();
const fs = require("fs");
const axios = require("axios");

var mustacheExpress = require('mustache-express');


// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

    const exceptionHandler = fn => {
        return async (req, res, next, ...args) => {
            try {
                await fn(req, res, next, ...args);
            } catch (error) {
                next(error);
            }
        }
    }

    const  fetchUser = async (id) =>{
        const userResult = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        return userResult.data;
    }

  const fetchWeather = async (geo) =>{
        const {lat, lng} = geo;
        const weatherResult = await axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat=${parseInt(lat)}&lon=${parseInt(lng)}`);
        return weatherResult.data.main;
    }

    app.get('/user/:id', exceptionHandler( async (req, res, next) => {
        const user = await fetchUser(req.params.id)
        let weatherResponse = await fetchWeather(user.address.geo);
        let {temp} = weatherResponse;
        temp = parseFloat(temp-273.15).toFixed(2);
        res.render("user", {user:user, weather: weatherResponse, temp:temp});
    }));
    
    app.use((error, req, res, next) => {
        res.render("error", {error})
    });
    

app.listen(4000, () => console.log('start server'));