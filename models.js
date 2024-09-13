const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
    patientName: String,
    doctorName: String,
    consultationDate: Date,
    prescription: [String]
});

const Consultation = mongoose.model('Consultation', consultationSchema);

module.exports = { Consultation };
