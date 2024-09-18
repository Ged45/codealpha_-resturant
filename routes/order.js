const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController.js');

router.post('/', orderController.createOrder);
router.get('/', orderController.getOrders);
router.get('/orders/:id', orderController.getOrderById);
router.put('/orders/:id', orderController.updateOrder);
router.delete('/orders/:id', orderController.deleteOrder);

// Add more routes as needed...

module.exports = router;
