const { Client } = require("pg");

const db = new Client({
  host: "localhost",
  user: "zekebaldwin",
  password: "Zekezeke1",
  database: "capstone2",
});

db.connect();

module.exports = db;
