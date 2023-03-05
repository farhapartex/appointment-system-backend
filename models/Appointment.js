const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentPlaceSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
        default: ""
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
        default: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
    },
    appointmentWithUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

module.exports = {
    AppointmentPlace: mongoose.model('AppointmentPlace', appointmentPlaceSchema),
    WeeklyAppointment: mongoose.model('WeeklyAppointment', weeklyAppointmentSchema),
    Appointment: mongoose.model('Appointment', appointmentSchema)
}