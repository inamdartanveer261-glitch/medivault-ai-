const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json({ success: true, doctors });
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, specialization, hospital } = req.body;

    if (!name || !specialization) {
      return res.status(400).json({
        message: "Name and specialization are required"
      });
    }

    const doctor = await Doctor.create({
      doctorId: "DOC-" + Date.now(),
      name,
      specialization,
      hospital
    });

    res.status(201).json({ success: true, doctor });
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});

module.exports = router;
