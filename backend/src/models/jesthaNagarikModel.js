const db = require("../config/db");

const createJesthaNagarik = (
  headerData,
  panels,
  callback
) => {
  db.beginTransaction((err) => {
    if (err) return callback(err);

    const serviceNumber =
      "JN-" + Date.now();

    const sqlHeader = `
      INSERT INTO jestha_nagarik_register (
        service_number,
        miti,
        mool_darta,

        raktachap,
        taul,
        fbs,

        prakriti,
        rog,
        parikshan,

        naam,
        thar,
        full_name,

        umer,
        linga,

        sampark_num,
        jaati,

        wada,
        tol,
        jilla
      )
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    const values = [
      serviceNumber,
      headerData.miti,
      headerData.moolDarta,

      headerData.raktachap,
      headerData.taul,
      headerData.fbs,

      headerData.prakriti,
      headerData.rog,
      headerData.parikshan,

      headerData.naam,
      headerData.thar,
      `${headerData.naam} ${headerData.thar}`,

      headerData.umer,
      headerData.linga,

      headerData.samparkNum,
      headerData.jaati,

      headerData.wada,
      headerData.tol,
      headerData.jilla
    ];

    db.query(sqlHeader, values, (err, result) => {
      if (err) {
        return db.rollback(() =>
          callback(err)
        );
      }

      const registerId =
        result.insertId;

      const sqlPanel = `
        INSERT INTO jestha_nagarik_followups (
          register_id,
          panel_type,
          panel_title,

          miti,

          ashwagandha,
          amalaki,
          mahanarayan,

          taul,
          ubchad_val,
          ubchad_unit,

          bmi,
          hb,
          esr,
          nindra,

          bmi_sudhar,
          bmi_sthir,
          bmi_hras,

          hb_sudhar,
          hb_sthir,
          hb_hras,

          esr_sudhar,
          esr_sthir,
          esr_hras,

          nindra_sudhar,
          nindra_sthir,
          nindra_hras,

          parikshan,
          kaifiyat
        )
        VALUES ?
      `;

      const rows = Object.entries(panels).map(
        ([key, p]) => [
          registerId,
          key,
          key,

          p.miti,

          p.ashwagandha,
          p.amalaki,
          p.mahanarayan,

          p.taul,
          p.ubchadVal,
          p.ubchadUnit,

          p.bmi,
          p.hb,
          p.esr,
          p.nindra,

          p.bmiSudhar,
          p.bmiSthir,
          p.bmiHras,

          p.hbSudhar,
          p.hbSthir,
          p.hbHras,

          p.esrSudhar,
          p.esrSthir,
          p.esrHras,

          p.nindraSudhar,
          p.nindraSthir,
          p.nindraHras,

          p.parikshan,
          p.kaifiyat
        ]
      );

      db.query(sqlPanel, [rows], (err) => {
        if (err) {
          return db.rollback(() =>
            callback(err)
          );
        }

        db.commit((err) => {
          if (err) {
            return db.rollback(() =>
              callback(err)
            );
          }

          callback(null, {
            message:
              "Saved successfully",
            serviceNumber
          });
        });
      });
    });
  });
};

const getAllJesthaNagarik = (
  callback
) => {
  db.query(
    `SELECT * FROM jestha_nagarik_register
     ORDER BY id DESC`,
    callback
  );
};

const deleteJesthaNagarik = (
  id,
  callback
) => {
  db.query(
    `DELETE FROM jestha_nagarik_register
     WHERE id=?`,
    [id],
    callback
  );
};

const getJesthaPanels = (
  id,
  callback
) => {
  db.query(
    `SELECT * FROM jestha_nagarik_followups
     WHERE register_id=?`,
    [id],
    callback
  );
};

module.exports = {
  createJesthaNagarik,
  getAllJesthaNagarik,
  deleteJesthaNagarik,
  getJesthaPanels
};