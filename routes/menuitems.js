const express = require('express');
const router = express.Router();
const menuItemController = require('../controllers/menuItemController');

router.post('/', menuItemController.createMenuItem);
router.get('/', menuItemController.getMenuItems);
router.get('/menu/:id', menuItemController.getMenuItemById);
router.put('/menu/:id', menuItemController.updateMenuItem);
router.delete('/menu/:id', menuItemController.deleteMenuItem);
router.get('/menu/search', menuItemController.searchMenuItems);
router.get('/menu/category/:category', menuItemController.getMenuItemsByCategory);

// Add more routes as needed...

module.exports = router;
