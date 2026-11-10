const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "MediVault AI Backend Running",
    status: "success"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

app.use("/api/patients", require("./routes/patients"));
app.use("/api/doctors", require("./routes/doctors"));
app.use("/api/appointments", require("./routes/appointments"));

const PORT = process.env.PORT || 5000;

async function startServer() {
  const uri = process.env.MONGODB_URI;

  if (uri && uri.startsWith("mongodb")) {
    try {
      await mongoose.connect(uri);
      console.log("MongoDB Connected Successfully!");
    } catch (error) {
      console.error("MongoDB connection failed:", error.message);
    }
  } else {
    console.log("MongoDB URI not configured yet.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`MediVault AI server running on port ${PORT}`);
  });
}

startServer();
