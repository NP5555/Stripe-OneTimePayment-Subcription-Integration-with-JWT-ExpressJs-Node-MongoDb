const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.get('/prices', productController.getProductPrices);
router.post('/create-checkout-session', productController.createCheckoutSession);
router.post('/create-one-time-checkout', productController.createOneTimeCheckoutSession);
module.exports = router;