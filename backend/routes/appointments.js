const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// Get all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});

// Create appointment (demo only)
router.post("/", async (req, res) => {
  try {
    const { patientId, doctorId, date } = req.body;

    if (!patientId || !doctorId || !date) {
      return res.status(400).json({
        message: "Patient ID, doctor ID and date are required"
      });
    }

    const appointment = await Appointment.create({
      appointmentId: "APT-" + Date.now(),
      patientId,
      doctorId,
      date
    });

    res.status(201).json({
      success: true,
      appointment
    });
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});

module.exports = router;
