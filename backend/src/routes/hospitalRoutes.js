const express = require("express");
const router = express.Router();

const {
  createPatientAdmission,
  getPatientAdmissions,
  deletePatientAdmission,
  getPatientAdmissionItems,
} = require("../controllers/hospitalController");

/* Patient Admission Routes */

router.post(
  "/patient-admission",
  createPatientAdmission
);

router.get(
  "/patient-admission",
  getPatientAdmissions
);

router.delete(
  "/patient-admission/:id",
  deletePatientAdmission
);

router.get(
  "/patient-admission/:id/items",
  getPatientAdmissionItems
);

module.exports = router;
