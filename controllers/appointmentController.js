const express = require('express');
const mongoose = require('mongoose');

const { AppointmentPlace, WeeklyAppointment, Appointment } = require('../models/Appointment');

const createAppointmentPlace = async (req, res) => {
    const body = req.body;

    try {
        if (req.user.isAdmin === false) {
            return res.status(403).json({ error: "You are not authorized to create appointment place" });
        }

        const appointmentPlace = await AppointmentPlace.create(body);
        res.status(201).json(appointmentPlace);

    } catch (error) {
        return res.status(500).json({ error: "System error" });
    }
}

const createAppointment = async (req, res) => {
    const body = req.body;
    try {
        if (req.user.isAdmin === false) {
            return res.status(403).json({ error: "You are not authorized to create appointment place" });
        }

        const lastAppointment = await Appointment.find({}).sort({ serialNumber: -1 }).limit(1);

        const appointment = await Appointment.create({ ...body, serialNumber: lastAppointment[0].serialNumber + 1 });
        res.status(201).json(appointment);
    } catch (error) {
        return res.status(500).json({ error: "System error" });
    }
}

module.exports = {
    createAppointmentPlace,
    createAppointment
}