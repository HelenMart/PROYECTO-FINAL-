const { Pool } = require("pg");

const pool = new Pool({
    user: "admin",
    host: "postgres",
    database: "dataops",
    password: "admin123",
    port: 5432,
});

module.exports = pool;