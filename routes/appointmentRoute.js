const express = require('express');
const { getAppointmentPlaces, createAppointmentPlace, createWeeklyAppointmentSlot } = require('../controllers/appointmentController');
const { authTokenMiddleware } = require('../middlewares/auth');

const route = express.Router();

route.get("/appointmentPlaces", getAppointmentPlaces);
route.post("/appointmentPlaces", createAppointmentPlace);

route.post("/weeklyAppointmentSlots", createWeeklyAppointmentSlot);

module.exports = route;