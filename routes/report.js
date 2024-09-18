
   const express = require('express');
   const router = express.Router();
   const reportController = require('../controllers/reportController.js');

   // Define report routes
   router.get('/orders', reportController.getOrderReport);
   router.get('/inventory', reportController.getInventoryReport);
   router.get('/reservations', reportController.getReservationReport);

   module.exports = router;
   
