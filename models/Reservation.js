const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dateTime: { type: Date, required: true },
    partySize: { type: Number, required: true },
    
    contactInfo: { type: String }
});

module.exports = mongoose.model('Reservation', ReservationSchema);



