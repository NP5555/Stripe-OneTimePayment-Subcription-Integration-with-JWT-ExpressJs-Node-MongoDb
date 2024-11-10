const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/products', productController.getAllProducts);
router.get('/prices', productController.getProductPrices);
router.post('/create-checkout-session', productController.createCheckoutSession);
router.post('/create-one-time-checkout', productController.createOneTimeCheckoutSession);
router.get('/active-subscription', authenticateToken, productController.getActiveSubscription);
module.exports = router;