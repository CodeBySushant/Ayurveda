const db = require("../config/db");

const createBilling = (headerData, items, callback) => {
  db.beginTransaction((err) => {
    if (err) return callback(err);

    const billNumber = "BILL-" + Date.now();

    const sqlHeader = `
      INSERT INTO additional_service_billing (
        bill_number,
        master_number,
        patient_name,
        patient_surname,
        full_name,
        caste,
        gender,
        age,
        contact_number,
        discount_type,
        discount_percent,
        discount_amount,
        payment_mode,
        reference_number,
        subtotal,
        total_amount
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const valuesHeader = [
      billNumber,
      headerData.masterNumber,
      headerData.patientName,
      headerData.patientSurname,
      headerData.patientName + " " + headerData.patientSurname,
      headerData.caste,
      headerData.gender,
      headerData.age,
      headerData.contactNumber,
      headerData.discountType,
      headerData.discountPercent,
      headerData.discountAmount,
      headerData.paymentMode,
      headerData.referenceNumber,
      headerData.subtotal,
      headerData.totalAmount
    ];

    db.query(sqlHeader, valuesHeader, (err, result) => {
      if (err) {
        return db.rollback(() => callback(err));
      }

      const billingId = result.insertId;

      const sqlItem = `
        INSERT INTO additional_service_billing_items (
          billing_id,
          service_type,
          service_name,
          quantity,
          rate,
          amount
        )
        VALUES ?
      `;

      const itemValues = items.map((item) => [
        billingId,
        item.serviceType,
        item.serviceName,
        item.quantity || 1,
        item.rate,
        item.amount
      ]);

      db.query(sqlItem, [itemValues], (err) => {
        if (err) {
          return db.rollback(() => callback(err));
        }

        db.commit((err) => {
          if (err) {
            return db.rollback(() => callback(err));
          }

          callback(null, {
            message: "Billing saved successfully",
            billNumber
          });
        });
      });
    });
  });
};

const getAllBilling = (callback) => {
  db.query(
    "SELECT * FROM additional_service_billing ORDER BY id DESC",
    callback
  );
};

const deleteBilling = (id, callback) => {
  db.query(
    "DELETE FROM additional_service_billing WHERE id=?",
    [id],
    callback
  );
};

const getBillingItems = (id, callback) => {
  db.query(
    "SELECT * FROM additional_service_billing_items WHERE billing_id=?",
    [id],
    callback
  );
};

module.exports = {
  createBilling,
  getAllBilling,
  deleteBilling,
  getBillingItems
};