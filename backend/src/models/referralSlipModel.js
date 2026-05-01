const db = require("../config/db");

const createReferralSlip = (header, services, medicines, callback) => {
  db.beginTransaction((err) => {
    if (err) return callback(err);

    const slipNumber = "REF-" + Date.now();

    const sql = `
      INSERT INTO referral_slips (
        slip_number,
        form_date,

        from_institution_name,
        from_address,
        from_contact,
        from_province,

        master_number,
        first_name,
        last_name,
        gender,
        age,
        district,
        ward_number,

        blood_pressure,
        pulse,
        temperature,
        respiration,
        weight,
        height,
        height_unit,
        body_type,
        ayurveda_therapy,
        other_notes,

        to_institution_name,
        to_address,
        contact_date,
        required_tests,
        referral_reason,

        official_name,
        official_designation
      )
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    const values = [
      slipNumber,
      header.formDate,

      header.fromInstitutionName,
      header.fromAddress,
      header.fromContact,
      header.fromProvince,

      header.masterNumber,
      header.firstName,
      header.lastName,
      header.gender,
      header.age,
      header.district,
      header.wardNumber,

      header.bloodPressure,
      header.pulse,
      header.temperature,
      header.respiration,
      header.weight,
      header.height,
      header.heightUnit,
      header.bodyType,
      header.ayurvedaTherapy,
      header.otherNotes,

      header.toInstitutionName,
      header.toAddress,
      header.contactDate,
      header.requiredTests,
      header.referralReason,

      header.officialName,
      header.officialDesignation
    ];

    db.query(sql, values, (err, result) => {
      if (err) return db.rollback(() => callback(err));

      const referralId = result.insertId;

      const serviceRows = services.map((x) => [
        referralId,
        x.serviceName
      ]);

      const medRows = medicines.map((x) => [
        referralId,
        x.medicineName,
        x.dosage
      ]);

      db.query(
        "INSERT INTO referral_services (referral_id, service_name) VALUES ?",
        [serviceRows],
        (err) => {
          if (err) return db.rollback(() => callback(err));

          db.query(
            "INSERT INTO referral_medicines (referral_id, medicine_name, dosage) VALUES ?",
            [medRows],
            (err) => {
              if (err) return db.rollback(() => callback(err));

              db.commit((err) => {
                if (err) return db.rollback(() => callback(err));

                callback(null, {
                  message: "Referral Slip saved successfully",
                  slipNumber
                });
              });
            }
          );
        }
      );
    });
  });
};

const getAllReferralSlips = (callback) => {
  db.query(
    "SELECT * FROM referral_slips ORDER BY id DESC",
    callback
  );
};

const deleteReferralSlip = (id, callback) => {
  db.query(
    "DELETE FROM referral_slips WHERE id=?",
    [id],
    callback
  );
};

const getReferralItems = (id, callback) => {
  db.query(
    `
    SELECT
      (SELECT JSON_ARRAYAGG(service_name)
       FROM referral_services
       WHERE referral_id = ?) AS services,

      (SELECT JSON_ARRAYAGG(
         JSON_OBJECT(
           'medicine_name', medicine_name,
           'dosage', dosage
         )
       )
       FROM referral_medicines
       WHERE referral_id = ?) AS medicines
    `,
    [id, id],
    callback
  );
};

module.exports = {
  createReferralSlip,
  getAllReferralSlips,
  deleteReferralSlip,
  getReferralItems
};