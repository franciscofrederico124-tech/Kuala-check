const data_base = require("better-sqlite3");
const path = require("path");

const db = new data_base(path.join(__dirname, "../../kuala_data_base.db"));

module.exports = db;