const express = require('express');
const mongoose = require('mongoose');

const { Appointment } = require('../models/Appointment');

const createAppointment = async (req, res) => {
    const body = req.body;
    try {
        const lastAppointment = await Appointment.find({}).sort({ serialNumber: -1 }).limit(1);

        const appointment = await Appointment.create({ ...body, serialNumber: lastAppointment[0].serialNumber + 1 });
        res.status(201).json(appointment);
    } catch (error) {
        return res.status(500).json({ error: "System error" });
    }
}

module.exports = {
    createAppointment
}