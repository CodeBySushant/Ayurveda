const db = require("../config/db");

const createReturnSlip = (header, services, callback) => {
  db.beginTransaction((err) => {
    if (err) return callback(err);

    const slipNumber = "RET-" + Date.now();

    const sql = `
      INSERT INTO return_slips (
        slip_number,
        form_date,

        from_institution_name,
        from_province,
        from_ward,

        to_institution_name,
        to_address,

        first_name,
        last_name,
        gender,
        age,
        patient_province,
        patient_ward,
        contact_visit_date,

        provider_name,
        provider_designation,
        provider_date
      )
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    const values = [
      slipNumber,
      header.formDate,

      header.fromInstitutionName,
      header.fromProvince,
      header.fromWard,

      header.toInstitutionName,
      header.toAddress,

      header.firstName,
      header.lastName,
      header.gender,
      header.age,
      header.patientProvince,
      header.patientWard,
      header.contactVisitDate,

      header.providerName,
      header.providerDesignation,
      header.providerDate
    ];

    db.query(sql, values, (err, result) => {
      if (err) return db.rollback(() => callback(err));

      const returnId = result.insertId;

      const rows = services.map((x) => [
        returnId,
        x.serviceName
      ]);

      db.query(
        "INSERT INTO return_services (return_id, service_name) VALUES ?",
        [rows],
        (err) => {
          if (err) return db.rollback(() => callback(err));

          db.commit((err) => {
            if (err) return db.rollback(() => callback(err));

            callback(null, {
              message: "Return Slip saved successfully",
              slipNumber
            });
          });
        }
      );
    });
  });
};

const getAllReturnSlips = (callback) => {
  db.query(
    "SELECT * FROM return_slips ORDER BY id DESC",
    callback
  );
};

const deleteReturnSlip = (id, callback) => {
  db.query(
    "DELETE FROM return_slips WHERE id=?",
    [id],
    callback
  );
};

const getReturnItems = (id, callback) => {
  db.query(
    "SELECT * FROM return_services WHERE return_id=?",
    [id],
    callback
  );
};

module.exports = {
  createReturnSlip,
  getAllReturnSlips,
  deleteReturnSlip,
  getReturnItems
};