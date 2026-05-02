const db = require("../config/db");

/* Create */
const createKsharsutraService = (
  data,
  callback
) => {
  const serviceNumber =
    "KS-" + Date.now();

  const sql = `
    INSERT INTO
    ksharsutra_service_register (
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

    data.miti,
    data.moolDarta,

    data.raktachap,
    data.taul,
    data.fbs,

    data.prakriti,
    data.rog,
    data.parikshan,

    data.naam,
    data.thar,
    `${data.naam} ${data.thar}`,

    data.umer,
    data.linga,

    data.samparkNum,
    data.jaati,

    data.wada,
    data.tol,
    data.jilla
  ];

  db.query(sql, values, (err, result) => {
    if (err) return callback(err);

    callback(null, {
      message: "Saved successfully",
      serviceNumber,
      id: result.insertId
    });
  });
};

/* Get All */
const getAllKsharsutraServices = (
  callback
) => {
  db.query(
    `
    SELECT *
    FROM ksharsutra_service_register
    ORDER BY id DESC
    `,
    callback
  );
};

/* Delete */
const deleteKsharsutraService = (
  id,
  callback
) => {
  db.query(
    `
    DELETE FROM
    ksharsutra_service_register
    WHERE id = ?
    `,
    [id],
    callback
  );
};

module.exports = {
  createKsharsutraService,
  getAllKsharsutraServices,
  deleteKsharsutraService
};