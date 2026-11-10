const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");

// Get all patients
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json({ success: true, patients });
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});

// Register patient
router.post("/", async (req, res) => {
  try {
    const { name, age, bloodGroup } = req.body;

    if (!name || !age || !bloodGroup) {
      return res.status(400).json({
        message: "Name, age and blood group are required"
      });
    }

    const patient = await Patient.create({
      globalMedicalId: "MV-" + Date.now(),
      name,
      age,
      bloodGroup
    });

    res.status(201).json({
      success: true,
      patient
    });
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});

module.exports = router;
