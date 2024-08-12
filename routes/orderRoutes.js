//orderRoutes.js

const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')
const auth = require('../middlewares/auth')
const orderController = require('../controllers/orderController');


router.post('/', auth,orderController.createOrder);


module.exports = router;