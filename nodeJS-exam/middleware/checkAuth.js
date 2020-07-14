// middleware do autoryzacji oraz przekazanie użytkownika dalej
// wysyłany header: Authorization: basic admin:alamakota123
// jeżeli w nagłówkach został podany login i hasło pobierzmy dane użytkownika i dodajmy do zmiennej 'req' użytkownika z bazy

const User = require('../models/user.model');
const bcrypt = require('bcrypt');

module.exports = function checkAuth(allowGuest) {

    return async (req, res, next) => {
        const rha = req.headers.authorization;

        if ((!rha || !(rha.search('Basic ') === 0)) && allowGuest){
            res.status(200);
            console.log('Guest');
            next();       
        } else if ((!rha || !(rha.search('Basic ') === 0)) && !allowGuest){
            return res.status(401).json({
                message: 'Authorization Failed',
            });            
        }
        else {
            const authorization = (rha || '').split(' ')[1];
            const [userName, pass] = authorization.split(':');

            await User.findOne({username: userName})
            .select('password')
            .exec(async function (err, user) {
                try{
                    if (authorization) {      
                            const id = String(user._id);

                            if (await bcrypt.compare(pass, user.password)){
                                res.status(200);
                                console.log('Authorization Sucessful');
                                res.locals.loggedUserId = id;
                                next(); 
                            }
                            else {
                                return res.status(401).json({
                                    message: 'Authorization Failed',
                                });
                            }
                        }
                    }
                catch{
                    return res.status(401).json({
                        message: 'Authorization Failed',
                    });
                } 
            })
        }
    }
};

