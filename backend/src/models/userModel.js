const db = require("../config/db");

exports.findByUsername = (username, callback) => {
  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], callback);
};