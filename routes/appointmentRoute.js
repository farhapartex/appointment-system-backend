const express = require('express');
const { getAppointmentPlaces, createAppointmentPlace, createWeeklyAppointmentSlot, createAppointment, getWeeklyAppointmentSlots } = require('../controllers/appointmentController');
const { authTokenMiddleware } = require('../middlewares/auth');

const route = express.Router();

route.get("/appointmentPlaces", getAppointmentPlaces);
route.post("/appointmentPlaces", createAppointmentPlace);

route.post("/weeklyAppointmentSlots", createWeeklyAppointmentSlot);
route.get("/weeklyAppointmentSlots", getWeeklyAppointmentSlots);
route.post("/appointments", createAppointment);

module.exports = route;