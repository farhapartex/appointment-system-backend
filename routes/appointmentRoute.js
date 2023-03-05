const express = require('express');
const { getAppointmentPlaces, createAppointmentPlace, createWeeklyAppointmentSlot, createAppointment, getWeeklyAppointmentSlots, approveAppointmentByAdmin } = require('../controllers/appointmentController');
const { authTokenMiddleware } = require('../middlewares/auth');

const route = express.Router();

route.get("/appointmentPlaces", getAppointmentPlaces);
route.post("/appointmentPlaces", createAppointmentPlace);

route.post("/weeklyAppointmentSlots", createWeeklyAppointmentSlot);
route.get("/weeklyAppointmentSlots", getWeeklyAppointmentSlots);
route.post("/appointments", createAppointment);
route.patch("/approveAppointment", approveAppointmentByAdmin);

module.exports = route;