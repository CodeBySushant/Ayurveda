const masterRegisterModel = require("../models/masterRegisterModel");

/* Create */
const createMasterRegister = (req, res) => {
  masterRegisterModel.createMasterRegister(req.body, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to create record",
        error: err
      });
    }

    res.status(201).json({
      message: "Master Register created successfully",
      id: result.insertId
    });
  });
};

/* Get All */
const getMasterRegisters = (req, res) => {
  masterRegisterModel.getAllMasterRegisters((err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch records"
      });
    }

    res.json(result);
  });
};

/* Get Single */
const getMasterRegisterById = (req, res) => {
  const { id } = req.params;

  masterRegisterModel.getMasterRegisterById(id, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch record"
      });
    }

    res.json(result[0]);
  });
};

/* Update */
const updateMasterRegister = (req, res) => {
  const { id } = req.params;

  masterRegisterModel.updateMasterRegister(id, req.body, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to update record"
      });
    }

    res.json({
      message: "Record updated successfully"
    });
  });
};

/* Delete */
const deleteMasterRegister = (req, res) => {
  const { id } = req.params;

  masterRegisterModel.deleteMasterRegister(id, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to delete record"
      });
    }

    res.json({
      message: "Record deleted successfully"
    });
  });
};

/* Search */
const searchMasterRegister = (req, res) => {
  const { term } = req.query;

  masterRegisterModel.searchMasterRegister(term, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Search failed"
      });
    }

    res.json(result);
  });
};

module.exports = {
  createMasterRegister,
  getMasterRegisters,
  getMasterRegisterById,
  updateMasterRegister,
  deleteMasterRegister,
  searchMasterRegister
};