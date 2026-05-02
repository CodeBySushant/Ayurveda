const express = require("express");
const router = express.Router();

const {
  createAkupancharService,
  getAkupancharServices,
  deleteAkupancharService,
  getAkupancharItems,
} = require("../controllers/ayurvedaController");

/* Akupanchar Routes */

router.post("/akupanchar-service", createAkupancharService);

router.get("/akupanchar-service", getAkupancharServices);

router.delete("/akupanchar-service/:id", deleteAkupancharService);

router.get("/akupanchar-service/:id/items", getAkupancharItems);

module.exports = router;
