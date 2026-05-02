const patientAdmissionModel = require("../models/patientAdmissionModel");

/* Create Patient Admission */
const createPatientAdmission = (req, res) => {
  const { medicines = [], investigations = [], ...headerData } = req.body;

  patientAdmissionModel.createPatientAdmission(
    headerData,
    medicines,
    investigations,
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to save patient admission",
          error: err,
        });
      }

      res.status(201).json(result);
    },
  );
};

/* Get All */
const getPatientAdmissions = (req, res) => {
  patientAdmissionModel.getAllPatientAdmissions((err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch admissions",
      });
    }

    res.json(result);
  });
};

/* Delete */
const deletePatientAdmission = (req, res) => {
  patientAdmissionModel.deletePatientAdmission(req.params.id, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Delete failed",
      });
    }

    res.json({
      message: "Deleted successfully",
    });
  });
};

/* Items */
const getPatientAdmissionItems = (req, res) => {
  patientAdmissionModel.getPatientAdmissionItems(
    req.params.id,
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to fetch details",
        });
      }

      res.json(result);
    },
  );
};

module.exports = {
  createPatientAdmission,
  getPatientAdmissions,
  deletePatientAdmission,
  getPatientAdmissionItems,
};
