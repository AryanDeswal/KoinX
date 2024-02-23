const router = require('express').Router();
const { postPrice } = require('../controllers/homeController')

router.post('/price', postPrice);

module.exports = router;