const express = require('express');
const router = express.Router();
const controller = require('../controllers/inventoryController');

router.post('/products', controller.addProduct);
router.post('/movement', controller.recordMovement);
router.get('/stock/:product_id', controller.getCurrentStock);

module.exports = router;
