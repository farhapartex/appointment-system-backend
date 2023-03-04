const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentPlaceSchema = new Schema({
    name: {
        type: String,
        required: true,
    }
});

const weeklyAppointmentSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AppointmentPlace',
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    }
});

const appointmentSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    serialNumber: {
        type: Number,
        required: true
    }
});

module.exports = {
    AppointmentPlace: mongoose.model('AppointmentPlace', appointmentPlaceSchema),
    WeeklyAppointment: mongoose.model('WeeklyAppointment', weeklyAppointmentSchema),
    Appointment: mongoose.model('Appointment', appointmentSchema)
}