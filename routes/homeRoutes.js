const router = require('express').Router();
const { postPrice, postCompanies } = require('../controllers/homeController')

router.post('/price', postPrice);

router.post('/companies', postCompanies);

module.exports = router;