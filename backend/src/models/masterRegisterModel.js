const db = require("../config/db");

/* Create Record */
const createMasterRegister = (data, callback) => {
  const sql = `
    INSERT INTO master_register (
      master_number,
      entry_date,
      visit_type,
      first_name,
      last_name,
      service_types,
      fee_amount,
      is_free,
      has_concession,
      referral_institution,
      remarks,
      caste,
      gender,
      age,
      contact_number,
      province,
      ward_number,
      locality,
      birth_date,
      created_by
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.masterNumber,
    data.entryDate,
    data.visitType,
    data.firstName,
    data.lastName,
    JSON.stringify(data.serviceTypes),
    data.feeAmount,
    data.isFree,
    data.hasConcession,
    data.referralInstitution,
    data.remarks,
    data.caste,
    data.gender,
    data.age,
    data.contactNumber,
    data.province,
    data.wardNumber,
    data.locality,
    data.birthDate,
    data.createdBy || null
  ];

  db.query(sql, values, callback);
};

/* Get All */
const getAllMasterRegisters = (callback) => {
  db.query(
    "SELECT * FROM master_register ORDER BY id DESC",
    callback
  );
};

/* Get Single */
const getMasterRegisterById = (id, callback) => {
  db.query(
    "SELECT * FROM master_register WHERE id = ?",
    [id],
    callback
  );
};

/* Delete */
const deleteMasterRegister = (id, callback) => {
  db.query(
    "DELETE FROM master_register WHERE id = ?",
    [id],
    callback
  );
};

/* Update */
const updateMasterRegister = (id, data, callback) => {
  const sql = `
    UPDATE master_register SET
      master_number = ?,
      entry_date = ?,
      visit_type = ?,
      first_name = ?,
      last_name = ?,
      service_types = ?,
      fee_amount = ?,
      is_free = ?,
      has_concession = ?,
      referral_institution = ?,
      remarks = ?,
      caste = ?,
      gender = ?,
      age = ?,
      contact_number = ?,
      province = ?,
      ward_number = ?,
      locality = ?,
      birth_date = ?
    WHERE id = ?
  `;

  const values = [
    data.masterNumber,
    data.entryDate,
    data.visitType,
    data.firstName,
    data.lastName,
    JSON.stringify(data.serviceTypes),
    data.feeAmount,
    data.isFree,
    data.hasConcession,
    data.referralInstitution,
    data.remarks,
    data.caste,
    data.gender,
    data.age,
    data.contactNumber,
    data.province,
    data.wardNumber,
    data.locality,
    data.birthDate,
    id
  ];

  db.query(sql, values, callback);
};

/* Search */
const searchMasterRegister = (term, callback) => {
  const sql = `
    SELECT * FROM master_register
    WHERE master_number LIKE ?
       OR first_name LIKE ?
       OR last_name LIKE ?
       OR contact_number LIKE ?
    ORDER BY id DESC
  `;

  const search = `%${term}%`;

  db.query(sql, [search, search, search, search], callback);
};

module.exports = {
  createMasterRegister,
  getAllMasterRegisters,
  getMasterRegisterById,
  deleteMasterRegister,
  updateMasterRegister,
  searchMasterRegister
};