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

const getAppointmentPlaces = async (req, res) => {
    try {
        const appointmentPlaces = await AppointmentPlace.find({});
        res.status(200).json(appointmentPlaces);
    } catch (error) {
        return res.status(500).json({ error: "System error" });
    }
}


const createWeeklyAppointmentSlot = async (req, res) => {
    const body = req.body;
    const tomorrow = new Date();

    try {
        for (let dayCount = 1; dayCount <= 7; dayCount++) {
            await WeeklyAppointment.create({ ...body, date: tomorrow });
            tomorrow.setDate(tomorrow.getDate() + 1);
        }

        res.status(201).json({ message: "Weekly appointment created successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "System error" });
    }
}

const createAppointment = async (req, res) => {
    const body = req.body;
    const today = new Date();
    const lastDay = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    try {
        if (req.user.isAdmin === false) {
            return res.status(403).json({ error: "You are not authorized to create appointment place" });
        }

        const weeklyAppointment = await WeeklyAppointment.find({
            date: {
                $gte: lastDay,
                $lte: today
            }, status: true
        });

        if (!weeklyAppointment) {
            return res.status(404).json({ error: "No appointment available for today" });
        }

        const lastAppointment = await Appointment.find({}).sort({ serialNumber: -1 }).limit(1);

        let serialNumber = null;
        if (lastAppointment.length === 0) {
            serialNumber = 1;
        } else {
            serialNumber = lastAppointment[0].serialNumber + 1;
        }

        const appointment = await Appointment.create({ ...body, serialNumber: serialNumber, appointmentDate: today });
        res.status(201).json(appointment);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "System error" });
    }
}

module.exports = {
    getAppointmentPlaces,
    createAppointmentPlace,
    createWeeklyAppointmentSlot,
    createAppointment
}