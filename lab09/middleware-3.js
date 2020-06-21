const express = require("express");
const app = express();
const users = [{
  user: 'Jan',
  password: 'Dzban'
},
{
    user: 'jan',
    password: 'alamakota'
  
  }];

const logMiddleware = (req, res, next) => {
  console.log(req.method, req.url, req.params, req.query);
  next();
};

app.use(logMiddleware);

const authorizationMiddleware = (req, res, next) => {
  const [login, password] = req.headers.authorization.split(":");
  console.log(login, password);

  let user = users.find((u) =>u.login === login);

    if(user && user.password === password){
        next();
    }else {
        res.status(401).send("Authorization error");
    }
  };

app.get("/", authorizationMiddleware, (req, res) => {
  console.log(req.user);
  res.send("halo");
});

app.get("/halo", authorizationMiddleware, (req, res) => {
  console.log(req.user);
  res.send("halo2");
});

app.listen(4000, () => console.log("start server"));
