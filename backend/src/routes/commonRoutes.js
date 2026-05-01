const express = require("express");
const router = express.Router();

const {
  createMasterRegister,
  getMasterRegisters,
  getMasterRegisterById,
  updateMasterRegister,
  deleteMasterRegister,
  searchMasterRegister
} = require("../controllers/commonController");

/* Master Register Routes */

router.post("/master-register", createMasterRegister);

router.get("/master-register", getMasterRegisters);

router.get("/master-register/search", searchMasterRegister);

router.get("/master-register/:id", getMasterRegisterById);

router.put("/master-register/:id", updateMasterRegister);

router.delete("/master-register/:id", deleteMasterRegister);

module.exports = router;