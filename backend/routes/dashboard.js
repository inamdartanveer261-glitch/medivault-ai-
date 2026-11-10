const express = require("express");
const router = express.Router();

const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");

router.get("/stats", async (req, res) => {
  try {
    const [patients, doctors, appointments] = await Promise.all([
      Patient.countDocuments(),
      Doctor.countDocuments(),
      Appointment.countDocuments()
    ]);

    res.json({
      success: true,
      stats: {
        totalPatients: patients,
        totalDoctors: doctors,
        totalAppointments: appointments
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Dashboard statistics unavailable" });
  }
});

module.exports = router;
