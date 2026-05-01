const masterRegisterModel = require("../models/masterRegisterModel");
const billingModel = require("../models/billingModel");
const referralSlipModel = require("../models/referralSlipModel");

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

/* Additional Billing Create */
const createAdditionalBilling = (req, res) => {
  const { items, ...headerData } = req.body;

  billingModel.createBilling(
    headerData,
    items,
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to save billing",
          error: err
        });
      }

      res.status(201).json(result);
    }
  );
};

/* Additional Billing Get All */
const getAdditionalBilling = (req, res) => {
  billingModel.getAllBilling((err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch billing"
      });
    }

    res.json(result);
  });
};

/* Additional Billing Delete */
const deleteAdditionalBilling = (req, res) => {
  const { id } = req.params;

  billingModel.deleteBilling(id, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Delete failed"
      });
    }

    res.json({
      message: "Deleted successfully"
    });
  });
};

const getAdditionalBillingItems = (req, res) => {
  billingModel.getBillingItems(
    req.params.id,
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to fetch items"
        });
      }

      res.json(result);
    }
  );
};

/* Referral Slip Create */
const createReferralSlip = (req, res) => {
  const {
    services,
    medicines,
    ...headerData
  } = req.body;

  referralSlipModel.createReferralSlip(
    headerData,
    services,
    medicines,
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to save referral slip",
          error: err
        });
      }

      res.status(201).json(result);
    }
  );
};

/* Referral Slip Get All */
const getReferralSlips = (req, res) => {
  referralSlipModel.getAllReferralSlips(
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to fetch referral slips"
        });
      }

      res.json(result);
    }
  );
};

/* Referral Slip Delete */
const deleteReferralSlip = (req, res) => {
  referralSlipModel.deleteReferralSlip(
    req.params.id,
    (err) => {
      if (err) {
        return res.status(500).json({
          message: "Delete failed"
        });
      }

      res.json({
        message: "Deleted successfully"
      });
    }
  );
};

/* Referral Slip Items */
const getReferralSlipItems = (req, res) => {
  referralSlipModel.getReferralItems(
    req.params.id,
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to fetch details"
        });
      }

      res.json(result[0]);
    }
  );
};

module.exports = {
  createMasterRegister,
  getMasterRegisters,
  getMasterRegisterById,
  updateMasterRegister,
  deleteMasterRegister,
  searchMasterRegister,

  createAdditionalBilling,
  getAdditionalBilling,
  deleteAdditionalBilling,
  getAdditionalBillingItems,

  createReferralSlip,
  getReferralSlips,
  deleteReferralSlip,
  getReferralSlipItems
};