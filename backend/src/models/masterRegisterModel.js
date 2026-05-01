const db = require("../config/db");

exports.create = (data, callback) => {
  db.query("INSERT INTO master_register SET ?", data, callback);
};

exports.getAll = (callback) => {
  db.query("SELECT * FROM master_register", callback);
};