const mysql2 = require("mysql2/promise");
require("dotenv").config();

const options = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};
const pool = mysql2.createPool({
    host: options.host,
    port: options.port,
    user: options.user,
    password: options.password,
    database: options.database,
    timezone: "Asia/Seoul",
    dateStrings: true,
});
module.exports = pool;
