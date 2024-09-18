


const Reservation = require('../models/Reservation');

exports.createReservation = async (req, res) => {
    try {
        const reservation = new Reservation(req.body);
        await reservation.save();
        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json(reservations); // Fixed variable name to reservations
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Retrieve a specific reservation by ID
exports.getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        res.status(200).json(reservation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an existing reservation
exports.updateReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        res.status(200).json(reservation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a reservation
exports.deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        res.status(204).send(); // No content to send back
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Search/Filter reservations
exports.searchReservations = async (req, res) => {
    try {
        const { query } = req.query; // Assuming query is passed as a query parameter
        const reservations = await Reservation.find({
            $or: [
                { guestName: { $regex: query, $options: 'i' } }, // Case-insensitive search by guest name
                { status: { $regex: query, $options: 'i' } } // Case-insensitive search by status
            ]
        });
        res.status(200).json(reservations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get reservations by date
exports.getReservationsByDate = async (req, res) => {
    try {
        const { date } = req.params; // Expecting date in YYYY-MM-DD format
        const reservations = await Reservation.find({ reservationDate: date });
        if (reservations.length === 0) {
            return res.status(404).json({ error: 'No reservations found for this date' });
        }
        res.status(200).json(reservations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get reservations by status
exports.getReservationsByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const reservations = await Reservation.find({ status });
        if (reservations.length === 0) {
            return res.status(404).json({ error: 'No reservations found with this status' });
        }
        res.status(200).json(reservations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

