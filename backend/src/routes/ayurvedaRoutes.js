const express = require("express");
const router = express.Router();

const {
  createAkupancharService,
  getAkupancharServices,
  deleteAkupancharService,
  getAkupancharItems,

  createJesthaNagarik,
  getJesthaNagarik,
  deleteJesthaNagarik,
  getJesthaPanels,

  createKsharsutraService,
  getKsharsutraServices,
  deleteKsharsutraService,
} = require("../controllers/ayurvedaController");

/* Akupanchar Routes */

router.post("/akupanchar-service", createAkupancharService);

router.get("/akupanchar-service", getAkupancharServices);

router.delete("/akupanchar-service/:id", deleteAkupancharService);

router.get("/akupanchar-service/:id/items", getAkupancharItems);

/* Jestha Nagarik Routes */

router.post("/jestha-nagarik", createJesthaNagarik);

router.get("/jestha-nagarik", getJesthaNagarik);

router.delete("/jestha-nagarik/:id", deleteJesthaNagarik);

router.get("/jestha-nagarik/:id/items", getJesthaPanels);

/* Ksharsutra Routes */

router.post("/ksharsutra-service", createKsharsutraService);

router.get("/ksharsutra-service", getKsharsutraServices);

router.delete("/ksharsutra-service/:id", deleteKsharsutraService);

module.exports = router;
