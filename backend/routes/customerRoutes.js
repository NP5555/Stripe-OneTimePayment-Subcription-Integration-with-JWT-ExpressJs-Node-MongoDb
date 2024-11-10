const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/get-all-customers', customerController.getAllCustomers);
router.get('/customers', customerController.getCustomersWithPlans);

module.exports = router;
