const express = require("express");
const router = express.Router();

const {
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
} = require("../controllers/commonController");

/* Master Register Routes */

router.post("/master-register", createMasterRegister);

router.get("/master-register", getMasterRegisters);

router.get("/master-register/search", searchMasterRegister);

router.get("/master-register/:id", getMasterRegisterById);

router.put("/master-register/:id", updateMasterRegister);

router.delete("/master-register/:id", deleteMasterRegister);

/* Additional Billing Routes */

router.post(
  "/additional-billing",
  createAdditionalBilling
);

router.get(
  "/additional-billing",
  getAdditionalBilling
);

router.delete(
  "/additional-billing/:id",
  deleteAdditionalBilling
);

router.get(
  "/additional-billing/:id/items",
  getAdditionalBillingItems
);

/* Referral Slip Routes */

router.post(
  "/referral-slip",
  createReferralSlip
);

router.get(
  "/referral-slip",
  getReferralSlips
);

router.delete(
  "/referral-slip/:id",
  deleteReferralSlip
);

router.get(
  "/referral-slip/:id/items",
  getReferralSlipItems
);

module.exports = router;