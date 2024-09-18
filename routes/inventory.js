const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.post('/', inventoryController.createInventoryItem);
router.get('/', inventoryController.getInventoryItems);
router.get('/inventory/:id', inventoryController.getInventoryItemById);
router.put('/inventory/:id', inventoryController.updateInventoryItem);
router.delete('/inventory/:id', inventoryController.deleteInventoryItem);
router.get('/inventory/search', inventoryController.searchInventoryItems);
router.get('/inventory/:id/stock', inventoryController.checkStockLevel);


module.exports = router;
