const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/checkAuth');

const Ad = require('../models/ad.model');
const allowGuest = true;



/**
 * filtrowanie: 
 * 
 * http://localhost:4400/ads?ad=sprzedam%20kredki
 * http://localhost:4400/ads?category=motoryzacja
 * http://localhost:4400/ads?category=szkoła&ad=sprzedam%20kredki
 * 
 */


router.get('/ads/filter/:param/:val', async (req, res) => {
    let { param } = req.params;
    let { val } = req.params;
    let ad = null;
    try{
        switch (param) {
            case ('ad'):
                ad = await Ad.find({ ad: {$regex : new RegExp(val) } }).populate('user');
                res.send(ad);
            break;
            case ('price'):
                ad = await Ad.find({ price: val }).populate('user');
                res.send(ad);              
            break;        
            case ('category'):
                ad = await Ad.find({ category: {$regex : new RegExp(val) } }).populate('user');
                res.send(ad);              
            break;        

            default:
                console.log('nothing found');
        }
    }
    catch{
        return res.status(400).json({
            message: "Bad request",
        });     
    }

});


/**
 * pobieranie wszystkich ogłoszeń z bazy danych
 * 
 * http://localhost:4400/ads/
 * @method GET
 */

router.get('/ads', async (req, res) => {
    const ads = await Ad.find(req.query).populate('user');
    res.send(ads);
});

/**
 * pobieranie konkretnego ogłoszenia
 * 
 * http://localhost:4400/ads/5f0c863b678a722308424bd6
 * @method GET
 */

router.get('/ads/:id', async (req, res) => {
    const { id } = req.params;
    const ad = await Ad.findById(id).populate('user');
    res.send(ad);
});

/**
 * dodawanie nowego ogłoszenia
 * 
 * http://localhost:4400/ads/
 * @method POST
* @body:
    {
        "ad": "sprzedam rower", 
        "category": "rowery", 
        "price": 150
    }
 */
router.post('/ads', checkAuth(allowGuest), async (req, res) => {
    const ad = new Ad({
    ad: req.body.ad,
    category: req.body.category,
    price: req.body.price
    });
    const { loggedUserId } = res.locals;

    if(loggedUserId){
        ad.user = loggedUserId;
    } 
                
    ad.save()
        .then( result => {
            console.log('ad',ad.ad);
                res.status(201).json(result).send();
        })
        .catch(err => {
            console.log(err);
            res.status(406).json({
                message: err.message,
            });
        })
});

/**
 * aktualizacja ogłoszenia
 * 
 * http://localhost:4400/ads/5ef8b375f46bd0205cadc8b5
 * @method PUT
 * @body:
    {
        "price": 150
    }
 */
router.put('/ads/:id', checkAuth(), async (req, res) => {
    const { id } = req.params;
    const { loggedUserId } = res.locals;
    const ad = await Ad.findById(id);

    if (loggedUserId != ad.user._id) {
        return res.status(401).json({
            message: 'Authorization Failed',
    });
    } else {
        await Ad.findByIdAndUpdate(id, req.body).populate('user');
        res.status(202).json('Ad data updated.').send();
    }
});


/**
 * dodawanie kategorii do ogłoszenia
 * 
 * http://localhost:4400/ads/cat/5f0c863b678a722308424bd6
 * @method PUT
 * @body:
    {
        "category": "nowa kategoria"
    }
 */
router.put('/ads/cat/:id', checkAuth(), async (req, res) => {
    const { id } = req.params;
    const { loggedUserId } = res.locals;
    const ad = await Ad.findById(id);

    if (loggedUserId != ad.user._id){
        return res.status(401).json({
            message: 'Authorization Failed',
        });
    } 
    else if (!req.body.category || typeof req.body.category !== 'string') {
        return res.status(406).json({
            message: 'Pass valid category type (String)',
        });       
    }
    else{
        !ad.category.includes(req.body.category) ? ad.category.push(req.body.category) : req.body.category
        await Ad.findByIdAndUpdate(id, ad).populate('user');
        res.send(ad);
    }
});

/**
 * ustuwanie kategorii z ogłoszenia
 * 
 * http://localhost:4400/ads/cat/5f0c863b678a722308424bd6
 * @method DELETE
 * @body:
    {
        "category": "nowa kategoria"
    }
 */
router.delete('/ads/cat/:id', checkAuth(), async (req, res) => {
    const { id } = req.params;
    const { loggedUserId } = res.locals;
    const ad = await Ad.findById(id);

    if (loggedUserId != ad.user._id){
        return res.status(401).json({
            message: 'Authorization Failed',
        });
    } 
    else if (ad.category.length > 1){
        ad.category = ad.category.filter((cat) => !req.body.category.includes(cat));
        await Ad.findByIdAndUpdate(id, ad).populate('user');
        res.status(202).send(ad)
    } else {
        return res.status(406).json({
            message: 'Not accepted operation. At least one category have to remain.',
        });
        
    }
});

/**
 * kasowanie ogłoszenia
 * 
 * http://localhost:4400/ads/5f0c863b678a722308424bd6
 * @method DELETE
 */
router.delete('/ads/:id', checkAuth(), async (req, res) => {
    const { id } = req.params;
    const { loggedUserId } = res.locals;
    const ad = await Ad.findById(id);
    
    try{
        if (loggedUserId != ad.user._id){
            return res.status(401).json({
                message: 'Authorization Failed',
            });
        } 
        else {
            await Ad.findByIdAndDelete(id);
            res.status(202).json(`Ad: ${ad.ad} - deleted`).send();
        }
    } catch (e) {
        if (!ad){
            return res.status(418).json({
                message: "I'am teapot. Ad not exist.",
            });
        } else {
            return res.status(400).json({
                message: "Bad request",
            });            
        }

    }
});

module.exports = router;
