const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/checkAuth');

const Ad = require('../models/ad.model');
const User = require('../models/user.model');

const bcrypt = require('bcrypt');

/** ONLY FOR TEST
 * pobieranie listy wszystkich użytkowników
 * ONLY FOR TEST
 * http://localhost:4400/users
 * @method GET
 */

router.get('/users', async (req, res) => {
    const user = await User.find(req.query).populate('users');
    res.send(user);
});




/**
 * pobieranie listy zadan konkretnego użytkownika
 * 
 * http://localhost:4400/users/5ef8b375f46bd0205cadc8b5
 * @method GET

 */
router.get('/users/:id', checkAuth(), async (req, res) => {
    const { id } = req.params;
    const user = await Ad.find({user: id}).populate('user');

    const { loggedUserId } = res.locals;

    if (loggedUserId != id){
        return res.status(401).json({
            message: 'Authorization Failed',
        });
    } else {
        res.send(user);
    }

});



/**
 * 
 * http://localhost:4400/users
 * @method POST
 * @body:
    {
        "username": "admin",
        "password": "alamakota123",
        "firstName": "Jan",
        "lastName": "Kowalski"
    }
 */
router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(req.body.password, salt);
    }
    catch (e) {
            res.status(406).json({
            message: 'Password is required',
        });
    }
    
    await User.find({ username: user.username })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "User exists"
                });
            }
        })
    user.save()              
        .then( async() => {
            res.status(201).json({
            message: `User created id: ${user.id}`
            });
        })
        .catch(err => {
            console.log(err);
            res.status(406).json({
                message: err.message,
            });
        });
});

module.exports = router;
