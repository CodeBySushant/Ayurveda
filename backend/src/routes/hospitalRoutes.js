const express = require("express");
const router = express.Router();

const {
  createPatientAdmission,
  getPatientAdmissions,
  deletePatientAdmission,
  getPatientAdmissionItems,

  createEmergencyService,
  getEmergencyServices,
  deleteEmergencyService,
  getEmergencyItems,
} = require("../controllers/hospitalController");

/* Patient Admission Routes */

router.post("/patient-admission", createPatientAdmission);

router.get("/patient-admission", getPatientAdmissions);

router.delete("/patient-admission/:id", deletePatientAdmission);

router.get("/patient-admission/:id/items", getPatientAdmissionItems);

/* Emergency Service Routes */

router.post("/emergency-service", createEmergencyService);

router.get("/emergency-service", getEmergencyServices);

router.delete("/emergency-service/:id", deleteEmergencyService);

router.get("/emergency-service/:id/items", getEmergencyItems);

module.exports = router;
