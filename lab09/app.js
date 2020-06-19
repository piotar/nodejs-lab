//1 
// const express = require('express');
// const app = express();

// const middleware = (req, res, next) => {
//     console.log("URL:",req.url);
//     console.log("METHOD:",req.method);
//     console.log("PARAMS:",req.params)

//     next();
// };

// app.use(middleware);

// app.get('/', (req, res) => {
    
// });

// app.listen(4000, () => console.log('start server'));


//2 - authorization
// const express = require('express');
// const app = express();

// const users = [{
//     login: "jan",
//     password: "alamakota"
// },
// {
//     login: "ania",
//     password: "alaniemakota"
// }
// ];
// const checkAuth = (req, res, next) => {
//     if(req.headers.authorization){
//         let [name, password] = req.headers.authorization.split(":");
//         users.map((user)=>{
//             if(name===user.login && password===name){
//                 res.status(200).send("welcome!");
//                 next();
//             }else{
//                 res.status(401).send("password incorrect")
//             }
            
//         })
        
        
//     }else{
//         res.status(401).send("unauthorized user")
//     }
// };
// app.use(checkAuth);

// app.get('/', checkAuth, (req, res) => {
//     res.send("halo")
// });

// app.listen(4000, () => console.log('start server'));


//3------------
// const express = require("express");
// const app = express();

// const users = [
//   { login: "jan", password: "alamakota" },
//   { login: "adam", password: "kotmaale" },
// ];

// const logMiddleware = (req, res, next) => {
//   console.log("Url:", req.url);
//   console.log("Query params", req.query);
//   console.log("Params:", req.params);
//   console.log("Method", req.method);
//   next();
// };

// const authMiddleware = (req, res, next) => {
//   const [login, password] = req.headers.authorization.split(":");

//   console.log(login, password);

//   let user = users.find((u) => u.login === login);

//   if (user && user.password === password) {
//     req.user = user;
//     next();
//   } else {
//     res.sendStatus(401);
//   }
// };

// app.use(logMiddleware);
// app.use(authMiddleware);

// app.get("/", (req, res) => {
//   res.sendStatus(200);
// });

// app.listen(4000, () => console.log("start server"));

//4----------------------------------------------------------------
// const express = require("express");
// const bodyParser = require("body-parser");
// const fs = require("fs");
// const app = express();

// app.use(bodyParser.text());
// const forbidden = ['disco polo', 'piwo', 'hazard', 'cukierki'];


// app.post("/", (req, res) => {
//     if(forbidden.some(word=>req.body.includes(word))){
//         res.status(400).send("niewłaściwe dane");
//     }else{
//         res.send("hej");
//     }
// });

// app.post("/setText", (req, res) => {
//             fs.writeFile("body.txt", req.body, (err)=>{
//                 if(err){
//                     console.log(err)
//                     res.status(404).send(err);
//                 }
//                 else{
//                     res.send("zapisano do pliku");
//                 }
//             });
    
// });

// app.get("/getText", async (req, res)=>{    
//         fs.readFile("body.txt","utf-8", (err, data)=>{
//             if(err){
//                 res.status(404).send(err.message);
//             }else{
//                 res.send(data);
//             }
//         })
        
    
// })

// app.listen(4000, () => console.log("start server"));

//5-----------------------------------------------------------------------
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs  =require("fs");

app.use(bodyParser.text());
app.post("/setText", (req, res) => {
                fs.writeFile("body.txt", req.body, (err)=>{
                    if(err){
                        console.log(err)
                        res.status(404).send(err);
                    }
                    else{
                        res.send("zapisano do pliku");
                    }
                });
        
    });
    
const checkThePath = (req, res, next) =>{
    let path = req.params.path;
    console.log(path)
    fs.readFile(path, "utf-8", (err, data)=>{
        if(err){
            res.status(404).send(err.message)
        }else{
            res.send(data)
            next();
        }
    })
}

app.get("/", (req, res)=>{
    res.send("Hello");
})
app.get("/:path", checkThePath, (req, res)=>{
})

app.listen(4000, () => console.log("start server"));
