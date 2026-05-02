const db = require("../config/db");

const createPatientAdmission = (header, medicines, investigations, callback) => {
  db.beginTransaction((err) => {
    if (err) return callback(err);

    const admissionNumber = "ADM-" + Date.now();

    const sql = `
      INSERT INTO patient_admissions (
        admission_number,
        form_date,
        master_number,
        is_first_time,
        police_case,
        inpatient_no,
        guardian_name,
        guardian_contact,
        admission_source,
        ward_number,
        provisional_diagnosis,

        therapy_purba_karma,
        therapy_pradhan_karma,
        therapy_ksharsutra,
        therapy_therapeutic,
        therapy_other,

        remarks,

        first_name,
        last_name,
        caste,
        gender,
        age,
        contact_number,
        province,
        patient_ward,
        locality
      )
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    const values = [
      admissionNumber,
      header.formDate,
      header.masterNumber,
      header.isFirstTime,
      header.policeCase,
      header.inpatientNo,
      header.guardianName,
      header.guardianContact,
      header.admissionSource,
      header.wardNumber,
      header.provisionalDiagnosis,

      header.purbaKarma,
      header.pradhanKarma,
      header.ksharsutra,
      header.therapeutic,
      header.therapyOther,

      header.remarks,

      header.firstName,
      header.lastName,
      header.caste,
      header.gender,
      header.age,
      header.contactNumber,
      header.province,
      header.patientWard,
      header.locality
    ];

    db.query(sql, values, (err, result) => {
      if (err) return db.rollback(() => callback(err));

      const admissionId = result.insertId;

      const medRows = medicines.map((m) => [
        admissionId,
        m.medicineName,
        m.dosage
      ]);

      const invRows = investigations.map((i) => [
        admissionId,
        i.investigationType,
        i.details
      ]);

      db.query(
        "INSERT INTO patient_admission_medicines (admission_id, medicine_name, dosage) VALUES ?",
        [medRows],
        (err) => {
          if (err) return db.rollback(() => callback(err));

          db.query(
            "INSERT INTO patient_admission_investigations (admission_id, investigation_type, details) VALUES ?",
            [invRows],
            (err) => {
              if (err) return db.rollback(() => callback(err));

              db.commit((err) => {
                if (err) return db.rollback(() => callback(err));

                callback(null, {
                  message: "Patient Admission saved successfully",
                  admissionNumber
                });
              });
            }
          );
        }
      );
    });
  });
};

const getAllPatientAdmissions = (callback) => {
  db.query(
    "SELECT * FROM patient_admissions ORDER BY id DESC",
    callback
  );
};

const deletePatientAdmission = (id, callback) => {
  db.query(
    "DELETE FROM patient_admissions WHERE id=?",
    [id],
    callback
  );
};

const getPatientAdmissionItems = (id, callback) => {
  const result = {};

  db.query(
    "SELECT * FROM patient_admission_medicines WHERE admission_id=?",
    [id],
    (err, meds) => {
      if (err) return callback(err);

      result.medicines = meds;

      db.query(
        "SELECT * FROM patient_admission_investigations WHERE admission_id=?",
        [id],
        (err, inv) => {
          if (err) return callback(err);

          result.investigations = inv;

          callback(null, result);
        }
      );
    }
  );
};

module.exports = {
  createPatientAdmission,
  getAllPatientAdmissions,
  deletePatientAdmission,
  getPatientAdmissionItems
};