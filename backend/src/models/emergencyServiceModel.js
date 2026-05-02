const db = require("../config/db");

const createEmergencyService = (
  header,
  symptoms,
  complaints,
  investigations,
  diagnosis,
  treatments,
  medicines,
  callback
) => {
  db.beginTransaction((err) => {
    if (err) return callback(err);

    const emergencyNumber = "EMG-" + Date.now();

    const sql = `
      INSERT INTO emergency_services (
        emergency_number,
        form_date,
        registration_date,
        registration_time,

        first_name,
        family_name,

        caste,
        gender,

        age_group,
        age,

        district,
        ward_number,
        locality,

        guardian_name,
        guardian_contact,

        self_admission,
        brought_dead,

        referring_org,

        disease,

        under_observation,

        discharge_date,
        discharge_time,

        outcome_status,
        patient_death,

        cost_exemption,
        total_cost_exemption,
        exemption_group,

        gender_violence,
        police_case
      )
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    const values = [
      emergencyNumber,
      header.formDate,
      header.registrationDate,
      header.registrationTime,

      header.firstName,
      header.familyName,

      header.caste,
      header.gender,

      header.ageGroup,
      header.age,

      header.district,
      header.wardNumber,
      header.locality,

      header.guardianName,
      header.guardianContact,

      header.selfAdmission,
      header.broughtDead,

      header.referringOrg,

      header.disease,

      header.underObservation,

      header.dischargeDate,
      header.dischargeTime,

      header.outcomeStatus,
      header.patientDeath,

      header.costExemption,
      header.totalCostExemption,
      header.exemptionGroup,

      header.genderViolence,
      header.policeCase
    ];

    db.query(sql, values, (err, result) => {
      if (err) return db.rollback(() => callback(err));

      const emergencyId = result.insertId;

      const insertChild = (table, rows, done) => {
        if (!rows.length) return done();

        const values = rows.map((x) => [
          emergencyId,
          x.itemName
        ]);

        db.query(
          `INSERT INTO ${table} (emergency_id, item_name) VALUES ?`,
          [values],
          done
        );
      };

      insertChild("emergency_symptoms", symptoms, (err) => {
        if (err) return db.rollback(() => callback(err));

        insertChild("emergency_complaints", complaints, (err) => {
          if (err) return db.rollback(() => callback(err));

          insertChild("emergency_investigations", investigations, (err) => {
            if (err) return db.rollback(() => callback(err));

            insertChild("emergency_diagnosis", diagnosis, (err) => {
              if (err) return db.rollback(() => callback(err));

              insertChild("emergency_treatments", treatments, (err) => {
                if (err) return db.rollback(() => callback(err));

                insertChild("emergency_medicines", medicines, (err) => {
                  if (err) return db.rollback(() => callback(err));

                  db.commit((err) => {
                    if (err) return db.rollback(() => callback(err));

                    callback(null, {
                      message: "Emergency service saved successfully",
                      emergencyNumber
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
};

const getAllEmergencyServices = (callback) => {
  db.query(
    "SELECT * FROM emergency_services ORDER BY id DESC",
    callback
  );
};

const deleteEmergencyService = (id, callback) => {
  db.query(
    "DELETE FROM emergency_services WHERE id=?",
    [id],
    callback
  );
};

const getEmergencyItems = (id, callback) => {
  const result = {};

  const load = (table, key, next) => {
    db.query(
      `SELECT * FROM ${table} WHERE emergency_id=?`,
      [id],
      (err, rows) => {
        if (err) return callback(err);
        result[key] = rows;
        next();
      }
    );
  };

  load("emergency_symptoms", "symptoms", () => {
    load("emergency_complaints", "complaints", () => {
      load("emergency_investigations", "investigations", () => {
        load("emergency_diagnosis", "diagnosis", () => {
          load("emergency_treatments", "treatments", () => {
            load("emergency_medicines", "medicines", () => {
              callback(null, result);
            });
          });
        });
      });
    });
  });
};

module.exports = {
  createEmergencyService,
  getAllEmergencyServices,
  deleteEmergencyService,
  getEmergencyItems
};