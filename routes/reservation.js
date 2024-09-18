const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.post('/', reservationController.createReservation);
router.get('/', reservationController.getReservations);
router.get('/reservations/:id', reservationController.getReservationById);
router.put('/reservations/:id', reservationController.updateReservation);
router.delete('/reservations/:id', reservationController.deleteReservation);
router.get('/reservations/search', reservationController.searchReservations);
router.get('/reservations/date/:date', reservationController.getReservationsByDate);
router.get('/reservations/status/:status', reservationController.getReservationsByStatus);

// more routes ...

module.exports = router;
