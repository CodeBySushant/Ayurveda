const db = require("../config/db");

const createAkupancharService = (
  headerData,
  items,
  callback
) => {
  db.beginTransaction((err) => {
    if (err) return callback(err);

    const serviceNumber =
      "AKU-" + Date.now();

    const sqlHeader = `
      INSERT INTO akupanchar_services (
        service_number,

        miti,
        mul_darta,

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

        sampark_number,
        jaati,

        wada_number,
        tol,
        jilla
      )
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    const valuesHeader = [
      serviceNumber,

      headerData.miti,
      headerData.mulDarta,

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

      headerData.samparkNumber,
      headerData.jaati,

      headerData.wadaNumber,
      headerData.tol,
      headerData.jilla
    ];

    db.query(
      sqlHeader,
      valuesHeader,
      (err, result) => {
        if (err) {
          return db.rollback(() =>
            callback(err)
          );
        }

        const serviceId =
          result.insertId;

        if (!items.length) {
          return db.commit((err) => {
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
        }

        const sqlItem = `
          INSERT INTO akupanchar_service_items (
            service_id,
            miti,
            sewa,
            jatilata,
            parikshan_sallah,
            kaifiyat
          )
          VALUES ?
        `;

        const itemValues =
          items.map((item) => [
            serviceId,
            item.miti,
            item.sewa,
            item.jatilata,
            item.parikshan,
            item.kaifiyat
          ]);

        db.query(
          sqlItem,
          [itemValues],
          (err) => {
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
          }
        );
      }
    );
  });
};

const getAllAkupancharServices = (
  callback
) => {
  db.query(
    `SELECT * FROM akupanchar_services
     ORDER BY id DESC`,
    callback
  );
};

const deleteAkupancharService = (
  id,
  callback
) => {
  db.query(
    `DELETE FROM akupanchar_services
     WHERE id=?`,
    [id],
    callback
  );
};

const getAkupancharItems = (
  id,
  callback
) => {
  db.query(
    `SELECT * FROM akupanchar_service_items
     WHERE service_id=?`,
    [id],
    callback
  );
};

module.exports = {
  createAkupancharService,
  getAllAkupancharServices,
  deleteAkupancharService,
  getAkupancharItems
};