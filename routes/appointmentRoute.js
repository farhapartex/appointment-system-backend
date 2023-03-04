const express = require('express');
const { createAppointmentPlace } = require('../controllers/appointmentController');
const { authTokenMiddleware } = require('../middlewares/auth');

const route = express.Router();

route.post("/createAppointmentPlace", createAppointmentPlace);

module.exports = route;