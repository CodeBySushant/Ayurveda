const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./src/config/db");

const commonRoutes = require("./src/routes/commonRoutes");
const authRoutes = require("./src/routes/authRoutes");
const hospitalRoutes = require("./src/routes/hospitalRoutes");
const ayurvedaRoutes = require("./src/routes/ayurvedaRoutes");

const app = express();

/* Middlewares First */
app.use(cors());
app.use(express.json());

/* Routes */
app.use("/api/common", commonRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/hospital", hospitalRoutes);
app.use("/api/ayurveda", ayurvedaRoutes);

app.get("/", (req, res) => {
  res.send("Ayurveda Backend Running ✅");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
