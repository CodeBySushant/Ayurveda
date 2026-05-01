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
  getAdditionalBillingItems
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

module.exports = router;